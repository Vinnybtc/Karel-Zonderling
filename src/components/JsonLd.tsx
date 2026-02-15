export default function JsonLd() {
  const podcastSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "De Show van Karel Zonderling",
    description:
      "Een gratis Nederlandse kinderpodcast vol superhelden, marshmallows en pratende badeenden. Luister mee naar de avonturen van Karel, Alien Colibri en Snoezy de muis!",
    url: "https://karelzonderling.nl",
    webFeed: "https://open.spotify.com/show/7eL8rBY47fQNSBQ5F9zl3t",
    inLanguage: "nl",
    genre: ["Kinderpodcast", "Kinderen & Gezin", "Verhalen"],
    author: {
      "@type": "Organization",
      name: "De Show van Karel Zonderling",
      url: "https://karelzonderling.nl",
    },
    episode: [
      {
        "@type": "PodcastEpisode",
        name: "De Donutcode",
        episodeNumber: 1,
        url: "https://open.spotify.com/episode/7JPQov5PGujvY0qjW1HEBo",
        description: "In het Donut Café lijkt alles rustig, tot de kassajuf plots het geheime codewoord zegt...",
      },
      {
        "@type": "PodcastEpisode",
        name: "De Grote snoepgoed verdwijning bij meneer Willy",
        episodeNumber: 2,
        url: "https://open.spotify.com/episode/76rgAmRAnCTP16xM6bzUsg",
        description: "Een mysterieus figuur steelt al het snoep uit de winkel van Meneer Willy met een knip van zijn vingers!",
      },
      {
        "@type": "PodcastEpisode",
        name: "De Suikersporen en De Pratende Badeend",
        episodeNumber: 3,
        url: "https://open.spotify.com/episode/09pPvSzEZkwdrV6M4MZDYA",
        description: "Het onderzoek naar de snoep-diefstal leidt tot een bijzondere ontdekking: Dylan de badeend kan praten!",
      },
      {
        "@type": "PodcastEpisode",
        name: "De Kaasval",
        episodeNumber: 4,
        url: "https://open.spotify.com/episode/5qy0tnR3s4rP4MCjyPuyCl",
        description: "Snoezy trapt in een val van Bobby de Boze in een mechanisch pak. Kan het team hem redden?",
      },
      {
        "@type": "PodcastEpisode",
        name: "Het plan van Bobby de Boze",
        episodeNumber: 5,
        url: "https://open.spotify.com/episode/61OLdwQRpSy6waCCUxAHDB",
        description: "Het team ontdekt dat Snoezy vermist is. Een mysterieuze deur leidt naar een dreigende ontdekking...",
      },
      {
        "@type": "PodcastEpisode",
        name: "Bobby de Boze… of Bobby de Verdrietige?",
        episodeNumber: 6,
        url: "https://open.spotify.com/episode/3tF4b99seJGf5BmaBm4KVh",
        description: "Karel blijft achter bij een kapotte deur. De spanning stijgt en hulp komt eraan!",
      },
      {
        "@type": "PodcastEpisode",
        name: "De Saaiste dag ooit! Of toch niet?",
        episodeNumber: 7,
        url: "https://open.spotify.com/episode/3TgxiZM2Xlf11v991Rwbuq",
        description: "Verveling verandert in een wild avontuur met chocoladefonteinen en pretzels!",
      },
      {
        "@type": "PodcastEpisode",
        name: "Het grote feest van Bobby de Grappige",
        episodeNumber: 8,
        url: "https://open.spotify.com/episode/6jY12SwDiUynONX9J2RIfG",
        description: "'Kom je ook naar mijn feestje?' Mysterieuze posters verschijnen door de hele stad!",
      },
      {
        "@type": "PodcastEpisode",
        name: "Er is er een jarig!",
        episodeNumber: 9,
        url: "https://open.spotify.com/episode/1qN8julgl3qZ8KERLhIs8V",
        description: "Een verjaardags-zwemfeest voor Alien Colibri met onverwachte cadeaus!",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "De Show van Karel Zonderling",
    url: "https://karelzonderling.nl",
    inLanguage: "nl",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
