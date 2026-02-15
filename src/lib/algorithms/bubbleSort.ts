import { Step, Algorithm } from "../types";

export const bubbleSortCode = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;

export function generateBubbleSortSteps(inputArr: number[]): Step[] {
    const arr = [...inputArr];
    const steps: Step[] = [];
    const n = arr.length;
    const sorted: number[] = [];

    steps.push({
        line: 1,
        action: "compare",
        array: [...arr],
        indices: [],
        sortedIndices: [],
        variables: { n },
        message: `Starting Bubble Sort with array of ${n} elements.`,
    });

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare step
            steps.push({
                line: 5,
                action: "compare",
                array: [...arr],
                indices: [j, j + 1],
                sortedIndices: [...sorted],
                variables: { i, j, n },
                message: `Comparing A[${j}] = ${arr[j]} with A[${j + 1}] = ${arr[j + 1]}.`,
            });

            if (arr[j] > arr[j + 1]) {
                // Swap
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                steps.push({
                    line: 8,
                    action: "swap",
                    array: [...arr],
                    indices: [j, j + 1],
                    sortedIndices: [...sorted],
                    variables: { i, j, n },
                    message: `Swap A[${j}] and A[${j + 1}] because ${arr[j + 1]} > ${arr[j]}.`,
                });
            } else {
                steps.push({
                    line: 5,
                    action: "compare",
                    array: [...arr],
                    indices: [j, j + 1],
                    sortedIndices: [...sorted],
                    variables: { i, j, n },
                    message: `No swap needed: ${arr[j]} ≤ ${arr[j + 1]}.`,
                });
            }
        }
        sorted.push(n - 1 - i);
    }

    sorted.push(0);

    steps.push({
        line: 14,
        action: "done",
        array: [...arr],
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        variables: {},
        message: "Bubble Sort complete! Array is now sorted.",
    });

    return steps;
}

export const bubbleSortConfig: Algorithm = {
    id: "bubble",
    name: "Bubble Sort",
    description:
        "A simple sorting algorithm that repeatedly swaps adjacent elements if they are in the wrong order.",
    instruction: {
        title: "Bubble Sort Steps",
        steps: [
            { text: "Start with the first element of the array." },
            {
                text:
                    "Repeat the process for several passes, from pass 1 to pass (n-1).",
            },
            {
                text: "In each pass:",
                substeps: [
                    "Compare element A[j] with the next element A[j+1].",
                    "If A[j] is greater than A[j+1], swap their positions.",
                    "Otherwise, leave them as is.",
                    "Repeat this comparison continuously from the start of the array until near the end.",
                ],
            },
            {
                text: "After one pass is complete:",
                substeps: [
                    "The largest element in the array will 'float' to the rightmost position.",
                    "Since the rightmost element is already in the correct position, we don't need to check that part again in the next pass.",
                ],
            },
            {
                text:
                    "This process continues until all passes are complete or until no swaps occur at all.",
            },
            {
                text:
                    "If no swaps occur in a pass, the array is already sorted and the algorithm can stop early.",
            },
        ],
    },
    code: bubbleSortCode,
    complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
    },
    generate: generateBubbleSortSteps,
};
