"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Step } from "@/lib/types";

interface ExplanationPanelProps {
    step: Step | null;
    currentStepIndex: number;
    totalSteps: number;
}

export default function ExplanationPanel({
    step,
    currentStepIndex,
    totalSteps,
}: ExplanationPanelProps) {
    if (!step) return null;

    const actionLabel: Record<string, { text: string; color: string }> = {
        compare: { text: "Compare", color: "bg-compare text-yellow-900" },
        swap: { text: "Swap", color: "bg-swap text-white" },
        overwrite: { text: "Overwrite", color: "bg-amber-400 text-amber-900" },
        sorted: { text: "Sorted", color: "bg-sorted text-white" },
        done: { text: "Done", color: "bg-sorted text-white" },
    };

    const action = actionLabel[step.action] || {
        text: step.action,
        color: "bg-primary-100 text-primary-800",
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Step counter */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-text-muted">
                    Step {currentStepIndex + 1} of {totalSteps}
                </span>
                <span
                    className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold ${action.color}`}
                >
                    {action.text}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary-500 rounded-full"
                    initial={false}
                    animate={{
                        width: `${totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0}%`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            </div>

            {/* Message */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl bg-surface-alt border border-border p-4"
                >
                    <p className="text-sm text-text-primary leading-relaxed font-medium">
                        {step.message}
                    </p>
                </motion.div>
            </AnimatePresence>

            {/* Variables */}
            {Object.keys(step.variables).length > 0 && (
                <div className="rounded-xl bg-surface-alt border border-border p-4">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                        Variables
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(step.variables).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 border border-border"
                            >
                                <span className="text-xs font-mono font-semibold text-primary-600">
                                    {key}
                                </span>
                                <span className="text-xs text-text-muted">=</span>
                                <span className="text-xs font-mono font-bold text-text-primary">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
