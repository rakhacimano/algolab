export type StepAction = "compare" | "swap" | "overwrite" | "sorted" | "done" | "default";

export type Step = {
    line: number;
    action: StepAction;
    array: number[];
    indices: number[];
    sortedIndices: number[];
    variables: Record<string, number>;
    message: string;
};

export type AlgorithmId = "bubble" | "selection" | "insertion" | "merge" | "quick" | "heap";

export type AlgorithmStep = {
    text: string;
    substeps?: string[];
};

export type AlgorithmInstruction = {
    title: string;
    steps: AlgorithmStep[];
};

export type Algorithm = {
    id: AlgorithmId;
    name: string;
    description: string;
    instruction: AlgorithmInstruction;
    code: string;
    complexity: {
        best: string;
        average: string;
        worst: string;
        space: string;
    };
    generate: (arr: number[]) => Step[];
};
