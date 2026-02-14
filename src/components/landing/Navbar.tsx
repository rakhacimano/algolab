"use client";

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white font-bold text-sm">
                        AL
                    </div>
                    <span className="text-xl font-bold text-text-primary">
                        AlgoLab
                    </span>
                </Link>
                <Link
                    href="/sorting"
                    className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/25"
                >
                    Start Learning
                </Link>
            </div>
        </nav>
    );
}
