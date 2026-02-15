import { Step, Algorithm } from "../types";

export const selectionSortCode = `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}`;

export function generateSelectionSortSteps(inputArr: number[]): Step[] {
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
        message: `Starting Selection Sort with array of ${n} elements.`,
    });

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        steps.push({
            line: 4,
            action: "compare",
            array: [...arr],
            indices: [i],
            sortedIndices: [...sorted],
            variables: { i, minIndex },
            message: `Pass ${i + 1}: Assume A[${i}] = ${arr[i]} is the minimum.`,
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                line: 5,
                action: "compare",
                array: [...arr],
                indices: [j, minIndex],
                sortedIndices: [...sorted],
                variables: { i, j, minIndex },
                message: `Comparing A[${j}] = ${arr[j]} with current min A[${minIndex}] = ${arr[minIndex]}.`,
            });

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
                steps.push({
                    line: 7,
                    action: "compare",
                    array: [...arr],
                    indices: [j, minIndex],
                    sortedIndices: [...sorted],
                    variables: { i, j, minIndex },
                    message: `New minimum found: A[${j}] = ${arr[j]}.`,
                });
            }
        }

        if (minIndex !== i) {
            const temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            steps.push({
                line: 12,
                action: "swap",
                array: [...arr],
                indices: [i, minIndex],
                sortedIndices: [...sorted],
                variables: { i, minIndex },
                message: `Swap A[${i}] and A[${minIndex}]: placing ${arr[i]} in position ${i}.`,
            });
        }

        sorted.push(i);
    }

    sorted.push(n - 1);

    steps.push({
        line: 17,
        action: "done",
        array: [...arr],
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        variables: {},
        message: "Selection Sort complete! Array is now sorted.",
    });

    return steps;
}

export const selectionSortConfig: Algorithm = {
    id: "selection",
    name: "Selection Sort",
    description:
        "Finds the minimum value from the unsorted part and swaps it to the beginning.",
    instruction: {
        title: "Selection Sort Steps",
        steps: [
            {
                text:
                    "Divide the array into two parts: the sorted part (on the left) and the unsorted part (on the right). Initially, the sorted part is empty.",
            },
            {
                text: "Start finding the minimum value from the entire unsorted part.",
            },
            {
                text: "In each pass (from index i = 0 to n-2):",
                substeps: [
                    "Assume the element at position i is the current minimum.",
                    "Compare it with all other elements to its right (from j = i+1 to n-1).",
                    "If a smaller element is found, record its position as the new minimum.",
                    "Continue comparing until the end of the array.",
                ],
            },
            {
                text: "After checking all elements to the right:",
                substeps: [
                    "If the minimum position is different from the starting position i, swap the two elements.",
                    "Now the smallest element is in the correct position (at the left end of the unsorted part).",
                ],
            },
            { text: "Move the boundary of the sorted part one step to the right." },
            { text: "Repeat this process until the entire array is sorted." },
        ],
    },
    code: selectionSortCode,
    complexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        space: "O(1)",
    },
    generate: generateSelectionSortSteps,
};
