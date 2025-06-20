import Image from "next/image";
import HeroSection from "@/components/heroSection";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return <>
    <div>
      <HeroSection />
    </div>
    <Image src='/spotify.png' alt="Foto-spotify" width={400} height={800} />
  </>
}
