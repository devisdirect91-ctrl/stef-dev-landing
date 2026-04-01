import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Stef Dev — Outils web sur-mesure pour PME";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "64px",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "12px",
            background: "#3B82F6",
            marginBottom: "32px",
            fontSize: "28px",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          S
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: "56px",
            fontWeight: "700",
            color: "#F5F5F7",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "20px",
            maxWidth: "900px",
          }}
        >
          Stef Dev
        </div>
        <div
          style={{
            fontSize: "28px",
            fontWeight: "400",
            color: "#8A8A8E",
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: "800px",
            marginBottom: "36px",
          }}
        >
          Outils web sur-mesure pour PME
        </div>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {["Forfait fixe", "2 500–5 000€", "Livré en 2-3 semaines"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                background: "#141416",
                border: "1px solid #1F1F23",
                color: "#8A8A8E",
                fontSize: "16px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "64px",
            fontSize: "16px",
            color: "#3B82F6",
          }}
        >
          stef-dev.fr
        </div>
      </div>
    ),
    { ...size }
  );
}
