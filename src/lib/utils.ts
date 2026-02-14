/**
 * Generate a random array of integers for sorting visualizations.
 */
export function generateRandomArray(size: number): number[] {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 99) + 1);
}
