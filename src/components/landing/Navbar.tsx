"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl rounded-full border border-white/20 bg-white/70 backdrop-blur-xl shadow-xl ring-1 ring-black/5 transition-all">
            <div className="mx-auto flex items-center justify-between px-6 py-3">
                <Link href="/" className="flex items-center gap-2.5 mx-auto md:mx-0">
                    <div className="relative h-10 w-40">
                        <Image
                            src="/logo.png"
                            alt="AlgoPad"
                            fill
                            className="object-contain object-center md:object-left"
                            priority
                        />
                    </div>
                </Link>
                <div className="flex items-center gap-6 hidden md:flex">
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
                        <Link href="/sorting" className="hover:text-primary-600 transition-colors">Algorithms</Link>
                        <Link href="#features" className="hover:text-primary-600 transition-colors">Features</Link>
                    </div>
                    <Link
                        href="/sorting"
                        className="rounded-full bg-primary-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 active:scale-95"
                    >
                        Start Learning
                    </Link>
                </div>
            </div>
        </nav>
    );
}
