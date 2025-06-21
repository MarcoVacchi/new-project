import Image from "next/image";
import HeroSection from "@/components/heroSection";
import Component from "@/components/socialCarousel";


export default function Home() {
  return <>
    <div>
      <HeroSection />
    </div>
    <Component />
    <h2 className="text-4xl text-center">I miei migliori progetti</h2>
    <div className="flex justify-end gap-3 mt-20 mb-20 mx-auto max-w-[1700px] px-4">
      <div className="w-[700px] text-[18px] leading-loose">Spotify è stato uno dei miei primi grandi progetti, una vera sfida, tema del primo fra i miei esami durante il mio percorso di apprendimento,
        un progetto che mi ha permesso di imparare molto e di mettere in pratica le mie conoscenze. Non presenta interattività, qui è presente soltanto HTML e CSS, ma è stato un progetto molto utile per comprendere le basi del design e della struttura di un sito web.
      </div>
      <Image src='/spotify.png' alt="Foto-spotify" width={800} height={1800} />

    </div >
  </>
}
// <Image src='/booroad.png' alt="Foto-booroad" width={400} height={800} />