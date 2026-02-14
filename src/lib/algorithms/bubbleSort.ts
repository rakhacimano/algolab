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
        "Algoritma pengurutan sederhana yang berulang kali menukar elemen yang berdekatan jika urutannya salah.",
    instruction: {
        title: "Langkah-langkah Bubble Sort",
        steps: [
            { text: "Mulai dari elemen pertama array." },
            {
                text:
                    "Lakukan proses perulangan untuk beberapa putaran (pass), dari pass ke-1 sampai pass ke-(n-1).",
            },
            {
                text: "Pada setiap pass:",
                substeps: [
                    "Bandingkan elemen A[j] dengan elemen setelahnya yaitu A[j+1].",
                    "Jika A[j] lebih besar daripada A[j+1], maka tukar posisi kedua elemen tersebut.",
                    "Jika tidak, biarkan posisinya tetap.",
                    "Ulangi perbandingan tersebut terus menerus dari awal array sampai mendekati akhir.",
                ],
            },
            {
                text: "Setelah satu pass selesai:",
                substeps: [
                    "Elemen terbesar pada array akan \u201cmengambang\u201d ke bagian paling kanan.",
                    "Karena elemen paling kanan sudah benar posisinya, maka pada pass berikutnya kita tidak perlu membandingkan bagian itu lagi.",
                ],
            },
            {
                text:
                    "Proses ini terus dilakukan sampai semua pass selesai atau sampai tidak ada pertukaran sama sekali.",
            },
            {
                text:
                    "Jika dalam satu pass tidak terjadi pertukaran, maka array sudah terurut dan algoritma bisa berhenti lebih cepat.",
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
