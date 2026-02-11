/**
 * Content Generation Engine
 * Generates Dutch social media content for "De Show van Karel Zonderling" podcast.
 * Uses Claude API for AI-powered content creation.
 */

import Anthropic from "@anthropic-ai/sdk";

// ─── Episode Data (Season 1) ─────────────────────────────────────

export interface Episode {
  number: number;
  title: string;
  theme: string;
  keywords: string[];
  synopsis: string;
}

export const SEASON_1_EPISODES: Episode[] = [
  {
    number: 1,
    title: "Het Geheime HQ",
    theme: "Vriendschap en geheimen",
    keywords: ["geheim", "HQ", "donut-café", "codewoord", "team"],
    synopsis:
      "Karel ontdekt het geheime hoofdkwartier onder het donut-café van Tante Loesy. Hij leert het codewoord 'Wil je er een koekje bij?' en ontmoet zijn team: Colibri, Snoezy en Dylan de Badeend.",
  },
  {
    number: 2,
    title: "Colibri's Thuisplaneet",
    theme: "Anders zijn is oké",
    keywords: ["alien", "Colibri", "planeet", "anders", "thuishoren"],
    synopsis:
      "Colibri vertelt over haar thuisplaneet en waarom ze naar de Aarde is gekomen. Ze voelt zich soms anders, maar Karel laat zien dat anders zijn juist bijzonder is.",
  },
  {
    number: 3,
    title: "Snoezy's Grote Avontuur",
    theme: "Moed en zelfvertrouwen",
    keywords: ["Snoezy", "muis", "moed", "klein maar dapper", "avontuur"],
    synopsis:
      "Snoezy de muis wil bewijzen dat hij ook een held kan zijn, ondanks zijn kleine formaat. Hij gaat op een solo-missie en ontdekt dat echte moed van binnenuit komt.",
  },
  {
    number: 4,
    title: "Dylan's Zonnebrilgeheim",
    theme: "Kwetsbaarheid tonen",
    keywords: ["Dylan", "badeend", "zonnebril", "cool", "gevoelens"],
    synopsis:
      "Iedereen vraagt zich af waarom Dylan de Badeend altijd zijn zonnebril draagt. Als hij hem per ongeluk kwijtraakt, leert het team dat stoer doen soms een manier is om gevoelens te verbergen.",
  },
  {
    number: 5,
    title: "Het Verdwenen Snoep",
    theme: "Eerlijkheid en verantwoordelijkheid",
    keywords: ["snoep", "Meneer Willy", "verdwenen", "zoektocht", "eerlijk"],
    synopsis:
      "Het snoep van Meneer Willy's winkel verdwijnt mysterieus. Karel en zijn team gaan op onderzoek uit. De eerste aanwijzingen leiden naar een onverwachte verdachte.",
  },
  {
    number: 6,
    title: "Bobby de Boze",
    theme: "Omgaan met boosheid",
    keywords: ["Bobby", "boos", "pesten", "emoties", "begrijpen"],
    synopsis:
      "Het team ontmoet Bobby de Boze, die overal ruzie maakt. In plaats van terug te vechten, probeert Karel te begrijpen waarom Bobby zo boos is.",
  },
  {
    number: 7,
    title: "Tante Loesy's Donut Dilemma",
    theme: "Samenwerken",
    keywords: ["Tante Loesy", "donuts", "samenwerken", "bakken", "chaos"],
    synopsis:
      "Tante Loesy moet 1000 donuts bakken voor het stadsfestival, maar haar oven is kapot. Het hele team moet samenwerken om een creatieve oplossing te vinden.",
  },
  {
    number: 8,
    title: "De Terkwaas Uitvinding",
    theme: "Creativiteit en fouten maken",
    keywords: ["terkwaas", "uitvinding", "fout", "creatief", "ontdekking"],
    synopsis:
      "Karel probeert een nieuwe uitvinding te maken maar alles gaat mis. Door een toevallige fout ontdekt hij iets terkwaas — iets dat niemand had verwacht.",
  },
  {
    number: 9,
    title: "De Grote Snoep-Ontmaskering",
    theme: "Vergeven en tweede kansen",
    keywords: ["ontmaskering", "snoep", "Bobby", "vergeven", "waarheid"],
    synopsis:
      "Het mysterie van het verdwenen snoep wordt opgelost. Bobby de Boze blijkt erachter te zitten, maar zijn reden is verrassend. Het team leert over vergeven.",
  },
  {
    number: 10,
    title: "Bobby de Grappige",
    theme: "Verandering en groei",
    keywords: ["Bobby", "grappig", "transformatie", "groei", "lachen"],
    synopsis:
      "Bobby verandert van Bobby de Boze naar Bobby de Grappige. Het seizoensfinale viert vriendschap, groei en de kracht van humor.",
  },
];

