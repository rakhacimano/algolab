"use client";

import { useState } from "react";
import { Algorithm, AlgorithmId } from "@/lib/types";

interface InputControlsProps {
    algorithms: Algorithm[];
    selectedAlgorithm: AlgorithmId;
    onAlgorithmChange: (id: AlgorithmId) => void;
    onArrayInput: (arr: number[]) => void;
    onSizeChange: (size: number) => void;
    currentSize: number;
}

export default function InputControls({
    algorithms,
    selectedAlgorithm,
    onAlgorithmChange,
    onArrayInput,
    onSizeChange,
    currentSize,
}: InputControlsProps) {
    const [manualInput, setManualInput] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleManualSubmit = () => {
        setError(null);
        const trimmed = manualInput.trim();
        if (!trimmed) {
            setError("Please enter some numbers.");
            return;
        }

        const parts = trimmed.split(",").map((s) => s.trim());
        const nums: number[] = [];

        for (const part of parts) {
            const n = Number(part);
            if (isNaN(n) || !Number.isFinite(n)) {
                setError(`"${part}" is not a valid number.`);
                return;
            }
            if (n < 1 || n > 99) {
                setError("Values must be between 1 and 99.");
                return;
            }
            nums.push(Math.floor(n));
        }

        if (nums.length < 2) {
            setError("Please enter at least 2 numbers.");
            return;
        }

        if (nums.length > 50) {
            setError("Maximum 50 numbers allowed.");
            return;
        }

        onArrayInput(nums);
        setManualInput("");
    };

    return (
        <div className="flex flex-col gap-5">
            {/* Algorithm selector */}
            <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                    Algorithm
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                    {algorithms.map((algo) => (
                        <button
                            key={algo.id}
                            onClick={() => onAlgorithmChange(algo.id)}
                            className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${selectedAlgorithm === algo.id
                                ? "border-primary-300 bg-primary-50 shadow-sm"
                                : "border-border bg-surface hover:bg-surface-alt"
                                }`}
                        >
                            <span
                                className={`text-sm font-semibold ${selectedAlgorithm === algo.id
                                    ? "text-primary-700"
                                    : "text-text-primary"
                                    }`}
                            >
                                {algo.name}
                            </span>
                            <span className="mt-0.5 text-xs text-text-muted">
                                Best: {algo.complexity.best} · Worst: {algo.complexity.worst}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Size slider */}
            <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                    Array Size: {currentSize}
                </label>
                <input
                    type="range"
                    min={5}
                    max={50}
                    value={currentSize}
                    onChange={(e) => onSizeChange(Number(e.target.value))}
                    className="w-full h-2 bg-surface-alt rounded-full appearance-none cursor-pointer accent-primary-600"
                />
                <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-text-muted">5</span>
                    <span className="text-[10px] text-text-muted">50</span>
                </div>
            </div>

            {/* Manual input */}
            <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
                    Manual Input
                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={manualInput}
                        onChange={(e) => {
                            setManualInput(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleManualSubmit();
                        }}
                        placeholder="e.g. 5, 3, 8, 1, 9"
                        className="flex-1 rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all"
                    />
                    <button
                        onClick={handleManualSubmit}
                        className="rounded-xl bg-primary-600 px-4 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                    >
                        Set
                    </button>
                </div>
                {error && (
                    <p className="mt-2 text-xs text-swap font-medium">{error}</p>
                )}
            </div>
        </div>
    );
}
