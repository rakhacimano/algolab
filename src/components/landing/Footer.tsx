"use client";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface-alt py-10">
            <div className="mx-auto max-w-6xl px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="relative h-7 w-28">
                        <Image
                            src="/logo.png"
                            alt="AlgoPad"
                            fill
                            className="object-contain object-center"
                        />
                    </div>
                </div>
                <p className="text-sm text-text-muted">
                    Built for students who want to truly understand algorithms.
                </p>
                <p className="mt-2 text-xs text-text-muted">
                    © {new Date().getFullYear()} AlgoLab. Open source educational tool.
                </p>
            </div>
        </footer>
    );
}
