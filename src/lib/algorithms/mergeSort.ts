import { Step, Algorithm } from "../types";

export const mergeSortCode = `function mergeSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);

  // Recursively sort left and right halves
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);

  // Merge the sorted halves
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}`;

export function generateMergeSortSteps(inputArr: number[]): Step[] {
    const arr = [...inputArr];
    const steps: Step[] = [];
    const n = arr.length;

    // Initial step
    steps.push({
        line: 1,
        action: "compare",
        array: [...arr],
        indices: [],
        sortedIndices: [],
        variables: { n },
        message: `Starting Merge Sort with ${n} elements.`,
    });

    function* merge(left: number, mid: number, right: number): Generator<void, void, unknown> {
        // Create temp arrays
        const n1 = mid - left + 1;
        const n2 = right - mid;

        // Visualizing the range we are merging
        steps.push({
            line: 11,
            action: "compare",
            array: [...arr],
            indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
            sortedIndices: [],
            variables: { left, mid, right },
            message: `Merging subarray [${left}...${mid}] and [${mid + 1}...${right}].`,
        });

        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[left + i];
        for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

        let i = 0;
        let j = 0;
        let k = left;

        while (i < n1 && j < n2) {
            // Visualize comparison
            steps.push({
                line: 20,
                action: "compare",
                array: [...arr],
                indices: [left + i, mid + 1 + j],
                sortedIndices: [],
                variables: { i, j, k, leftVal: L[i], rightVal: R[j] },
                message: `Comparing ${L[i]} (Left) and ${R[j]} (Right) for position ${k}.`,
            });

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                steps.push({
                    line: 21,
                    action: "overwrite",
                    array: [...arr],
                    indices: [k],
                    sortedIndices: [],
                    variables: { k, val: L[i] },
                    message: `Taking ${L[i]} from Left subarray into position ${k}.`,
                });
                i++;
            } else {
                arr[k] = R[j];
                steps.push({
                    line: 24,
                    action: "overwrite",
                    array: [...arr],
                    indices: [k],
                    sortedIndices: [],
                    variables: { k, val: R[j] },
                    message: `Taking ${R[j]} from Right subarray into position ${k}.`,
                });
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            steps.push({
                line: 30,
                action: "overwrite",
                array: [...arr],
                indices: [k],
                sortedIndices: [],
                variables: { k, val: L[i] },
                message: `Copying remaining ${L[i]} from Left into position ${k}.`,
            });
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            steps.push({
                line: 36,
                action: "overwrite",
                array: [...arr],
                indices: [k],
                sortedIndices: [],
                variables: { k, val: R[j] },
                message: `Copying remaining ${R[j]} from Right into position ${k}.`,
            });
            j++;
            k++;
        }
    }

    function* mergeSort(left: number, right: number): Generator<void, void, unknown> {
        if (left >= right) return;

        const mid = Math.floor((left + right) / 2);

        steps.push({
            line: 7,
            action: "compare",
            array: [...arr],
            indices: [],
            sortedIndices: [],
            variables: { left, mid, right },
            message: `Splitting [${left}...${right}] at index ${mid}. Recursing Left.`,
        });

        yield* mergeSort(left, mid);

        steps.push({
            line: 8,
            action: "compare",
            array: [...arr],
            indices: [],
            sortedIndices: [],
            variables: { left, mid, right },
            message: `Returned from Left. Now recursing Right [${mid + 1}...${right}].`,
        });

        yield* mergeSort(mid + 1, right);

        steps.push({
            line: 11,
            action: "compare",
            array: [...arr],
            indices: [],
            sortedIndices: [],
            variables: { left, mid, right },
            message: `Returned from Right. Merging sorted halves.`,
        });

        yield* merge(left, mid, right);
    }

    // Drive the generator to populate steps
    const generator = mergeSort(0, n - 1);
    let result = generator.next();
    while (!result.done) {
        result = generator.next();
    }

    // Done step
    steps.push({
        line: 41,
        action: "done",
        array: [...arr],
        indices: [],
        sortedIndices: Array.from({ length: n }, (_, i) => i),
        variables: {},
        message: "Merge Sort complete!",
    });

    return steps;
}

export const mergeSortConfig: Algorithm = {
    id: "merge",
    name: "Merge Sort",
    description:
        "Algoritma Divide and Conquer yang membagi array menjadi dua bagian, mengurutkannya secara rekursif, lalu menggabungkannya.",
    instruction: {
        title: "Steps (How it works)",
        steps: [
            { text: "Split the array into two halves." },
            { text: "Keep splitting until each subarray has 1 element." },
            { text: "Merge two sorted halves by comparing elements." },
            { text: "Continue merging until the full array becomes sorted." },
        ],
    },
    code: mergeSortCode,
    complexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        space: "O(n)",
    },
    generate: generateMergeSortSteps,
};
