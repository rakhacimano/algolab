"use client";

import ArrayVisualizer from "@/components/ArrayVisualizer";
import ControlBar from "@/components/ControlBar";
import { Step } from "@/lib/types";

interface CenterVisualizerProps {
    currentStep: Step | null;
    showValues: boolean;
    isPlaying: boolean;
    isFinished: boolean;
    speed: number;
    onPlay: () => void;
    onPause: () => void;
    onNextStep: () => void;
    onPrevStep: () => void;
    onReset: () => void;
    onShuffle: () => void;
    onSpeedChange: (speed: number) => void;
    onShowValuesChange: (show: boolean) => void;
}

export default function CenterVisualizer({
    currentStep,
    showValues,
    isPlaying,
    isFinished,
    speed,
    onPlay,
    onPause,
    onNextStep,
    onPrevStep,
    onReset,
    onShuffle,
    onSpeedChange,
    onShowValuesChange,
}: CenterVisualizerProps) {
    return (
        <main className="flex-1 flex flex-col min-w-0 bg-surface-alt h-full relative">
            {/* Visualizer Area */}
            <div className="flex-1 p-4 flex flex-col overflow-hidden">
                <div className="flex-1 w-full bg-surface rounded-2xl border border-border shadow-sm p-4 relative flex flex-col">
                    <ArrayVisualizer step={currentStep} showValues={showValues} />
                </div>
            </div>

            {/* Bottom Control Bar */}
            <div className="flex-none bg-surface border-t border-border px-4 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-10">
                <ControlBar
                    isPlaying={isPlaying}
                    isFinished={isFinished}
                    speed={speed}
                    showValues={showValues}
                    onPlay={onPlay}
                    onPause={onPause}
                    onNextStep={onNextStep}
                    onPrevStep={onPrevStep}
                    onReset={onReset}
                    onShuffle={onShuffle}
                    onSpeedChange={onSpeedChange}
                    onShowValuesChange={onShowValuesChange}
                />
            </div>
        </main>
    );
}
