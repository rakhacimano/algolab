"use client";

import { useState } from "react";

import { useSortingPlayback } from "@/hooks/useSortingPlayback";
import SortingHeader from "@/components/sorting/SortingHeader";
import LeftSidebar from "@/components/sorting/LeftSidebar";
import CenterVisualizer from "@/components/sorting/CenterVisualizer";
import RightSidebar from "@/components/sorting/RightSidebar";

export default function SortingPage() {
    const {
        currentStep,
        currentStepIndex,
        steps,
        isPlaying,
        isFinished,
        speed,
        algorithmId,
        algorithm,
        allAlgorithms,
        initialArray,
        showValues,
        play,
        pause,
        nextStep,
        prevStep,
        reset,
        shuffle,
        setSpeed,
        changeAlgorithm,
        setArrayFromInput,
        setArraySize,
        setShowValues,
    } = useSortingPlayback();

    const [activeTab, setActiveTab] = useState<"controls" | "visualizer" | "info">("visualizer");

    return (
        <div className="h-screen flex flex-col bg-surface-alt overflow-hidden">
            <SortingHeader algorithm={algorithm} />

            <div className="flex-1 flex w-full max-w-[1920px] mx-auto overflow-hidden h-full pb-16 lg:pb-0 relative">
                <div
                    className={`${activeTab === "controls"
                        ? "opacity-100 z-10 pointer-events-auto"
                        : "opacity-0 z-0 pointer-events-none"
                        } absolute inset-0 lg:static lg:opacity-100 lg:pointer-events-auto lg:z-auto h-full w-full lg:w-auto transition-opacity duration-300 lg:transition-none`}
                >
                    <LeftSidebar
                        algorithms={allAlgorithms}
                        selectedAlgorithm={algorithmId}
                        onAlgorithmChange={(id) => {
                            changeAlgorithm(id);
                            setActiveTab("visualizer"); // Switch back to visualizer on mobile selection
                        }}
                        onArrayInput={setArrayFromInput}
                        onSizeChange={setArraySize}
                        currentSize={initialArray.length}
                    />
                </div>

                <div
                    className={`${activeTab === "visualizer"
                        ? "opacity-100 z-10 pointer-events-auto"
                        : "opacity-0 z-0 pointer-events-none"
                        } absolute inset-0 lg:static lg:opacity-100 lg:pointer-events-auto lg:z-auto lg:flex-1 h-full min-w-0 transition-opacity duration-300 lg:transition-none`}
                >
                    <CenterVisualizer
                        currentStep={currentStep}
                        currentStepIndex={currentStepIndex}
                        totalSteps={steps.length}
                        showValues={showValues}
                        isPlaying={isPlaying}
                        isFinished={isFinished}
                        speed={speed}
                        onPlay={play}
                        onPause={pause}
                        onNextStep={nextStep}
                        onPrevStep={prevStep}
                        onReset={reset}
                        onShuffle={shuffle}
                        onSpeedChange={setSpeed}
                        onShowValuesChange={setShowValues}
                    />
                </div>

                <div
                    className={`${activeTab === "info"
                        ? "opacity-100 z-10 pointer-events-auto"
                        : "opacity-0 z-0 pointer-events-none"
                        } absolute inset-0 lg:static lg:opacity-100 lg:pointer-events-auto lg:z-auto h-full w-full lg:w-auto transition-opacity duration-300 lg:transition-none`}
                >
                    <RightSidebar
                        algorithm={algorithm}
                        currentStep={currentStep}
                        currentStepIndex={currentStepIndex}
                        totalSteps={steps.length}
                    />
                </div>
            </div>

            {/* Mobile Bottom Tab Bar */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border lg:hidden z-50 flex items-center justify-around px-2 pb-safe">
                <button
                    onClick={() => setActiveTab("controls")}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === "controls" ? "text-primary-600" : "text-text-secondary"
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    <span className="text-[10px] font-medium">Controls</span>
                </button>

                <button
                    onClick={() => setActiveTab("visualizer")}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === "visualizer" ? "text-primary-600" : "text-text-secondary"
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[10px] font-medium">Visualizer</span>
                </button>

                <button
                    onClick={() => setActiveTab("info")}
                    className={`flex flex-col items-center justify-center w-full h-full gap-1 ${activeTab === "info" ? "text-primary-600" : "text-text-secondary"
                        }`}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-[10px] font-medium">Info</span>
                </button>
            </div>
        </div>
    );
}
