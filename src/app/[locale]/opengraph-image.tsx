import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Agadir Tourisme — tours, excursions and transfers";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#fbf7f2",
          color: "#211b16",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700, color: "#9a3412", letterSpacing: 2 }}>
          SOUSS-MASSA · AGADIR
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          Agadir tours, excursions and private transfers
        </div>
        <div style={{ fontSize: 32, marginTop: 28, color: "#6b5f54" }}>
          Licensed local agency · transparent EUR pricing · WhatsApp confirmation
        </div>
      </div>
    ),
    size,
  );
}
