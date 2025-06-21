import React from 'react'
import { HeroGeometric } from '@/components/projectSection'
import ThreeDPhotoCarousel from "@/components/ui/threeDPhotoCarousel"


export default function page() {
    return (
        <>
            <HeroGeometric />
            <ThreeDPhotoCarousel />
            <div>Projects</div>
        </>
    )
}
