import { useIntrospectionStore } from "./state/introspection";
import { invariant } from "./utils/invariant";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./lib";
import { useAppConfigQuery } from "./hooks/use-appconfig-query";

function Root() {
  const { data: config } = useAppConfigQuery();
  const { registeredFunctions, setFunctionToFail, functionToFail } =
    useIntrospectionStore();

  // Index all registered functions/operations by their symbol for easier access.
  const functionSymbolIndex = useMemo(() => {
    return registeredFunctions.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.description!]: curr,
      }),
      {} as Record<string, Symbol>
    );
  }, [registeredFunctions]);

  const handleOperationChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const symbol = functionSymbolIndex[value];
    invariant(symbol, "function symbol not in index");
    setFunctionToFail(symbol);
  };

  const hasSelection = !!functionToFail;
  const resetSelection = () => setFunctionToFail(null);

  if (!config!.debug) {
    return <Outlet />;
  }

  return (
    <>
      <Box
        position="fixed"
        display="flex"
        alignItems="center"
        right={16}
        bottom={16}
        zIndex={100}
        p={2}
        bgcolor={theme.palette.background.paper}
      >
        <FormControl>
          <InputLabel id="debug-operation">Operation</InputLabel>
          <Select
            onChange={handleOperationChange}
            value={functionToFail?.description ?? ""}
            labelId="debug-operation"
            label="Operation"
            autoWidth
            sx={{ minWidth: "8rem" }}
          >
            {registeredFunctions.map((func) => (
              <MenuItem key={func.description} value={func.description}>
                {func.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {hasSelection && (
          <IconButton onClick={resetSelection}>
            <CancelIcon />
          </IconButton>
        )}
      </Box>
      <Outlet />
    </>
  );
}

export default Root;
