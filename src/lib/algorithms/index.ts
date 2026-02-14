import { Algorithm } from "../types";
import { bubbleSortConfig } from "./bubbleSort";
import { selectionSortConfig } from "./selectionSort";
import { insertionSortConfig } from "./insertionSort";
import { mergeSortConfig } from "./mergeSort";
import { quickSortConfig } from "./quickSort";
import { heapSortConfig } from "./heapSort";

export const algorithms: Algorithm[] = [
    bubbleSortConfig,
    selectionSortConfig,
    insertionSortConfig,
    mergeSortConfig,
    quickSortConfig,
    heapSortConfig,
];

export function getAlgorithm(id: string): Algorithm | undefined {
    return algorithms.find((a) => a.id === id);
}
