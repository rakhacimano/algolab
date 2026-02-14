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
        "Membangun array terurut satu per satu dengan menyisipkan elemen ke posisi yang tepat.",
    instruction: {
        title: "Langkah-langkah Insertion Sort",
        steps: [
            {
                text:
                    "Anggap elemen pertama (indeks 0) sudah berada pada posisi yang benar (terurut).",
            },
            {
                text:
                    "Mulai proses dari elemen kedua (indeks 1) sampai elemen terakhir.",
            },
            {
                text: "Pada setiap iterasi (untuk elemen ke-i):",
                substeps: [
                    "Ambil elemen tersebut dan simpan sebagai 'key' (nilai yang akan disisipkan).",
                    "Bandingkan 'key' dengan elemen-elemen di sebelah kirinya yang sudah terurut.",
                ],
            },
            {
                text: "Lakukan proses penggeseran:",
                substeps: [
                    "Selama elemen di sebelah kiri lebih besar dari 'key', geser elemen tersebut satu langkah ke kanan.",
                    "Lanjutkan pemeriksaan ke elemen di sebelah kirinya lagi.",
                ],
            },
            {
                text:
                    "Jika ditemukan elemen yang lebih kecil atau sama dengan 'key', atau jika sudah sampai di ujung kiri array:",
                substeps: [
                    "Hentikan proses penggeseran.",
                    "Sisipkan 'key' di posisi kosong yang tersedia.",
                ],
            },
            {
                text:
                    "Ulangi proses ini sampai elemen terakhir berhasil disisipkan pada posisi yang tepat.",
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
