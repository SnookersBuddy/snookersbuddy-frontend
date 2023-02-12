import { Button, ButtonProps } from "@mui/material";
import { ElementType } from "react";

function LandingButton<C extends ElementType>(
  props: ButtonProps<C, { component?: C }>
) {
  return <Button variant="outlined" sx={{ py: 2 }} {...props} />;
}

export default LandingButton;