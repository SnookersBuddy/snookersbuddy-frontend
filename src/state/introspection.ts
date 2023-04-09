import produce from "immer";
import { create } from "zustand";

export class IntrospectionError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

export type IntrospectionState = {
  registeredFunctions: Symbol[];
  functionToFail: Symbol | null;
  registerFunction: (target: Symbol) => void;
  setFunctionToFail: (func: Symbol | null) => void;
};

export const useIntrospectionStore = create<IntrospectionState>()((set) => ({
  registeredFunctions: [],
  functionToFail: null,
  registerFunction: (target: Symbol) =>
    set(
      produce((draft: IntrospectionState) => {
        draft.registeredFunctions.push(target);
      })
    ),
  setFunctionToFail: (func: Symbol | null) =>
    set(
      produce((draft: IntrospectionState) => {
        draft.functionToFail = func;
      })
    ),
}));

export function introspect<T extends Function>(name: string, target: T): T {
  const symbol = Symbol(`op:${name}`);
  useIntrospectionStore.getState().registerFunction(symbol);

  return ((...args: unknown[]) => {
    const { functionToFail } = useIntrospectionStore.getState();
    if (functionToFail === symbol) {
      console.info(`[Introspection] Failing function '${name}' due to introspection.`)
      return Promise.reject(
        new IntrospectionError(`${name} failed due to introspection`)
      );
    }
    return target(...args);
  }) as unknown as T;
}