// ─── Content Types ────────────────────────────────────────────────

export type ContentType =
  | "opvoed_tip"
  | "behind_scenes"
  | "karakter_spotlight"
  | "quote"
  | "vraag_aan_kids"
  | "fun_fact"
  | "luister_tip";

export const CONTENT_TYPES: { type: ContentType; label: string; description: string }[] = [
  {
    type: "opvoed_tip",
    label: "Opvoed-tip",
    description: "Praktische tip voor ouders, gelinkt aan het thema van een aflevering",
  },
  {
    type: "behind_scenes",
    label: "Behind the Scenes",
    description: "Leuk weetje over hoe de podcast gemaakt wordt",
  },
  {
    type: "karakter_spotlight",
    label: "Karakter Spotlight",
    description: "Spotlight op een personage met leuke feiten en persoonlijkheidskenmerken",
  },
  {
    type: "quote",
    label: "Quote",
    description: "Een grappige of inspirerende quote uit de aflevering",
  },
  {
    type: "vraag_aan_kids",
    label: "Vraag aan Kids",
    description: "Een interactieve vraag om kinderen en ouders te betrekken",
  },
  {
    type: "fun_fact",
    label: "Fun Fact",
    description: "Leuk feitje over de podcast-wereld of karakters",
  },
  {
    type: "luister_tip",
    label: "Luister-tip",
    description: "Directe aanmoediging om een specifieke aflevering te luisteren",
  },
];

// ─── System Prompt ────────────────────────────────────────────────

const SYSTEM_PROMPT = `Je bent de social media manager van "De Show van Karel Zonderling", een Nederlandse kinderpodcast voor kinderen van 4-8 jaar.

## Over de Podcast
Een audiofictie-podcast met vrolijke avonturen, humor en mooie boodschappen voor jonge kinderen.

## Hoofdpersonages
- **Karel Zonderling**: De hoofdheld! Een blonde jongen met een paarse trui met een grote K erop en een rode cape. Karel is dapper, lief en soms een beetje onhandig. Zijn superkracht is zijn grote hart en zijn vermogen om het beste in anderen te zien.
- **Colibri**: Een groene alien met paarse staartjes. Ze komt van een verre planeet en voelt zich soms anders. Ze is superslim, nieuwsgierig en kan soms dingen die mensen niet kunnen.
- **Snoezy**: Een kleine grijze muis die in het HQ woont. Ondanks zijn kleine formaat heeft hij het grootste hart. Dapper, loyaal en altijd hongerig.
- **Dylan de Badeend**: Een gele badeend met een coole zonnebril. Hij praat als een surfer-dude en zegt altijd "cool, man". Onder zijn coole uiterlijk is hij eigenlijk heel gevoelig.
- **Tante Loesy**: Eigenares van het donut-café boven het geheime HQ. Warm, grappig en bakt de beste donuts van de stad.
- **Meneer Willy**: Eigenaar van de snoepwinkel. Vriendelijk en een beetje vergeetachtig.
- **Bobby de Boze / Bobby de Grappige**: Begint als pestkopper maar verandert door het seizoen heen. Leert dat humor beter werkt dan boosheid.

## Locaties
- Het Geheime HQ: Onder het donut-café van Tante Loesy. Toegang via het codewoord "Wil je er een koekje bij?"
- Tante Loesy's Donut-Café: Boven het HQ, altijd vol met de geur van verse donuts
- Meneer Willy's Snoepwinkel: Waar het mysterie van het verdwenen snoep begint

## Seizoen 1 Verhaallijn
10 afleveringen waarin Karel en zijn team het mysterie van het verdwenen snoep oplossen en Bobby de Boze helpen veranderen in Bobby de Grappige.

## Stijl & Toon
- Vrolijk, warm, avontuurlijk
- Humor die zowel kinderen als ouders aanspreekt
- Hand-drawn superhelden thema met felle kleuren (paars, rood, turquoise, goud)
- Typische uitspraken: "Terkwaas!" (betekent iets geweldigs/geks), "Cool, man" (Dylan)

## Doelgroep Social Media
- Primair: Ouders van kinderen 4-8 jaar
- Secundair: Opa's, oma's, oppassen, leerkrachten
- Toon: Warm, toegankelijk, een beetje grappig, nooit betuttelend

## Hashtags Pool
#KarelZonderling #DeShowVanKarelZonderling #Kinderpodcast #PodcastVoorKinderen #Luistertip #VoorleesAlternatief #KinderAudio #Opvoeden #Opvoedtip #SamenLuisteren #Audiofictie #NederlandsePodcast #PeuterEnKleuter #Groep1 #Groep2 #Groep3 #SuperheldKarel #Terkwaas`;

