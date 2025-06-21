

"use client";
import React, { ReactNode, HTMLAttributes } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay, { AutoplayOptionsType } from "embla-carousel-autoplay";
import AutoScroll, { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import { cn } from "@/lib/utils";

export function Carousel({
    children,
    loop = false,
    autoplay = false,
    autoplayOptions,
    autoScroll = false,
    autoScrollOptions,
    draggable = false,
    className,
    ...props
}) {
    const options = { loop, watchDrag: draggable };
    const plugins = [];

    if (autoplay) {
        plugins.push(Autoplay(autoplayOptions));
    }

    if (autoScroll) {
        plugins.push(AutoScroll(autoScrollOptions));
    }

    const [emblaRef] = useEmblaCarousel(options, plugins);

    return (
        <div className={cn("overflow-hidden", className)} ref={emblaRef} {...props}>
            {children}
        </div>
    );
}



export function CarouselContainer({
    children,
    className,
    ...props
}) {
    return (
        <div className={cn("flex", className)} {...props}>
            {children}
        </div>
    );
}

export function CarouselSlide({
    children,
    className,
    ...props
}) {
    return (
        <div className={cn("flex-shrink-0 w-full min-w-0", className)} {...props}>
            {children}
        </div>
    );
}


