import Image from "next/image";
import HeroSection from "@/components/heroSection";

export default function Home() {
  return <>
    <HeroSection />
    <div className="text-6xl text-center flex">Sono il titolo di pagina</div>
    <Image src='/spotify.png' alt="Foto-spotify" width={400} height={800} />
  </>
}
