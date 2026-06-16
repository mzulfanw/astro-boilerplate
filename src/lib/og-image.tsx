import { readFile } from "node:fs/promises"
import path from "node:path"
import { createRequire } from "node:module"
import type React from "react"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

const WIDTH = 1200
const HEIGHT = 630

const require = createRequire(import.meta.url)
const FONTS_DIR = path.join(
  path.dirname(require.resolve("@fontsource/inter/package.json")),
  "files",
)

let cachedFonts: {
  name: string
  data: ArrayBuffer
  weight: 400 | 700
  style: "normal"
}[] | null = null

async function loadFonts() {
  if (cachedFonts) return cachedFonts

  const [regular, bold] = await Promise.all([
    readFile(path.join(FONTS_DIR, "inter-latin-400-normal.woff")),
    readFile(path.join(FONTS_DIR, "inter-latin-700-normal.woff")),
  ])

  cachedFonts = [
    {
      name: "Inter",
      data: regular.buffer,
      weight: 400,
      style: "normal",
    },
    {
      name: "Inter",
      data: bold.buffer,
      weight: 700,
      style: "normal",
    },
  ]
  return cachedFonts
}

function Template({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return {
    type: "div",
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0a0a0a",
        fontFamily: "Inter",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              height: 4,
              width: "100%",
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "60px 80px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "#a1a1aa",
                    fontSize: 20,
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    marginBottom: 16,
                  },
                  children: "AstroBP",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    color: "#ffffff",
                    fontSize: 48,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    marginBottom: description ? 20 : 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxHeight: description ? 168 : 173,
                  },
                  children: title,
                },
              },
              description
                ? {
                    type: "div",
                    props: {
                      style: {
                        color: "#71717a",
                        fontSize: 22,
                        lineHeight: 1.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: 99,
                      },
                      children: description,
                    },
                  }
                : null,
            ].filter(Boolean),
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 80px 40px",
              borderTop: "1px solid #27272a",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { color: "#52525b", fontSize: 14 },
                  children: "astrobp.io",
                },
              },
            ],
          },
        },
      ],
    },
  }
}

export async function generateOGImage(
  title: string,
  description?: string,
): Promise<Buffer> {
  const fonts = await loadFonts()

  const template = Template({ title, description }) as unknown as React.ReactNode

  const svg = await satori(template, {
    width: WIDTH,
    height: HEIGHT,
    fonts,
  })

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: WIDTH },
  })

  return resvg.render().asPng()
}
