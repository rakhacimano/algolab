"use client";

import { motion } from "framer-motion";
import { features, containerVariants, itemVariants } from "./constants";

export default function FeaturesSection() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">
                        Why Learn Visually?
                    </h2>
                    <p className="mt-3 text-text-secondary text-lg">
                        Three pillars that make algorithm learning click.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-6 sm:grid-cols-3"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:shadow-lg hover:border-primary-200 hover:-translate-y-1"
                        >
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-2xl transition-colors group-hover:bg-primary-100">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text-primary">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-text-secondary leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
