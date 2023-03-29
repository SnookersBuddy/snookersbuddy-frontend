import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TabPanel from "./tab-panel";
import { Option } from "../types/table-data";
import { queryClient } from "../../../lib";
import { useDeleteOptionMutation } from "../hooks/use-delete-admin-mutation";
import { Link as RouterLink } from "react-router-dom";

type ItemProps = {
  options: Option[];
  value: number;
  optionId: (optionId: number) => void;
};

function OptionsTable({ options, value }: ItemProps) {
  const { mutate } = useDeleteOptionMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["table-data"]);
    },
  });

  function deleteOption(e, row) {
    mutate(row.id);
  }

  const columnsOptions: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name1",
      width: 150,
      editable: true,
    },
    {
      field: "edit",
      headerName: "Bearbeiten",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            variant="contained"
            aria-label="delete"
            color="primary"
            key={params.row.id}
            component={RouterLink}
            to={`option/${params.row.id}`}
          >
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      field: "delete",
      headerName: "Löschen",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={(e) => deleteOption(e, params.row)}
            variant="contained"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <TabPanel value={value} index={2}>
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={options}
          columns={columnsOptions}
          pageSize={15}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          autoHeight
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="outlined" component={RouterLink} to={`option/new`}>
            Neue Option anlegen
          </Button>
        </Box>
      </Box>
    </TabPanel>
  );
}

export default OptionsTable;
