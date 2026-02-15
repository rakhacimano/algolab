"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="h-screen w-screen overflow-hidden flex flex-col text-black selection:bg-black selection:text-white">
            {/* Minimal Navbar */}
            <nav className="flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
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
                <div className="flex items-center gap-6">
                    <Link
                        href="/sorting"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors hidden sm:block"
                    >
                        Algorithms
                    </Link>
                    <Link
                        href="/features"
                        className="text-sm font-medium text-gray-600 hover:text-black transition-colors hidden sm:block"
                    >
                        Learn
                    </Link>
                    <Link
                        href="/"
                        className="rounded-full bg-primary-600 px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
                    >
                        Start Learning
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
                <div className="relative w-full max-w-xs aspect-[4/3] animate-in fade-in zoom-in duration-700">
                    <Image
                        src="/images/404.png"
                        alt="Sad robot with spilled code"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 tracking-tight">
                    Oh, the tragedy!
                </h1>

                <p className="max-w-md text-gray-600 text-md mb-6 leading-relaxed font-medium">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    <Link
                        href="/"
                        className="w-full sm:w-auto rounded-full bg-primary-600 px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-primary-700 hover:shadow-lg active:scale-95"
                    >
                        Go to homepage
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto rounded-full bg-gray-100 px-8 py-3.5 text-base font-bold text-gray-900 transition-all hover:bg-gray-200 active:scale-95"
                    >
                        Try again
                    </button>
                </div>

                {/* Footer Links */}
                <div className="text-sm text-gray-500 py-6">
                    <p className="mb-3 font-medium">You might be looking for:</p>
                    <div className="flex flex-wrap justify-center gap-6 font-semibold text-gray-800">
                        <Link href="/sorting" className="hover:underline decoration-2 underline-offset-4">
                            Sorting Algorithms
                        </Link>
                        <Link href="/" className="hover:underline decoration-2 underline-offset-4">
                            Features
                        </Link>
                        <Link href="/" className="hover:underline decoration-2 underline-offset-4">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