// ─── Content Generation ───────────────────────────────────────────

export interface GeneratedPost {
  text: string;
  hashtags: string[];
  imagePrompt: string;
  contentType: ContentType;
  episodeNumber: number;
  episodeTitle: string;
}

const CONTENT_TYPE_PROMPTS: Record<ContentType, string> = {
  opvoed_tip: `Schrijf een opvoed-tip voor ouders op social media, gebaseerd op het thema van deze aflevering.
De tip moet:
- Concreet en direct toepasbaar zijn
- Gelinkt zijn aan het thema zonder te veel van het verhaal te verklappen
- Ouders aanmoedigen om de podcast samen met hun kind te luisteren
- Warm en bemoedigend van toon zijn, niet betuttelend
- 3-5 zinnen lang zijn (exclusief hashtags)
- Eindigen met een call-to-action richting de podcast`,

  behind_scenes: `Schrijf een "behind the scenes" social media post over deze aflevering.
De post moet:
- Een leuk, fictief detail delen over het maakproces of de podcastwereld
- Het gevoel geven dat volgers een exclusief kijkje krijgen
- Luchtig en entertainend zijn
- 3-5 zinnen lang zijn
- Nieuwsgierigheid opwekken om de aflevering te luisteren`,

  karakter_spotlight: `Schrijf een "karakter spotlight" post over een personage uit deze aflevering.
De post moet:
- Een personage uitlichten met leuke eigenschappen en feiten
- Kinderen aanspreken via de ouders ("Wist je kind al dat...")
- Persoonlijkheid van het karakter laten zien
- 3-5 zinnen lang zijn
- Ouders en kinderen aanmoedigen het personage te ontdekken in de podcast`,

  quote: `Schrijf een social media post rond een grappige of inspirerende quote die bij deze aflevering past.
De post moet:
- Een fictieve quote bevatten van een personage, passend bij het thema
- De quote visueel laten opvallen (met aanhalingstekens en het personage erbij)
- Context geven waarom deze quote leuk/belangrijk is
- 2-4 zinnen begeleidende tekst
- Aansluiten bij het thema van de aflevering`,

  vraag_aan_kids: `Schrijf een interactieve social media post met een vraag voor kinderen (via hun ouders).
De post moet:
- Een leuke, makkelijk te beantwoorden vraag stellen gelinkt aan het thema
- Ouders aanmoedigen om de vraag aan hun kind te stellen
- Engagement stimuleren (reageren in comments)
- 2-4 zinnen begeleidende tekst
- Laagdrempelig en speels zijn`,

  fun_fact: `Schrijf een "fun fact" social media post gelinkt aan deze aflevering.
De post moet:
- Een leuk, verrassend feitje delen over de podcastwereld of het thema
- Entertainend en licht educatief zijn
- Nieuwsgierigheid opwekken
- 3-5 zinnen lang zijn
- Kinderen en ouders verrassen`,

  luister_tip: `Schrijf een "luister-tip" social media post die ouders aanmoedigt deze specifieke aflevering te luisteren.
De post moet:
- Enthousiast de aflevering aanbevelen
- Net genoeg vertellen om nieuwsgierig te maken, zonder spoilers
- Een concreet luistermoment suggereren (in de auto, voor het slapen, op een regenachtige middag)
- 3-5 zinnen lang zijn
- Een duidelijke call-to-action bevatten`,
};

/**
 * Generate a social media post using Claude API.
 */
