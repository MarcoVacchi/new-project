import React from 'react';
import { Carousel, CarouselContainer, CarouselSlide } from './carousel';
import { LogosCarousel } from '@/config/carouselSocial';

export default function ToolsCarousel() {
    return (
        <div className="container relative bg-transparent mx-auto my-20 ">
            <div
                className="absolute  bg-gradient-to-r from-background
       to-transparent left top-0 bottom-0 z-10 w-10 md:w-16"
            ></div>
            <Carousel
                className="container mx-auto z-0"
                autoScroll
                loop
                draggable={false}
                autoScrollOptions={{ speed: 1 }}
            >
                <CarouselContainer>
                    {LogosCarousel.map((logo) => (
                        <CarouselSlide
                            className="w-24 h-24 md:w-40  md:h-40 flex justify-center items-center "
                            key={logo.name}
                        >
                            <a href={logo.href || '#'} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center">
                                <span className="sr-only">{logo.name}</span>
                                <logo.icon className="text-primary/20 w-16 h-16 md:w-28 md:h-28 " />
                            </a>
                        </CarouselSlide>
                    ))}
                </CarouselContainer>
            </Carousel>
            <div
                className="absolute bg-gradient-to-l from-background
       to-transparent  right-0 top-0 bottom-0 z-10 w-10 md:w-16"
            ></div>
        </div>
    );
}