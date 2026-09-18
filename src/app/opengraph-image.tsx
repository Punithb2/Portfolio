import { ImageResponse } from "next/og";

export const alt = "Punith B — AI / ML & Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          color: "#f2f0ea",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8d8b86", letterSpacing: 4 }}>
          <span>PORTFOLIO</span>
          <span>BENGALURU, IN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <span style={{ fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Punith</span>
            <span style={{ fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 1, color: "#c8ff4d" }}>B.</span>
          </div>
          <span style={{ fontSize: 38, color: "#8d8b86", marginTop: 20 }}>
            AI / ML engineer · multi-agent systems, computer vision & real-time backends
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "#f2f0ea" }}>
          <span style={{ background: "#c8ff4d", color: "#09090b", padding: "10px 24px", borderRadius: 999 }}>punithb.me</span>
          <span style={{ color: "#8d8b86" }}>github.com/Punithb2</span>
        </div>
      </div>
    ),
    size,
  );
}
