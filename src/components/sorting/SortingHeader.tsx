"use client";

import Link from "next/link";
import Image from "next/image";
import { Algorithm } from "@/lib/types";

interface SortingHeaderProps {
    algorithm: Algorithm;
}

export default function SortingHeader({ algorithm }: SortingHeaderProps) {
    return (
        <header className="h-16 flex-none border-b border-border bg-surface/80 backdrop-blur-xl z-50 sticky top-0">
            <div className="h-full mx-auto flex w-full max-w-[1920px] items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-10 w-40">
                            <Image
                                src="/logo.png"
                                alt="AlgoPad"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                    <div className="h-6 w-px bg-border hidden sm:block mx-2" />
                    <h1 className="text-lg font-semibold text-text-primary hidden sm:block">
                        {algorithm.name}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-border shadow-sm">
                        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                            Complexity
                        </span>
                        <span className="text-sm font-mono font-medium text-text-secondary">
                            {algorithm.complexity.worst}
                        </span>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors group"
                    >
                        <svg
                            className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Exit
                    </Link>
                </div>
            </div>
        </header>
    );
}
