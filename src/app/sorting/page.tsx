"use client";

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

    return (
        <div className="h-screen flex flex-col bg-surface-alt overflow-hidden">
            <SortingHeader algorithm={algorithm} />

            <div className="flex-1 flex w-full max-w-[1920px] mx-auto overflow-hidden h-full">
                <LeftSidebar
                    algorithms={allAlgorithms}
                    selectedAlgorithm={algorithmId}
                    onAlgorithmChange={changeAlgorithm}
                    onArrayInput={setArrayFromInput}
                    onSizeChange={setArraySize}
                    currentSize={initialArray.length}
                />

                <CenterVisualizer
                    currentStep={currentStep}
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

                <RightSidebar
                    algorithm={algorithm}
                    currentStep={currentStep}
                    currentStepIndex={currentStepIndex}
                    totalSteps={steps.length}
                />
            </div>
        </div>
    );
}
