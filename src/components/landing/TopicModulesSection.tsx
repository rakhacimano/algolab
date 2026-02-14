"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { topicModules, containerVariants, itemVariants } from "./constants";

export default function TopicModulesSection() {
    return (
        <section className="py-20 bg-surface">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                        Explore Topics
                    </h2>
                    <p className="mt-3 text-text-secondary text-lg">
                        Choose a data structure or algorithm topic to start learning.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {topicModules.map((topic) => (
                        <motion.div key={topic.id} variants={itemVariants}>
                            {topic.active ? (
                                <Link href={topic.href} className="block h-full">
                                    <div className="group relative h-full rounded-2xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-surface p-8 transition-all hover:shadow-xl hover:shadow-primary-600/10 hover:-translate-y-1 hover:border-primary-300">
                                        <div className="absolute top-4 right-4 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                                            Available
                                        </div>
                                        <div className="mb-4 text-4xl">{topic.icon}</div>
                                        <h3 className="text-xl font-bold text-text-primary">
                                            {topic.name}
                                        </h3>
                                        <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                                            {topic.description}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {topic.algorithms.map((algo) => (
                                                <span
                                                    key={algo}
                                                    className="rounded-lg bg-primary-100 px-2.5 py-1 text-xs font-medium text-primary-700"
                                                >
                                                    {algo}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-6 text-sm font-semibold text-primary-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Start Learning
                                            <svg
                                                className="h-4 w-4"
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
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <div className="relative h-full rounded-2xl border border-border bg-surface p-8 opacity-60">
                                    <div className="absolute top-4 right-4 rounded-full bg-surface-alt px-3 py-1 text-xs font-medium text-text-muted">
                                        Coming Soon
                                    </div>
                                    <div className="mb-4 text-4xl grayscale">{topic.icon}</div>
                                    <h3 className="text-xl font-bold text-text-primary">
                                        {topic.name}
                                    </h3>
                                    <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                                        {topic.description}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {topic.algorithms.map((algo) => (
                                            <span
                                                key={algo}
                                                className="rounded-lg bg-surface-alt px-2.5 py-1 text-xs font-medium text-text-muted"
                                            >
                                                {algo}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
