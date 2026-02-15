import { Step, Algorithm } from "../types";

export const insertionSortCode = `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`;

export function generateInsertionSortSteps(inputArr: number[]): Step[] {
    const arr = [...inputArr];
    const steps: Step[] = [];
    const n = arr.length;
    const sorted: number[] = [0];

    steps.push({
        line: 1,
        action: "compare",
        array: [...arr],
        indices: [],
        sortedIndices: [0],
        variables: { n },
        message: `Starting Insertion Sort with array of ${n} elements. A[0] = ${arr[0]} is already sorted.`,
    });

    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;

        steps.push({
            line: 4,
            action: "compare",
            array: [...arr],
            indices: [i],
            sortedIndices: [...sorted],
            variables: { i, key, j },
            message: `Pick key = A[${i}] = ${key}. Insert it into the sorted portion.`,
        });

        while (j >= 0 && arr[j] > key) {
            steps.push({
                line: 6,
                action: "compare",
                array: [...arr],
                indices: [j, j + 1],
                sortedIndices: [...sorted],
                variables: { i, key, j },
                message: `A[${j}] = ${arr[j]} > key = ${key}. Shift A[${j}] right.`,
            });

            arr[j + 1] = arr[j];
            j = j - 1;

            steps.push({
                line: 7,
                action: "overwrite",
                array: [...arr],
                indices: [j + 2, j + 1],
                sortedIndices: [...sorted],
                variables: { i, key, j },
                message: `Shifted: array is now [${arr.join(", ")}].`,
            });
        }

        if (j >= 0) {
            steps.push({
                line: 6,
                action: "compare",
                array: [...arr],
                indices: [j, j + 1],
                sortedIndices: [...sorted],
                variables: { i, key, j },
                message: `A[${j}] = ${arr[j]} ≤ key = ${key}. Stop shifting.`,
            });
        }

        arr[j + 1] = key;

        steps.push({
            line: 9,
            action: "overwrite",
            array: [...arr],
            indices: [j + 1],
            sortedIndices: [...sorted],
            variables: { i, key, j },
            message: `Place key = ${key} at position ${j + 1}.`,
        });

        sorted.push(i);
    }

    steps.push({
        line: 12,
        action: "done",
        array: [...arr],
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        variables: {},
        message: "Insertion Sort complete! Array is now sorted.",
    });

    return steps;
}

export const insertionSortConfig: Algorithm = {
    id: "insertion",
    name: "Insertion Sort",
    description:
        "Builds a sorted array one item at a time by inserting elements into their correct position.",
    instruction: {
        title: "Insertion Sort Steps",
        steps: [
            {
                text:
                    "Assume the first element (index 0) is already in the correct sorted position.",
            },
            {
                text:
                    "Start the process from the second element (index 1) to the last element.",
            },
            {
                text: "In each iteration (for element i):",
                substeps: [
                    "Take that element and store it as 'key' (the value to be inserted).",
                    "Compare 'key' with the sorted elements to its left.",
                ],
            },
            {
                text: "Perform the shifting process:",
                substeps: [
                    "While the element on the left is greater than 'key', shift that element one step to the right.",
                    "Continue checking the element to its left.",
                ],
            },
            {
                text:
                    "If a smaller or equal element is found, or if the left end of the array is reached:",
                substeps: [
                    "Stop the shifting process.",
                    "Insert 'key' into the correct available position.",
                ],
            },
            {
                text:
                    "Repeat this process until the last element is successfully inserted.",
            },
        ],
    },
    code: insertionSortCode,
    complexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
    },
    generate: generateInsertionSortSteps,
};
