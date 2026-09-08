// Full-screen gallery modal showing every design of a project on-site,
// so visitors don't need to leave for Google Drive. Supports arrow keys,
// Escape, click-outside, and touch swipe. Thumbnails jump between images.

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

const imageUrl = (project, file) =>
    encodeURI(`/projects/${project.folder}/${file}`);

const captionFor = (file) =>
    file
        .replace(/\.[^.]+$/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

export const ProjectGallery = ({ project, onClose }) => {
    const images = project.images;
    const count = images.length;
    const [index, setIndex] = useState(0);
    const touchStartX = useRef(null);

    const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
    const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

    useEffect(() => {
        const handleKey = (event) => {
            if (event.key === "Escape") onClose();
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
    }, [onClose, next, prev]);

    const handleTouchStart = (event) => {
        touchStartX.current = event.touches[0].clientX;
    };
    const handleTouchEnd = (event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
        touchStartX.current = null;
    };

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} gallery`}
        >
            {/* Header: project info, drive link, close */}
            <div
                className="flex items-center justify-between gap-4 px-4 sm:px-8 py-4 border-b border-border/50"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold truncate">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">
                        {index + 1} / {count}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {project.driveUrl && (
                        <a
                            href={project.driveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-full border border-border"
                        >
                            <ExternalLink size={16} /> Google Drive
                        </a>
                    )}
                    <button
                        onClick={onClose}
                        aria-label="Close gallery"
                        className="p-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>
            </div>

            {/* Main image with prev/next arrows and swipe support */}
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
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-6 p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    <ChevronLeft size={28} />
                </button>
                <figure
                    className="flex flex-col items-center gap-3 max-h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <img
                        key={index}
                        src={imageUrl(project, images[index])}
                        alt={`${project.title} - ${captionFor(images[index])}`}
                        className="max-h-[62vh] max-w-full object-contain rounded-lg shadow-lg"
                    />
                    <figcaption className="text-sm text-muted-foreground capitalize text-center">
                        {captionFor(images[index])}
                    </figcaption>
                </figure>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        next();
                    }}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-6 p-2 rounded-full bg-secondary/80 text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            {/* Thumbnail strip */}
            <div
                className="border-t border-border/50 py-3 px-4"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex gap-2 overflow-x-auto justify-start sm:justify-center pb-1">
                    {images.map((file, i) => (
                        <button
                            key={file}
                            onClick={() => setIndex(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className={cn(
                                "shrink-0 h-14 w-14 rounded-md overflow-hidden border-2 transition-all",
                                i === index
                                    ? "border-primary"
                                    : "border-transparent opacity-50 hover:opacity-100"
                            )}
                        >
                            <img
                                src={imageUrl(project, file)}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
