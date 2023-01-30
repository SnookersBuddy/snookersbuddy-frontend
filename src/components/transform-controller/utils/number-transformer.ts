import { ValueTransformer } from "../transform-controller";
import { ChangeEvent } from "react";

/**
 * Use this only with inputs that use string values (e.g. normal <input/>).
 */
export const numberTransformer: ValueTransformer<number> = {
  toInput: (value) => value.toString(),
  toOutput: (event: unknown) => {
    const inputEvent = event as ChangeEvent<HTMLInputElement>;
    const output = Number.parseInt(inputEvent.target.value);
    return isNaN(output) ? 0 : output;
  },
};
