"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center pt-32 pb-12">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface-alt to-accent-50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-200/30 blur-[100px]" />

            <div className="relative mx-auto max-w-3xl px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-primary-700 shadow-sm">
                        <span className="inline-block h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
                        Interactive Algorithm Learning
                    </div>
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl lg:text-6xl mb-6">
                        Learn Algorithms &{" "}
                        <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                            Data Structures
                        </span>
                        , Visually
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary leading-relaxed sm:text-lg">
                        Stop reading boring textbooks. Watch algorithms come alive with
                        step-by-step animations, highlighted code, and plain-English
                        explanations.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/sorting"
                            className="group flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5 active:scale-95"
                        >
                            Start with Sorting
                            <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </Link>
                        <span className="text-xs text-text-muted font-medium">
                            Free &amp; visual learning
                        </span>
                    </div>
                </motion.div>

                {/* Mini visualizer preview - simplified for fit */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-12 mx-auto max-w-sm"
                >
                    <div className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-5 shadow-xl ring-1 ring-black/5">
                        <div className="flex items-end justify-center gap-1 h-24">
                            {[35, 70, 20, 85, 50, 40, 65, 25, 90, 55, 30, 75, 45, 60, 80].map(
                                (val, i) => (
                                    <motion.div
                                        key={i}
                                        className="rounded-t-sm bg-gradient-to-t from-primary-600 to-primary-400 min-w-[8px] flex-1"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.4 + i * 0.05,
                                            ease: "easeOut",
                                        }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
