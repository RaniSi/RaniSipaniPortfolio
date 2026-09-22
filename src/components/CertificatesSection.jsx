// Certificates section: showcases earned certificates in a card grid.
// Clicking a card opens a lightbox with prev/next navigation, keyboard and
// swipe support, matching the project gallery behavior.

import { useCallback, useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

const certificates = [
    {
        id: 1,
        title: "Graphic Design",
        issuer: "Websity - Bikaner",
        year: "2026",
        note: "5-month professional course (May 2026 - Sep 2026)",
        file: "Rani Sipani Graphic Designer Certificate.jpeg",
    },
    {
        id: 2,
        title: "Adobe Photoshop CC Crash Course",
        issuer: "Udemy",
        year: "2026",
        note: "Learn Photoshop In Two Hour - Instructor: Stephen Koel Soren",
        verify: "https://ude.my/UC-f05bfe32-8646-45b6-a3b2-d7f222c7b410",
        file: "Rani Sipani Adobe Photoshop Crash Course Certificate.jpeg",
    },
    {
        id: 3,
        title: "Canva Masterclass",
        issuer: "Udemy",
        year: "2025",
        note: "For Social Media And Content Creation - Instructor: Chetan Pujari",
        verify: "https://ude.my/UC-47f7ab96-e86a-473c-85e7-dad28a61e306",
        file: "Rani Sipani Canva Masterclass Certificate.jpeg",
    },
];

const certUrl = (file) => encodeURI(`/Certificates/${file}`);

export const CertificatesSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const touchStartX = useRef(null);
    const count = certificates.length;

    const close = useCallback(() => setActiveIndex(null), []);
    const next = useCallback(() => setActiveIndex((i) => (i + 1) % count), [count]);
    const prev = useCallback(() => setActiveIndex((i) => (i - 1 + count) % count), [count]);

    useEffect(() => {
        if (activeIndex === null) return;
        const handleKey = (event) => {
            if (event.key === "Escape") close();
            else if (event.key === "ArrowRight") next();
            else if (event.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handleKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [activeIndex, close, next, prev]);

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };
    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
        touchStartX.current = null;
    };

    const activeCert = activeIndex !== null ? certificates[activeIndex] : null;

    return (
        <section id="certificates" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    My <span className="text-primary"> Certificates</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Professional courses and training I've completed to keep my
                    design skills sharp.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert, i) => (
                        <div
                            key={cert.id}
                            onClick={() => setActiveIndex(i)}
                            className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover cursor-pointer"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={certUrl(cert.file)}
                                    alt={cert.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
                                        <BadgeCheck size={16} />
                                        View Certificate
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-primary">
                                        {cert.issuer}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {cert.year}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold mb-1">
                                    {cert.title}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {cert.note}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {activeCert && (
                <div
                    className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activeCert.title} certificate`}
                >
                    <div
                        className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4 border-b border-border/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="min-w-0">
                            <h3 className="text-lg font-semibold truncate">
                                {activeCert.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {activeIndex + 1} / {count} - {activeCert.issuer}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {activeCert.verify && (
                                <a
                                    href={activeCert.verify}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-primary/10 transition-colors text-sm"
                                >
                                    <ExternalLink size={16} />
                                    Verify
                                </a>
                            )}
                            <button
                                onClick={close}
                                aria-label="Close certificate view"
                                className="p-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                                <X size={22} />
                            </button>
                        </div>
                    </div>
                    <div
                        className="relative flex-1 flex items-center justify-center px-14 sm:px-20 py-4 min-h-0"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                prev();
                            }}
                            aria-label="Previous certificate"
                            className="absolute left-2 sm:left-6 p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <img
                            key={activeIndex}
                            src={certUrl(activeCert.file)}
                            alt={`${activeCert.title} certificate`}
                            className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                next();
                            }}
                            aria-label="Next certificate"
                            className="absolute right-2 sm:right-6 p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>
                    <div
                        className="border-t border-border/50 py-3 px-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex gap-2 overflow-x-auto justify-start sm:justify-center pb-1">
                            {certificates.map((cert, i) => (
                                <button
                                    key={cert.id}
                                    onClick={() => setActiveIndex(i)}
                                    aria-label={`Go to certificate ${i + 1}`}
                                    className={cn(
                                        "shrink-0 h-14 w-14 rounded-md overflow-hidden border-2 transition-all",
                                        i === activeIndex
                                            ? "border-primary"
                                            : "border-transparent opacity-50 hover:opacity-100"
                                    )}
                                >
                                    <img
                                        src={certUrl(cert.file)}
                                        alt=""
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

