import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CharacterGuide from "@/components/CharacterGuide";
import SpotifySection from "@/components/SpotifySection";
import Kleurplaten from "@/components/Kleurplaten";
import PersonageQuiz from "@/components/PersonageQuiz";
import Tijdcapsule from "@/components/Tijdcapsule";
import Footer from "@/components/Footer";
import FloatingSpotifyButton from "@/components/FloatingSpotifyButton";
import ValentinePopup from "@/components/ValentinePopup";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <Hero />
        <CharacterGuide />
        <SpotifySection />
        <Kleurplaten />
        <PersonageQuiz />
        <Tijdcapsule />
      </main>
      <Footer />
      <FloatingSpotifyButton />
      <ValentinePopup />
    </>
  );
}
