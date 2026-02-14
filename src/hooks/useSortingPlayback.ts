"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Step, AlgorithmId } from "@/lib/types";
import { algorithms, getAlgorithm } from "@/lib/algorithms";
import { generateRandomArray } from "@/lib/utils";

export function useSortingPlayback() {
    const [algorithmId, setAlgorithmId] = useState<AlgorithmId>("bubble");
    const [initialArray, setInitialArray] = useState<number[]>(() =>
        generateRandomArray(15)
    );
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [showValues, setShowValues] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const currentStep = steps[currentStepIndex] || null;
    const isFinished = currentStepIndex >= steps.length - 1 && steps.length > 0;
    const algorithm = getAlgorithm(algorithmId)!;
    const allAlgorithms = algorithms;

    // Generate steps whenever algorithm or array changes
    const regenerateSteps = useCallback(
        (arr: number[], algoId: AlgorithmId) => {
            const algo = getAlgorithm(algoId);
            if (algo) {
                const newSteps = algo.generate(arr);
                setSteps(newSteps);
                setCurrentStepIndex(0);
                setIsPlaying(false);
            }
        },
        []
    );

    // Init
    useEffect(() => {
        regenerateSteps(initialArray, algorithmId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Auto-play interval
    useEffect(() => {
        if (isPlaying && !isFinished) {
            intervalRef.current = setInterval(() => {
                setCurrentStepIndex((prev) => {
                    if (prev >= steps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 800 / speed);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, isFinished, speed, steps.length]);

    const play = useCallback(() => {
        if (isFinished) {
            setCurrentStepIndex(0);
        }
        setIsPlaying(true);
    }, [isFinished]);

    const pause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const nextStep = useCallback(() => {
        setIsPlaying(false);
        setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, [steps.length]);

    const prevStep = useCallback(() => {
        setIsPlaying(false);
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const reset = useCallback(() => {
        setIsPlaying(false);
        setCurrentStepIndex(0);
    }, []);

    const shuffle = useCallback(() => {
        const newArr = generateRandomArray(initialArray.length);
        setInitialArray(newArr);
        regenerateSteps(newArr, algorithmId);
    }, [initialArray.length, algorithmId, regenerateSteps]);

    const changeAlgorithm = useCallback(
        (id: AlgorithmId) => {
            setAlgorithmId(id);
            regenerateSteps(initialArray, id);
        },
        [initialArray, regenerateSteps]
    );

    const setArrayFromInput = useCallback(
        (arr: number[]) => {
            setInitialArray(arr);
            regenerateSteps(arr, algorithmId);
        },
        [algorithmId, regenerateSteps]
    );

    const setArraySize = useCallback(
        (size: number) => {
            const newArr = generateRandomArray(size);
            setInitialArray(newArr);
            regenerateSteps(newArr, algorithmId);
        },
        [algorithmId, regenerateSteps]
    );

    return {
        // State
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

        // Actions
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
    };
}
