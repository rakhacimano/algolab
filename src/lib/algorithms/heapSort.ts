import { Step, Algorithm } from "../types";

export const heapSortCode = `function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest);
  }
}`;

export function generateHeapSortSteps(inputArr: number[]): Step[] {
    const arr = [...inputArr];
    const steps: Step[] = [];
    const n = arr.length;
    const sortedIndices: number[] = [];

    // Initial step
    steps.push({
        line: 1,
        action: "compare",
        array: [...arr],
        indices: [],
        sortedIndices: [],
        variables: { n },
        message: `Starting Heap Sort with ${n} elements.`,
    });

    function* heapify(n: number, i: number): Generator<void, void, unknown> {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        steps.push({
            line: 23,
            action: "compare",
            array: [...arr],
            indices: [i],
            sortedIndices: [...sortedIndices],
            variables: { i, largest, left, right },
            message: `Heapify at index ${i}. Checking children ${left} and ${right}.`,
        });

        // Check left
        if (left < n) {
            steps.push({
                line: 28,
                action: "compare",
                array: [...arr],
                indices: [left, largest],
                sortedIndices: [...sortedIndices],
                variables: { i, largest, left, leftVal: arr[left], largestVal: arr[largest] },
                message: `Comparing Left Child ${arr[left]} (idx ${left}) with Current Largest ${arr[largest]} (idx ${largest}).`,
            });
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }

        // Check right
        if (right < n) {
            steps.push({
                line: 33,
                action: "compare",
                array: [...arr],
                indices: [right, largest],
                sortedIndices: [...sortedIndices],
                variables: { i, largest, right, rightVal: arr[right], largestVal: arr[largest] },
                message: `Comparing Right Child ${arr[right]} (idx ${right}) with Current Largest ${arr[largest]} (idx ${largest}).`,
            });
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            steps.push({
                line: 38,
                action: "swap",
                array: [...arr],
                indices: [i, largest],
                sortedIndices: [...sortedIndices],
                variables: { i, largest },
                message: `Swapping ${arr[i]} (idx ${i}) with ${arr[largest]} (idx ${largest}).`,
            });

            // Swap
            const temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            yield* heapify(n, largest);
        }
    }

    // Generator for main loop
    function* heapSort(): Generator<void, void, unknown> {
        // Build max heap
        steps.push({
            line: 5,
            action: "default",
            array: [...arr],
            indices: [],
            sortedIndices: [...sortedIndices],
            variables: {},
            message: `Building Max Heap.`,
        });

        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            yield* heapify(n, i);
        }

        steps.push({
            line: 9,
            action: "default",
            array: [...arr],
            indices: [],
            sortedIndices: [...sortedIndices],
            variables: {},
            message: `Max Heap built. Starting extraction.`,
        });

        // Extract elements
        for (let i = n - 1; i > 0; i--) {
            // Swap root with end
            steps.push({
                line: 12,
                action: "swap",
                array: [...arr],
                indices: [0, i],
                sortedIndices: [...sortedIndices],
                variables: { i },
                message: `Moving max element ${arr[0]} to end (idx ${i}).`,
            });

            const temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            sortedIndices.push(i);

            steps.push({
                line: 16,
                action: "default",
                array: [...arr],
                indices: [],
                sortedIndices: [...sortedIndices],
                variables: { i },
                message: `Heapify reduced heap (size ${i}).`,
            });

            yield* heapify(i, 0);
        }

        sortedIndices.push(0);
    }

    // Drive generator
    const generator = heapSort();
    let result = generator.next();
    while (!result.done) {
        result = generator.next();
    }

    steps.push({
        line: 48,
        action: "done",
        array: [...arr],
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        variables: {},
        message: "Heap Sort complete!",
    });

    return steps;
}

export const heapSortConfig: Algorithm = {
    id: "heap",
    name: "Heap Sort",
    description:
        "A binary heap-based algorithm that converts the array into a Max Heap and then extracts the largest element one by one.",
    instruction: {
        title: "Steps (How it works)",
        steps: [
            { text: "Convert the array into a max heap (largest at root)." },
            { text: "Swap root (largest) with last element." },
            { text: "Reduce heap size by 1." },
            { text: "Heapify again to restore heap property." },
            { text: "Repeat until sorted." },
        ],
    },
    code: heapSortCode,
    complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(1)",
    },
    generate: generateHeapSortSteps,
};
