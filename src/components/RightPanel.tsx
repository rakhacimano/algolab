"use client";

import { useState } from "react";
import { Algorithm, Step } from "@/lib/types";
import CodeViewer from "./CodeViewer";
import AlgorithmInfo from "./AlgorithmInfo";
import ExplanationPanel from "./ExplanationPanel";

interface RightPanelProps {
    algorithm: Algorithm;
    currentStep: Step | null;
    currentStepIndex: number;
    totalSteps: number;
}

export default function RightPanel({
    algorithm,
    currentStep,
    currentStepIndex,
    totalSteps,
}: RightPanelProps) {
    const [activeTab, setActiveTab] = useState<"code" | "info">("code");

    return (
        <div className="flex flex-col bg-surface border-l border-border">
            {/* Tabs */}
            <div className="flex border-b border-border bg-surface-alt/50">
                <button
                    onClick={() => setActiveTab("code")}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === "code"
                        ? "text-primary-600 bg-surface"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                        }`}
                >
                    Code
                    {activeTab === "code" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab("info")}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors relative ${activeTab === "info"
                        ? "text-primary-600 bg-surface"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface/50"
                        }`}
                >
                    Algorithm Info
                    {activeTab === "info" && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                    )}
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative p-4">
                {activeTab === "code" ? (
                    <div className="h-full">
                        <CodeViewer
                            code={algorithm.code}
                            activeLine={currentStep?.line ?? 0}
                        />
                    </div>
                ) : (
                    <AlgorithmInfo algorithm={algorithm} />
                )}
            </div>

            {/* Fixed Explanation Panel (Always visible at bottom) */}
            <div className="border-t border-border p-4 bg-surface-alt/30">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                    Current Step
                </h3>
                <ExplanationPanel
                    step={currentStep}
                    currentStepIndex={currentStepIndex}
                    totalSteps={totalSteps}
                />
            </div>
        </div>
    );
}
