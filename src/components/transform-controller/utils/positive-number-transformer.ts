import { ChangeEvent } from "react";
import { ValueTransformer } from "../transform-controller";

export const positiveNumberTransformer: ValueTransformer<number> = {
  toInput: (value) => value.toString(),
  toOutput: (outputRaw) => {
    const event = outputRaw as ChangeEvent<HTMLInputElement>;
    const output = Number.parseInt(event.target.value, 10);
    // Only return output if it's a positive number.
    return isNaN(output) ? 0 : output < 0 ? 0 : output;
  },
};
