import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not configured" },
      { status: 500 }
    );
  }

  try {
    const { messages, system } = await req.json();

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system:
          system ||
          "Te a BrainToBrain AI Asszisztens vagy, Abbas Anna Anoir neurobiologus kutato platformjanak segedje. Kozertheto, de tudomanyosan pontos valaszokat adsz az agy mukodeserol, oregedeserol, neurodegenerativ betegsegekrol. Magyarul valaszolsz, roviden (max 3-4 bekezdes).",
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Anthropic API error: ${response.status}`, details: err },
        { status: response.status }
      );
    }

    const data = await response.json();
    const text =
      data.content?.[0]?.text || "Sajnos nem tudtam valaszt generalni.";

    return NextResponse.json({ text });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
