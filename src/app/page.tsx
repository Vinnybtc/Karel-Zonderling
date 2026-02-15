import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CharacterGuide from "@/components/CharacterGuide";
import SpotifySection from "@/components/SpotifySection";
import Tijdcapsule from "@/components/Tijdcapsule";
import Footer from "@/components/Footer";
import FloatingSpotifyButton from "@/components/FloatingSpotifyButton";
import ValentinePopup from "@/components/ValentinePopup";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CharacterGuide />
        <SpotifySection />
        <Tijdcapsule />
      </main>
      <Footer />
      <FloatingSpotifyButton />
      <ValentinePopup />
    </>
  );
}
