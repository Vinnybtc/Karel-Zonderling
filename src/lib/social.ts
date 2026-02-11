/**
 * Social Media Posting Library
 * Posts to Facebook Pages and Instagram Business accounts via Meta Graph API.
 */

interface PostResult {
  success: boolean;
  postId?: string;
  error?: string;
}

const GRAPH_API_BASE = "https://graph.facebook.com/v19.0";

/**
 * Post a message (with optional image) to a Facebook Page.
 * Uses the Page Posts edge: POST /{page-id}/photos or /{page-id}/feed
 */
export async function postToFacebook(
  pageId: string,
  accessToken: string,
  message: string,
  imageUrl?: string
): Promise<PostResult> {
  try {
    let endpoint: string;
    let body: Record<string, string>;

    if (imageUrl) {
      // Photo post — use /{page-id}/photos
      endpoint = `${GRAPH_API_BASE}/${pageId}/photos`;
      body = {
        url: imageUrl,
        message,
        access_token: accessToken,
      };
    } else {
      // Text-only post — use /{page-id}/feed
      endpoint = `${GRAPH_API_BASE}/${pageId}/feed`;
      body = {
        message,
        access_token: accessToken,
      };
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data?.error?.message || `Facebook API fout (${response.status})`;
      console.error("[social] Facebook post failed:", data);
      return { success: false, error: errorMessage };
    }

    // Photo posts return { id, post_id }, feed posts return { id }
    const postId = data.post_id || data.id;

    return { success: true, postId };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Onbekende fout bij Facebook post";
    console.error("[social] Facebook exception:", err);
    return { success: false, error: message };
  }
}

/**
 * Post a photo with caption to Instagram Business via the Content Publishing API.
 * Instagram requires an image — text-only posts are not supported.
 *
 * Two-step process:
 * 1. Create a media container: POST /{ig-user-id}/media
 * 2. Publish the container: POST /{ig-user-id}/media_publish
 */
export async function postToInstagram(
  igUserId: string,
  accessToken: string,
  message: string,
  imageUrl: string
): Promise<PostResult> {
  try {
    if (!imageUrl) {
      return {
        success: false,
        error: "Instagram vereist een afbeelding. Geen image URL opgegeven.",
      };
    }

    // Step 1: Create media container
    const containerResponse = await fetch(
      `${GRAPH_API_BASE}/${igUserId}/media`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: imageUrl,
          caption: message,
          access_token: accessToken,
        }),
      }
    );

    const containerData = await containerResponse.json();

    if (!containerResponse.ok) {
      const errorMessage =
        containerData?.error?.message ||
        `Instagram container fout (${containerResponse.status})`;
      console.error("[social] Instagram container failed:", containerData);
      return { success: false, error: errorMessage };
    }

    const containerId = containerData.id;

    // Step 2: Publish the container
    // Brief wait — Instagram sometimes needs a moment to process the container
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const publishResponse = await fetch(
      `${GRAPH_API_BASE}/${igUserId}/media_publish`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creation_id: containerId,
          access_token: accessToken,
        }),
      }
    );

    const publishData = await publishResponse.json();

    if (!publishResponse.ok) {
      const errorMessage =
        publishData?.error?.message ||
        `Instagram publish fout (${publishResponse.status})`;
      console.error("[social] Instagram publish failed:", publishData);
      return { success: false, error: errorMessage };
    }

    return { success: true, postId: publishData.id };
  } catch (err) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : "Onbekende fout bij Instagram post";
    console.error("[social] Instagram exception:", err);
    return { success: false, error: errorMsg };
  }
}
