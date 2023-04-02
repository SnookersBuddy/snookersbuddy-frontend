import type {
  ControllerFieldState,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Noop,
  RefCallBack,
  UseFormStateReturn,
} from "react-hook-form";
import { Controller, ControllerProps } from "react-hook-form";
import React from "react";

type TransformControllerRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TInput = string
> = {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: TInput;
  name: TName;
  ref: RefCallBack;
};

export type ValueTransformer<TExternal, TInput = string> = {
  toInput: (value: TExternal) => TInput;
  toOutput: (output: unknown) => TExternal;
};

type TransformControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TInput = string
> = Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  transform: ValueTransformer<FieldPathValue<TFieldValues, TName>, TInput>;
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: TransformControllerRenderProps<TFieldValues, TName, TInput>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => React.ReactElement;
};

function TransformController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TInput = string
>({
  render,
  transform,
  ...rest
}: TransformControllerProps<TFieldValues, TName, TInput>) {

  return (
    <Controller
      {...rest}
      render={({ field, fieldState, formState }) =>
        render({
          formState,
          fieldState,
          field: {
            ...field,
            value: transform.toInput(field.value),
            onChange: (e) => field.onChange(transform.toOutput(e)),
          },
        })
      }
    />
  );
}

export default TransformController;
