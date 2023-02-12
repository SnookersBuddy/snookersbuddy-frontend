import { create } from "zustand";
import { Configuration, Option, Variant } from "../types/configuration";
import produce from "immer";
import { devtools } from "zustand/middleware";
import { useActiveAssignment } from "../hooks/use-active-assignment";
import { Assignment } from "../types/assignment";
import { invariant } from "../../../utils/invariant";

type AssignmentId = number;

export type RoundState = RoundAction & {
  ongoingRoundOrders: Record<AssignmentId, OngoingRoundState>;
  getRound: (assignmentId: AssignmentId) => OngoingRoundState;
};

export type RoundAction = {
  resetAssignment: (assignmentId: AssignmentId) => void;
  replaceConfigurationFor: (
    assignmentId: AssignmentId,
    newConfig: Configuration
  ) => void;
  upsertConfigurationFor: (
    assignmentId: AssignmentId,
    newConfig: Configuration
  ) => void;
};

export type OngoingRoundState = {
  configs: Configuration[];
};

const initialRoundOrderState = {
  configs: [],
};

export const useRoundState = create<RoundState>()(
  devtools(
    (set, get) => ({
      ongoingRoundOrders: {},
      getRound: (assignmentId: AssignmentId) =>
        get().ongoingRoundOrders[assignmentId] ?? initialRoundOrderState,
      resetAssignment: (assignmentId: AssignmentId) =>
        set(
          produce((draft: RoundState) => {
            draft.ongoingRoundOrders[assignmentId] = initialRoundOrderState;
          })
        ),
      replaceConfigurationFor: (
        assignmentId: AssignmentId,
        newConfig: Configuration
      ) =>
        set(
          produce((draft: RoundState) => {
            const roundOrder =
              draft.ongoingRoundOrders[assignmentId] ?? initialRoundOrderState;
            mustReplaceMatchingConfiguration(roundOrder.configs, newConfig);
          })
        ),
      upsertConfigurationFor: (
        assignmentId: AssignmentId,
        newConfig: Configuration
      ) =>
        set(
          produce((draft: RoundState) => {
            const roundOrder =
              draft.ongoingRoundOrders[assignmentId] ?? initialRoundOrderState;
            updateMatchingOrPushNewConfiguration(roundOrder.configs, newConfig);
          })
        ),
    }),
    { name: "round-state" }
  )
);

type UseActiveRoundStateHook = RoundAction &
  OngoingRoundState & {
    assignment: Assignment;
    replaceConfig: (newConfig: Configuration) => void;
  };

export const useActiveRoundState = (): UseActiveRoundStateHook => {
  const assignment = useActiveAssignment();
  const { ongoingRoundOrders, getRound, ...rest } = useRoundState();
  const replaceConfig = (config: Configuration) => {
    rest.replaceConfigurationFor(assignment.id, config);
  };
  return {
    assignment,
    replaceConfig,
    ...rest,
    ...getRound(assignment.id),
  };
};

function mustReplaceMatchingConfiguration(
  existingConfigs: Configuration[],
  newConfig: Configuration
) {
  const idx = findMatchingConfigIndex(existingConfigs, newConfig);
  invariant(
    idx >= 0,
    "Tried to update configuration that is not part of round"
  );
  existingConfigs[idx] = newConfig;
}

function findMatchingConfigIndex(
  existingConfigs: Configuration[],
  newConfig: Configuration
) {
  return existingConfigs.findIndex((existingConfig) => {
    if (existingConfig.item.id != newConfig.item.id) {
      return false;
    }
    if (existingConfig.options.length != newConfig.options.length) {
      return false;
    }
    if (existingConfig.variants.length != newConfig.variants.length) {
      return false;
    }
    if (!optionArraysEqual(existingConfig.options, newConfig.options)) {
      return false;
    }
    if (!variantArraysEqual(existingConfig.variants, newConfig.variants)) {
      return false;
    }
    return existingConfig.comment == newConfig.comment;
  });
}

function findMatchingConfig(
  existingConfigs: Configuration[],
  newConfig: Configuration
) {
  const idx = findMatchingConfigIndex(existingConfigs, newConfig);
  return idx >= 0 ? existingConfigs[idx] : undefined;
}

function updateMatchingOrPushNewConfiguration(
  existingConfigs: Configuration[],
  newConfig: Configuration
) {
  const matchingConfig = findMatchingConfig(existingConfigs, newConfig);
  if (matchingConfig) {
    matchingConfig.amount += newConfig.amount;
  } else {
    existingConfigs.push(newConfig);
  }
}

function variantArraysEqual(
  variants: Variant[],
  newVariants: Variant[]
): boolean {
  for (const variant of newVariants) {
    let idx = variants.findIndex((variantB) => variant.name === variantB.name);
    if (variants[idx].defaultVariantId !== variant.defaultVariantId) {
      return false;
    }
  }
  return true;
}

function optionArraysEqual(options: Option[], newOptions: Option[]): boolean {
  for (let option of newOptions) {
    if (options.findIndex((optionB) => option.id === optionB.id) < 0) {
      return false;
    }
    const foundOption = options.findIndex(
      (optionB) => option.id === optionB.id
    );
    if (options[foundOption].defaultValue !== option.defaultValue) {
      return false;
    }
  }
  return true;
}
