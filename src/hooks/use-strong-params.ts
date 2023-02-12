import { useParams } from "react-router-dom";
import { invariant } from "../utils/invariant";

/**
 * Returns guaranteed initialised params of the current location.
 *
 * Normally useParams returns an object where all keys are optional.
 *
 * @param keys - The list of keys that should be checked.
 *
 * @example
 * // valid
 * const { key1, key2 } = useStrongParams('key1', 'key2', ...);
 *
 * // invalid, key2 is missing in the params list.
 * const { key1, key2 } = useStrongParams('key1');
 */
export function useStrongParams<T extends string>(
  ...keys: readonly [T, ...T[]]
): { [K in T]: string } {
  const params = useParams();
  for (const key of keys) {
    invariant(params[key], `${key} must be set in the params`);
  }
  return params as { [K in T]: string };
}