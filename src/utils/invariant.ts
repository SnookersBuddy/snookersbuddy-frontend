export class InvariantError extends Error {}

const BASE_MESSAGE = "Failed to uphold invariant";

export function invariant(val: any, message?: string): asserts val {
  if (!val) {
    throw new InvariantError(
      message ? `${BASE_MESSAGE}: ${message}` : BASE_MESSAGE
    );
  }
}
