"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-surface-alt to-accent-50" />
            <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary-200/30 blur-[120px]" />

            <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700">
                        <span className="inline-block h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
                        Interactive Algorithm Learning
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-7xl">
                        Learn Algorithms &{" "}
                        <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                            Data Structures
                        </span>
                        , Visually
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary leading-relaxed">
                        Stop reading boring textbooks. Watch algorithms come alive with
                        step-by-step animations, highlighted code, and plain-English
                        explanations.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/sorting"
                            className="group flex items-center gap-2 rounded-2xl bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-2xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
                        >
                            Start with Sorting
                            <svg
                                className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
                        <span className="text-sm text-text-muted">
                            Free &amp; open source — no signup needed
                        </span>
                    </div>
                </motion.div>

                {/* Mini visualizer preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-16 mx-auto max-w-lg"
                >
                    <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl">
                        <div className="flex items-end justify-center gap-1.5 h-32">
                            {[35, 70, 20, 85, 50, 40, 65, 25, 90, 55, 30, 75, 45, 60, 80].map(
                                (val, i) => (
                                    <motion.div
                                        key={i}
                                        className="rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400 min-w-[12px] flex-1"
                                        initial={{ height: 0 }}
                                        animate={{ height: `${val}%` }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5 + i * 0.05,
                                            ease: "easeOut",
                                        }}
                                    />
                                )
                            )}
                        </div>
                        <p className="mt-4 text-xs text-text-muted text-center">
                            Interactive sorting visualization preview
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