export async function generatePostContent(
  contentType: ContentType,
  episode: Episode,
  anthropicApiKey: string
): Promise<GeneratedPost> {
  const client = new Anthropic({ apiKey: anthropicApiKey });

  const typePrompt = CONTENT_TYPE_PROMPTS[contentType];
  const typeInfo = CONTENT_TYPES.find((ct) => ct.type === contentType);

  const userPrompt = `Genereer een social media post voor Facebook/Instagram.

## Content Type: ${typeInfo?.label || contentType}
${typePrompt}

## Aflevering Info
- Nummer: ${episode.number}
- Titel: "${episode.title}"
- Thema: ${episode.theme}
- Synopsis: ${episode.synopsis}
- Keywords: ${episode.keywords.join(", ")}

## Output Format
Antwoord ALLEEN in valid JSON (geen markdown codeblokken, geen uitleg):
{
  "text": "De volledige post-tekst inclusief emoji's. Geen hashtags in dit veld.",
  "hashtags": ["#Hashtag1", "#Hashtag2", "#Hashtag3", "#Hashtag4", "#Hashtag5"],
  "imagePrompt": "A detailed English prompt for generating a social media image. Colorful, child-friendly illustration style with hand-drawn superhero aesthetic. Include specific scene elements from the episode."
}

Belangrijk:
- Gebruik emoji's in de tekst (dit is social media!)
- Schrijf in het Nederlands
- Kies 4-6 relevante hashtags uit de beschikbare pool
- De image prompt moet in het Engels zijn en specifiek genoeg voor AI image generation
- Toon: warm, vrolijk, ouder-gericht`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Geen tekst ontvangen van Claude API");
  }

  // Strip potential markdown code fences
  let jsonText = textBlock.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
  }

  const parsed = JSON.parse(jsonText);

  return {
    text: parsed.text,
    hashtags: parsed.hashtags,
    imagePrompt: parsed.imagePrompt,
    contentType,
    episodeNumber: episode.number,
    episodeTitle: episode.title,
  };
}

// ─── Content Picker ───────────────────────────────────────────────

/**
 * Pick the next content type + episode combination, avoiding recent repeats.
 * Tries to maximize variety in both content type and episode selection.
 */
export function pickNextContent(
  recentTypes: string[]
): { contentType: ContentType; episode: Episode } {
  // Find content types not recently used
  const allTypes = CONTENT_TYPES.map((ct) => ct.type);
  const availableTypes = allTypes.filter(
    (t) => !recentTypes.slice(0, 5).includes(t)
  );

  // If all types were recently used, pick from the least recent ones
  const typePool = availableTypes.length > 0 ? availableTypes : allTypes;

  // Random pick from available types
  const contentType = typePool[Math.floor(Math.random() * typePool.length)];

  // Pick an episode — weight towards less-promoted episodes
  // Simple approach: pick randomly from all episodes
  const episode =
    SEASON_1_EPISODES[Math.floor(Math.random() * SEASON_1_EPISODES.length)];

  return { contentType, episode };
}

/**
 * Pick a week's worth of content (7 posts), ensuring good variety.
 */
export function pickWeekOfContent(
  recentTypes: string[]
): { contentType: ContentType; episode: Episode }[] {
  const picks: { contentType: ContentType; episode: Episode }[] = [];
  const usedTypes: string[] = [...recentTypes];
  const usedEpisodes: number[] = [];

  for (let i = 0; i < 7; i++) {
    const allTypes = CONTENT_TYPES.map((ct) => ct.type);

    // Avoid types used in the last 5 picks (including new ones)
    let availableTypes = allTypes.filter(
      (t) => !usedTypes.slice(-5).includes(t)
    );
    if (availableTypes.length === 0) availableTypes = allTypes;

    const contentType =
      availableTypes[Math.floor(Math.random() * availableTypes.length)];

    // Prefer episodes not yet used in this batch
    let availableEpisodes = SEASON_1_EPISODES.filter(
      (ep) => !usedEpisodes.includes(ep.number)
    );
    if (availableEpisodes.length === 0) availableEpisodes = SEASON_1_EPISODES;

    const episode =
      availableEpisodes[Math.floor(Math.random() * availableEpisodes.length)];

    picks.push({ contentType, episode });
    usedTypes.push(contentType);
    usedEpisodes.push(episode.number);
  }

  return picks;
}
