'use client';

import { useState } from "react";
import Image from "next/image";
import HeroSection from "@/components/heroSection";
import AppCarousel from "@/components/appCarousel";

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

        <div className="flex justify-end gap-3 mt-20 mb-20 mx-auto max-w-[1700px] px-4">
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

        <h2 className="text-4xl text-center">Design Responsivo!</h2>

        <div className="flex flex-wrap justify-center gap-6 mt-20 mb-20 mx-auto px-4">
          {[
            { src: '/spotify.png', alt: 'foto-spotify', nome: 'Desktop' },
            { src: '/tablet.png', alt: 'foto-tablet-spotify', nome: 'Tablet' },
            { src: '/phone.png', alt: 'foto-phone-spotify', nome: 'Mobile' },
          ].map((image, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <p className="text-lg font-semibold">{image.nome}</p>
              <div
                className="w-[400px] h-[600px] bg-neutral-900 flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={500}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-20"
            onClick={() => setSelectedImage(null)}
          >

            <div className="relative w-full max-w-5xl p-4">
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
                onClick={() => setSelectedImage(null)}
              >
                &times;
              </button>
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedImage}
                  alt="Ingrandimento"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
