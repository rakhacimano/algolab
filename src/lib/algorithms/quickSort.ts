import { Step, Algorithm } from "../types";

export const quickSortCode = `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);

    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Swap arr[i+1] and arr[high] (or pivot)
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  
  return i + 1;
}`;

export function generateQuickSortSteps(inputArr: number[]): Step[] {
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
        message: `Starting Quick Sort with ${n} elements.`,
    });

    function* partition(low: number, high: number): Generator<void, number, unknown> {
        const pivot = arr[high];
        let i = low - 1;

        steps.push({
            line: 11,
            action: "compare",
            array: [...arr],
            indices: [high],
            sortedIndices: [...sortedIndices],
            variables: { pivot, low, high },
            message: `Partitioning [${low}...${high}]. Pivot is ${pivot} at index ${high}.`,
        });

        for (let j = low; j < high; j++) {
            steps.push({
                line: 14,
                action: "compare",
                array: [...arr],
                indices: [j, high],
                sortedIndices: [...sortedIndices],
                variables: { j, pivot, val: arr[j] },
                message: `Comparing A[${j}]=${arr[j]} with Pivot=${pivot}.`,
            });

            if (arr[j] < pivot) {
                i++;
                // Swap
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                steps.push({
                    line: 17,
                    action: "swap",
                    array: [...arr],
                    indices: [i, j],
                    sortedIndices: [...sortedIndices],
                    variables: { i, j },
                    message: `Swap A[${i}] and A[${j}] (smaller than pivot).`,
                });
            }
        }

        // Swap pivot to correct position
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        steps.push({
            line: 23,
            action: "swap",
            array: [...arr],
            indices: [i + 1, high],
            sortedIndices: [...sortedIndices],
            variables: { i, high },
            message: `Move Pivot to correct position ${i + 1}.`,
        });

        return i + 1;
    }

    function* quickSort(low: number, high: number): Generator<void, void, unknown> {
        if (low < high) {
            const pi = yield* partition(low, high);

            sortedIndices.push(pi);

            steps.push({
                line: 4,
                action: "compare",
                array: [...arr],
                indices: [pi],
                sortedIndices: [...sortedIndices],
                variables: { pi },
                message: `Pivot ${arr[pi]} is now at fixed position ${pi}. Recursing Left.`,
            });

            yield* quickSort(low, pi - 1);

            steps.push({
                line: 5,
                action: "compare",
                array: [...arr],
                indices: [],
                sortedIndices: [...sortedIndices],
                variables: { pi },
                message: `Recursing Right of ${pi}.`,
            });

            yield* quickSort(pi + 1, high);
        } else if (low === high) {
            // Single element is sorted
            sortedIndices.push(low);
            steps.push({
                line: 2,
                action: "done",
                array: [...arr],
                indices: [low],
                sortedIndices: [...sortedIndices],
                variables: { low },
                message: `Element ${low} is a single element, so it is sorted.`,
            });
        }
    }

    // Drive the generator
    const generator = quickSort(0, n - 1);
    let result = generator.next();
    while (!result.done) {
        result = generator.next();
    }

    // Done step
    steps.push({
        line: 25,
        action: "done",
        array: [...arr],
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        variables: {},
        message: "Quick Sort complete! Array is now sorted.",
    });

    return steps;
}

export const quickSortConfig: Algorithm = {
    id: "quick",
    name: "Quick Sort",
    description:
        "A Divide and Conquer algorithm that picks a 'pivot' and partitions the array such that smaller elements are on the left and larger ones on the right.",
    instruction: {
        title: "Steps (How it works)",
        steps: [
            { text: "Pick a pivot element (usually last element)." },
            { text: "Partition the array: put smaller elements to the left of pivot, larger to the right." },
            { text: "Recursively sort the left and right subarrays." },
            { text: "Combine the sorted parts (in-place)." },
        ],
    },
    code: quickSortCode,
    complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
        space: "O(log n)",
    },
    generate: generateQuickSortSteps,
};
