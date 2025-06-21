import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";

// Utility function for className concatenation
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

// Badge component with variants
const badgeVariants = {
    default:
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary:
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline:
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground",
};

function Badge({ className, variant = "default", ...props }) {
    return (
        <div className={cn(badgeVariants[variant], className)} {...props} />
    );
}

// Device mockup data
const deviceShowcases = [
    {
        id: "desktop",
        name: "Desktop Experience",
        icon: <Monitor className="w-6 h-6" />,
        image:
            "/spotify.png",
        description:
            "Full-featured desktop interface with advanced functionality and comprehensive layouts",
        specs: ["4K Resolution", "Multi-window Support", "Advanced Features"],
        gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
        id: "tablet",
        name: "Tablet Optimized",
        icon: <Tablet className="w-4 h-4" />,
        image: "tablet.png",
        description:
            "Touch-optimized interface designed for tablet interactions and medium screens",
        specs: ["Touch Gestures", "Adaptive Layout", "Portrait/Landscape"],
        gradient: "from-green-500/20 to-blue-500/20",
    },
    {
        id: "mobile",
        name: "Mobile First",
        icon: <Smartphone className="w-6 h-6" />,
        image: "phone.png",
        description:
            "Streamlined mobile experience with intuitive navigation and optimized performance",
        specs: ["One-handed Use", "Fast Loading", "Offline Support"],
        gradient: "from-purple-500/20 to-pink-500/20",
    },
];

function DeviceCard({ device, isActive, onClick, index }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500",
                "bg-background/50 backdrop-blur-sm",
                isActive
                    ? "border-primary/50 shadow-2xl scale-105"
                    : "border-border hover:border-primary/30 hover:shadow-xl hover:scale-102"
            )}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                    device.gradient,
                    isActive || isHovered ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Content */}
            <div className="relative p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div
                            className={cn(
                                "p-2 rounded-lg transition-colors duration-300",
                                isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}
                        >
                            {device.icon}
                        </div>
                        <h3 className="font-semibold text-lg text-foreground">{device.name}</h3>
                    </div>
                    <Badge variant={isActive ? "default" : "outline"}>
                        {isActive ? "Active" : "Preview"}
                    </Badge>
                </div>

                {/* Device Image */}
                <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    <motion.img
                        src={device.image}
                        alt={device.name}
                        className={`w-full h-full ${device.id === "desktop" ? "object-cover" : "object-contain"}`}
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {device.description}
                </p>

                {/* Specs */}
                <div className="space-y-2">
                    <h4 className="text-xs font-medium text-foreground/80 uppercase tracking-wide">
                        Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {device.specs.map((spec, i) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground"
                            >
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover Indicator */}
                <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "100%" : isHovered ? "50%" : "0%" }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </motion.div>
    );
}

function ResponsiveDeviceShowcase() {
    const [activeDevice, setActiveDevice] = useState("desktop");
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.section
            ref={targetRef}
            style={{ opacity }}
            className="w-full py-20 lg:py-32 bg-background"
        >
            <div className="container mx-auto px-4">
                <motion.div style={{ y }} className="flex flex-col gap-12">
                    {/* Header */}
                    <div className="text-center space-y-4 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                            Design Responsivo!
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Vivi un'esperienza senza interruzioni su desktop, tablet e dispositivi mobili con il nostro sistema di design responsivo. Scopri come ogni dispositivo offre un'interfaccia unica e ottimizzata per le tue esigenze.
                        </p>
                    </div>

                    {/* Device Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {deviceShowcases.map((device, index) => (
                            <DeviceCard
                                key={device.id}
                                device={device}
                                isActive={activeDevice === device.id}
                                onClick={() => setActiveDevice(device.id)}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Interactive Preview */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-12 p-8 rounded-2xl border bg-card/50 backdrop-blur-sm"
                    >
                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-semibold text-foreground">
                                Currently Viewing:{" "}
                                {deviceShowcases.find((d) => d.id === activeDevice)?.name}
                            </h3>
                            <div className="flex justify-center space-x-2">
                                {deviceShowcases.map((device) => (
                                    <button
                                        key={device.id}
                                        onClick={() => setActiveDevice(device.id)}
                                        className={cn(
                                            "w-3 h-3 rounded-full transition-all duration-300",
                                            activeDevice === device.id
                                                ? "bg-primary scale-125"
                                                : "bg-muted hover:bg-muted-foreground/50"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default ResponsiveDeviceShowcase;
