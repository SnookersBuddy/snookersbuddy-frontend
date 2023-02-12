export class InvariantError extends Error {}

const BASE_MESSAGE = "Failed to uphold invariant";

/**
 * Asserts the invariant holds up true all the time.
 *
 * @param val - The invariant
 * @param message - An optional error message to append
 */
export function invariant(val: any, message?: string): asserts val {
  if (!val) {
    throw new InvariantError(
      message ? `${BASE_MESSAGE}: ${message}` : BASE_MESSAGE
    );
  }
}
