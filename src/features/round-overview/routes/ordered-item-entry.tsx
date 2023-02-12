import { Box, styled, Typography } from "@mui/material";
import { OrderedItem } from "../types";
import OrderedItemOptions from "./ordered-item-options";
import { getVariantsString } from "../utils/get-variants-string";

const OrderedItemTypography = styled(Typography)`
  font-size: 1.4rem;
`;

const OrderedItemGrid = styled(Box)`
  display: grid;
  grid-template:
    "amount name options" ". variants variants" ". comment comment" / minmax(
      0,
      max-content
    )
    minmax(0, 1fr) minmax(0, max-content) minmax(0, auto);
  column-gap: 4px;
  white-space: pre-wrap;
`;

type OrderedItemEntryListProps = {
  items: readonly OrderedItem[];
};

function OrderedItemEntry({ items }: OrderedItemEntryListProps) {
  const elements = items.map((orderedItem) => (
    <OrderedItemGrid key={orderedItem.id}>
      <OrderedItemTypography gridArea="amount" fontWeight="bold">
        {orderedItem.amount}x
      </OrderedItemTypography>
      <OrderedItemTypography fontWeight="bold" gridArea="name">
        {orderedItem.name}
      </OrderedItemTypography>
      <OrderedItemTypography gridArea="comment" fontStyle="italic">
        {orderedItem.comment}
      </OrderedItemTypography>
      <OrderedItemTypography gridArea="variants">
        {getVariantsString(orderedItem.variants)}
      </OrderedItemTypography>
      <OrderedItemOptions item={orderedItem} />
    </OrderedItemGrid>
  ));

  return <>{elements}</>;
}

export default OrderedItemEntry;
