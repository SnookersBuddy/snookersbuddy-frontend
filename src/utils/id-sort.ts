/**
 * Compares two objects with id properties.
 *
 * @param a - Object A
 * @param b - Object B
 */
export function idSort<T extends { id?: number }>(a: T, b: T): number {
  return (a?.id ?? 0) - (b?.id ?? 0);
}
