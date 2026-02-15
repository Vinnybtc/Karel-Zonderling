import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "12px",
          border: "3px solid #2D2D2D",
        }}
      >
        <span
          style={{
            fontSize: 32,
            fontWeight: 900,
            color: "#FF0000",
            fontFamily: "Arial",
            lineHeight: 1,
            textShadow: "1px 1px 0 #2D2D2D",
          }}
        >
          K
        </span>
      </div>
    ),
    { ...size }
  );
}
