import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: NextRequest) {
  // Check admin password
  const { script, password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Ongeldig wachtwoord" }, { status: 401 });
  }

  if (!script || typeof script !== "string" || script.trim().length < 20) {
    return NextResponse.json(
      { error: "Script is te kort. Plak een heel fragment." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is niet geconfigureerd op de server." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  const systemPrompt = `Je bent een marketing-expert voor de Nederlandse kinderpodcast "De Show van Karel Zonderling".

Context over de podcast:
- Hoofdpersonages: Karel (blonde superheld, paarse trui met K, rode cape), Alien Colibri (groene alien met paarse staartjes), Snoezy (grijze muis), Dylan de Badeend (gele badeend met zonnebril)
- Locatie: Geheim HQ onder een donut-café (codewoord: "Wil je er een koekje bij?")
- Doelgroep: Kinderen 4-8 jaar, ouders bereiken via social media
- Stijl: Vrolijk, avontuurlijk, hand-drawn superhelden thema
- Seizoen 1: 10 afleveringen over het verdwenen snoep van Meneer Willy en de transformatie van Bobby de Boze naar Bobby de Grappige

Je genereert altijd content in het Nederlands.`;

  const userPrompt = `Analyseer dit podcastscript en genereer marketing content. Antwoord ALLEEN in valid JSON met exact deze structuur (geen markdown, geen uitleg):

{
  "opvoedHack": "Een praktische opvoed-tip of speeltip voor ouders gebaseerd op het thema van dit fragment. 2-3 zinnen. Concreet en actionable.",
  "spotifyTitle": "Een SEO-vriendelijke titel voor deze aflevering op Spotify. Max 60 karakters.",
  "spotifyDescription": "Een wervende omschrijving voor Spotify. 2-3 zinnen. Met relevante zoekwoorden voor ouders die kinderpodcasts zoeken.",
  "coloringPrompt": "Een gedetailleerde prompt (Engels) voor het genereren van een AI-kleurplaat in lijnstijl, gebaseerd op een scene uit dit script. Kindvriendelijk, duidelijke lijnen.",
  "socialPost": "Een social media post (Instagram/Facebook) voor ouders. Inclusief 1 tip, verwijzing naar de aflevering, en 3-5 relevante hashtags. Max 200 woorden."
}

SCRIPT:
${script}`;

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const textContent = message.content.find((block) => block.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("Geen tekst-antwoord ontvangen");
    }

    const parsed = JSON.parse(textContent.text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI generation error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "AI gaf een ongeldig antwoord. Probeer opnieuw." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Er ging iets mis bij het genereren. Probeer opnieuw." },
      { status: 500 }
    );
  }
}
