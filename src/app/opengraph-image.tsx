import { ImageResponse } from "next/og";

export const alt = "De Show van Karel Zonderling - Kinderpodcast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7B68EE 0%, #5B4ACE 100%)",
          fontFamily: "Arial",
        }}
      >
        {/* K emblem */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#FF0000",
            border: "6px solid #2D2D2D",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <span style={{ fontSize: 72, fontWeight: 900, color: "white" }}>K</span>
        </div>

        <span
          style={{
            fontSize: 36,
            color: "white",
            opacity: 0.9,
            letterSpacing: 4,
          }}
        >
          DE SHOW VAN
        </span>
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFD700",
            letterSpacing: 6,
            marginTop: 8,
            textShadow: "3px 3px 0 #2D2D2D",
          }}
        >
          KAREL ZONDERLING
        </span>
        <span
          style={{
            fontSize: 28,
            color: "white",
            opacity: 0.8,
            marginTop: 20,
            letterSpacing: 2,
          }}
        >
          Kinderpodcast op Spotify
        </span>
      </div>
    ),
    { ...size }
  );
}
