"use client";

import { Algorithm } from "@/lib/types";

interface AlgorithmInfoProps {
    algorithm: Algorithm;
}

export default function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
    return (
        <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto">
            <div>
                <h2 className="text-xl font-bold text-text-primary mb-2">
                    {algorithm.name}
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                    {algorithm.description}
                </p>
            </div>

            {/* Complexity Chips */}
            <div className="flex flex-wrap gap-2">
                <div className="px-2.5 py-1 rounded-lg bg-surface-alt border border-border text-xs font-medium text-text-secondary">
                    Best: <span className="font-mono text-green-600 font-bold">{algorithm.complexity.best}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-surface-alt border border-border text-xs font-medium text-text-secondary">
                    Avg: <span className="font-mono text-yellow-600 font-bold">{algorithm.complexity.average}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-surface-alt border border-border text-xs font-medium text-text-secondary">
                    Worst: <span className="font-mono text-red-600 font-bold">{algorithm.complexity.worst}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-surface-alt border border-border text-xs font-medium text-text-secondary">
                    Space: <span className="font-mono text-primary-600 font-bold">{algorithm.complexity.space}</span>
                </div>
            </div>

            {/* Instructions */}
            <div className="border-t border-border pt-6">
                <h3 className="text-sm font-bold text-text-primary mb-4">
                    {algorithm.instruction?.title || "How it works"}
                </h3>

                {algorithm.instruction ? (
                    <ol className="list-decimal list-outside ml-4 space-y-4 text-sm text-text-secondary">
                        {algorithm.instruction.steps.map((step, index) => (
                            <li key={index} className="pl-1 leading-relaxed">
                                <span className="font-medium text-text-primary">{step.text}</span>
                                {step.substeps && step.substeps.length > 0 && (
                                    <ul className="list-disc list-outside ml-5 mt-2 space-y-1.5 marker:text-primary-400">
                                        {step.substeps.map((sub, subIndex) => (
                                            <li key={subIndex} className="text-text-secondary leading-relaxed">
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="text-sm text-text-muted italic">
                        Instruction steps not available.
                    </p>
                )}
            </div>
        </div>
    );
}
