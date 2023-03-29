import { MouseEvent } from "react";
import { Button, Stack } from "@mui/material";

type AmountEditorProps = {
  onDecrement: () => void;
  onIncrement: () => void;
};

function AmountEditor({ onIncrement, onDecrement }: AmountEditorProps) {
  const handleDecrementClick = (e: MouseEvent) => {
    e.stopPropagation();
    onDecrement();
  };

  const handleIncrementClick = (e: MouseEvent) => {
    e.stopPropagation();
    onIncrement();
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        onClick={handleDecrementClick}
      >
        -
      </Button>
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        onClick={handleIncrementClick}
      >
        +
      </Button>
    </Stack>
  );
}

export default AmountEditor;
