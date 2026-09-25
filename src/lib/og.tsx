import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "./site";

export const ogSize = { width: 1200, height: 630 };

/** Shared renderer for the branded Open Graph / social share images. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const logo = await readFile(join(process.cwd(), "public/logo-light.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#151215",
          color: "white",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            border: "90px solid rgba(29,185,84,0.9)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} width={330} height={105} alt="" />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              color: "#34d077",
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#b8b4ba" }}>
          <span>www.geoloide.com</span>
          <span style={{ color: "#34d077" }}>{site.tagline}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
