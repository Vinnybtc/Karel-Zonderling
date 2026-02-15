import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "De Show van Karel Zonderling",
    short_name: "Karel Zonderling",
    description:
      "Luister mee naar de avonturen van Karel, Alien Colibri en Snoezy de muis!",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8F0",
    theme_color: "#7B68EE",
    icons: [
      {
        src: "/icon",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
