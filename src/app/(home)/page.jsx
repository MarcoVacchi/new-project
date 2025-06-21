'use client';

import { useState } from "react";
import Image from "next/image";
import HeroSection from "@/components/heroSection";
import AppCarousel from "@/components/appCarousel";
import ResponsiveDeviceShowcase from "@/components/responsiveDevice";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div>
        <HeroSection />
      </div>
      <AppCarousel />

      <section className="bg-neutral-900 text-white mt-20 mb-20">
        <h2 className="text-4xl text-center p-3">Alcuni miei progetti</h2>

        <div className="flex justify-end gap-3 mt-20 mb-50 mx-auto max-w-[1700px] px-4">
          <div className="w-[650px] text-[18px] leading-loose">
            Spotify è stato uno dei miei primi grandi progetti, una vera sfida, tema del primo fra i miei esami durante il mio percorso di apprendimento,
            un progetto che mi ha permesso di imparare molto e di mettere in pratica le mie conoscenze. Non presenta interattività, qui è presente soltanto HTML e CSS, ma è stato un progetto molto utile per comprendere le basi del design e della struttura di un sito web.
          </div>

          <div
            className="
              w-auto 
              transition-transform duration-300 ease-in-out
              hover:scale-105
              hover:shadow-xl 
              rounded-lg 
              overflow-hidden 
              cursor-pointer 
            "
            onClick={() => setSelectedImage('/spotify.png')}
          >
            <Image
              src="/spotify.png"
              alt="foto-spotify"
              width={800}
              height={1800}
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-20 mb-20 mx-auto max-w-[1700px] px-4">
          <div
            className="
              w-auto 
              transition-transform duration-300 ease-in-out
              hover:scale-105
              hover:shadow-xl 
              rounded-lg 
              overflow-hidden 
              cursor-pointer 
            "
            onClick={() => setSelectedImage('/booroad.png')}
          >

            <Image
              src="/booroad.png"
              alt="foto-booroad"
              width={800}
              height={1800}
              className="object-contain"
            />
          </div>
          <div className="w-[650px] ml-5 text-[18px] leading-loose">
            Booroad è un progetto realizzato in gruppo per un esame di Soft Skills.
            Questo applicativo web è stato sviluppato con l’obiettivo di creare una piattaforma per la gestione di eventi e prenotazioni, inclusi viaggi.
            Il progetto comprende la gestione sia del backend che del frontend e ha richiesto una buona dose di collaborazione e coordinamento tra i membri del team.
            Abbiamo utilizzato tecnologie moderne e pratiche di sviluppo agile per portare a termine con successo questa esperienza.
          </div>

        </div>

        <ResponsiveDeviceShowcase />

      </section >

    </>
  );
}

