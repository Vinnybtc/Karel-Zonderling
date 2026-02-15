import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#7B68EE",
          borderRadius: "40px",
        }}
      >
        <span
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: "#FF0000",
            fontFamily: "Arial",
            lineHeight: 1,
            textShadow: "2px 2px 0 #2D2D2D",
          }}
        >
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
