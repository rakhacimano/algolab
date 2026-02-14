"use client";

import { motion } from "framer-motion";
import { Step } from "@/lib/types";

interface ArrayVisualizerProps {
    step: Step | null;
    showValues: boolean;
}

function getBarColor(index: number, step: Step): string {
    if (step.action === "done" || step.sortedIndices.includes(index)) {
        return "from-sorted to-green-400";
    }
    if (step.indices.includes(index)) {
        if (step.action === "swap") return "from-swap to-red-400";
        if (step.action === "overwrite") return "from-amber-500 to-amber-400";
        return "from-compare to-yellow-300";
    }
    return "from-bar-default to-primary-400";
}

function getBarShadow(index: number, step: Step): string {
    if (step.action === "done" || step.sortedIndices.includes(index)) {
        return "shadow-sorted/30";
    }
    if (step.indices.includes(index)) {
        if (step.action === "swap") return "shadow-swap/30";
        return "shadow-compare/30";
    }
    return "";
}

export default function ArrayVisualizer({
    step,
    showValues,
}: ArrayVisualizerProps) {
    if (!step) return null;

    const arr = step.array;

    return (
        <div className="flex flex-col h-full">
            {/* Legend */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-sm bg-bar-default" />
                    <span className="text-xs text-text-muted">Default</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-sm bg-compare" />
                    <span className="text-xs text-text-muted">Comparing</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-sm bg-swap" />
                    <span className="text-xs text-text-muted">Swapping</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-sm bg-sorted" />
                    <span className="text-xs text-text-muted">Sorted</span>
                </div>
            </div>

            {/* Bars */}
            <div className="flex items-end justify-center gap-[3px] flex-1 min-h-[200px] px-2">
                {step.array.map((value, index) => {
                    const heightPercent = (value / 99) * 100;
                    const barColor = getBarColor(index, step);
                    const barShadow = getBarShadow(index, step);

                    return (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center flex-1 min-w-[14px] max-w-[50px]"
                            style={{ height: "100%" }}
                        >
                            <div className="flex flex-col items-center justify-end flex-1 w-full">
                                {showValues && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[10px] font-semibold text-text-secondary mb-1 tabular-nums"
                                    >
                                        {value}
                                    </motion.span>
                                )}
                                <motion.div
                                    className={`w-full rounded-t-md bg-gradient-to-t ${barColor} ${barShadow}`}
                                    initial={false}
                                    animate={{ height: `${heightPercent}%` }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 350,
                                        damping: 25,
                                    }}
                                    style={{ minHeight: 2 }}
                                />
                            </div>
                            {/* Index label */}
                            <span className="mt-1 text-[9px] text-text-muted tabular-nums">
                                {index}
                            </span>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
