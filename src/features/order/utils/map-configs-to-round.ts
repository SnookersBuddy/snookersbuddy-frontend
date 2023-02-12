import { Configuration } from "../types/configuration";
import { Round } from "../types/round";

export function mapConfigsToRound(
  configs: Configuration[],
  assignmentId: number
): Round {
  const orderedItems = configs
    .map((itemConfig) => {
      // Only pull the selected variants (SingleVariant) from each variant group (Variant).
      const chosenVariants = itemConfig.variants.map(
        (group) =>
          group.variants.find(
            (variant) => variant.id === group.defaultVariantId
          )!
      );

      // We use ALL options (regardless of selected or not) because the waiter needs to know whether to include something or not.
      // If e.g. ice is the default for Cola and the waiter deselects it then in the big overview the deselected won't show.
      const chosenOptions = itemConfig.options;
      const comment = itemConfig.comment;
      const amount = itemConfig.amount;
      return {
        item: itemConfig.item,
        chosenVariants,
        chosenOptions,
        comment,
        amount,
      };
    })
    .filter((config) => config.amount != 0);

  return { assignmentId, orderedItems };
}