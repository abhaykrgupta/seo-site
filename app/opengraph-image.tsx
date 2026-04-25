import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FinVault — Free Financial Calculators & Money Guides";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1a2744 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "white",
            letterSpacing: "-3px",
            marginBottom: 20,
          }}
        >
          FinVault
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
            marginBottom: 52,
          }}
        >
          Free Financial Calculators & Money Guides
        </div>

        {/* Tool pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["EMI Calculator", "Credit Card Optimizer", "Loan Eligibility"].map(
            (tool) => (
              <div
                key={tool}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 40,
                  padding: "10px 24px",
                  color: "#cbd5e1",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {tool}
              </div>
            )
          )}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            color: "#475569",
            fontSize: 18,
          }}
        >
          finvaultguide.com
        </div>
      </div>
    ),
    { ...size }
  );
}
