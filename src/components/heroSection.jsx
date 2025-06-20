"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ElegantShape from "./shape";

export default function HeroSection({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision.",
    title2 = "Siti web su misura, design innovativo.",
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex  justify-center items-center md:items-start overflow-hidden ">
            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500"
                    className="left-[-10%] md:left-[-5%] top-[1%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500"
                    className="right-[15%] md:right-[20%] top-[2%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500"
                    className="left-[20%] md:left-[25%] top-[0%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto mt-0 md:mt-32 px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/80">
                                {title1}
                            </span>
                            <br />
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-primary to-rose-500 ",
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-2xl sm:text-lg md:text-xl text-primary/65 mb-8 leading-relaxed font-medium tracking-wide max-w-xl mx-auto px-4">
                            Sviluppiamo esperienze digitali eccezionali grazie a design originale e tecnologia avanzata.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
