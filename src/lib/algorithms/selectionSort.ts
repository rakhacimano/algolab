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
        "Mencari nilai minimum dari bagian yang belum terurut dan menukarnya ke posisi awal.",
    instruction: {
        title: "Langkah-langkah Selection Sort",
        steps: [
            {
                text:
                    "Anggap array terbagi dua bagian: bagian terurut (di kiri) dan belum terurut (di kanan). Awalnya bagian terurut kosong.",
            },
            {
                text:
                    "Mulai proses pencarian nilai minimum dari seluruh bagian yang belum terurut.",
            },
            {
                text: "Pada setiap pass (dari indeks i = 0 sampai n-2):",
                substeps: [
                    "Anggap elemen pada posisi i sebagai nilai minimum sementara.",
                    "Bandingkan elemen tersebut dengan semua elemen lain di sebelah kanannya (dari j = i+1 sampai n-1).",
                    "Jika ditemukan elemen yang lebih kecil, catat posisi elemen tersebut sebagai minimum baru.",
                    "Lanjutkan perbandingan sampai akhir array.",
                ],
            },
            {
                text: "Setelah selesai memeriksa semua elemen di sebelah kanan:",
                substeps: [
                    "Jika posisi minimum berbeda dengan posisi awal i, tukar kedua elemen tersebut.",
                    "Sekarang elemen terkecil sudah berada di posisi yang benar (di ujung kiri bagian belum terurut).",
                ],
            },
            { text: "Geser batas bagian terurut satu langkah ke kanan." },
            { text: "Ulangi proses ini sampai seluruh array terurut." },
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
