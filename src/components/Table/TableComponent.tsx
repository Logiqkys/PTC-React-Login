import React, { useMemo, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { TextField, TextareaAutosize, Box, Button } from "@mui/material";

type TableData = {
  id: number;
  sport: string;
  entryFee: string;
  entries: string;
  maxEntries: string;
  time: string;
  description: string;
};

interface TableComponentProps {
  isEditable: boolean; // Determines if the user has edit permissions
}

const TableComponent: React.FC<TableComponentProps> = ({ isEditable }) => {
  const [tableData, setTableData] = useState<TableData[]>([
    {
      id: 1,
      sport: "NFL",
      entryFee: "$50",
      entries: "12",
      maxEntries: "48",
      time: "2:00 ET",
      description: "NFL contest description here.",
    },
    {
      id: 2,
      sport: "MLB",
      entryFee: "$10",
      entries: "20",
      maxEntries: "100",
      time: "5:00 ET",
      description: "MLB contest description here.",
    },
    {
      id: 3,
      sport: "NBA",
      entryFee: "$30",
      entries: "18",
      maxEntries: "60",
      time: "7:00 ET",
      description: "NBA contest description here.",
    },
    {
      id: 4,
      sport: "Soccer",
      entryFee: "$15",
      entries: "25",
      maxEntries: "80",
      time: "9:00 ET",
      description: "Soccer contest description here.",
    },
    {
      id: 5,
      sport: "Tennis",
      entryFee: "$40",
      entries: "10",
      maxEntries: "30",
      time: "3:00 ET",
      description: "Tennis contest description here.",
    },
  ]);

  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);

  const handleCellUpdate = (
    rowIndex: number,
    columnId: string,
    value: string
  ) => {
    setTableData((prev) =>
      prev.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const handleAddRow = () => {
    const newRow: TableData = {
      id: tableData.length + 1,
      sport: "",
      entryFee: "",
      entries: "",
      maxEntries: "",
      time: "",
      description: "",
    };
    setTableData((prev) => [...prev, newRow]);
  };

  const handleDeleteRow = (rowIndex: number) => {
    setTableData((prev) => prev.filter((_, index) => index !== rowIndex));
  };

  const handleSaveRow = () => {
    setEditingRowIndex(null); // Save the row and exit edit mode
  };

  const columns = useMemo<MRT_ColumnDef<TableData>[]>(() => {
    const baseColumns: MRT_ColumnDef<TableData>[] = [
      {
        accessorKey: "sport",
        header: "Sport",
        Cell: ({ cell, row }) =>
          editingRowIndex === row.index ? (
            <TextField
              variant="outlined"
              size="small"
              value={cell.getValue<string>()}
              onChange={(e) =>
                handleCellUpdate(row.index, "sport", e.target.value)
              }
              fullWidth
            />
          ) : (
            cell.getValue<string>()
          ),
      },
      {
        accessorKey: "entryFee",
        header: "Entry $",
        Cell: ({ cell, row }) =>
          editingRowIndex === row.index ? (
            <TextField
              variant="outlined"
              size="small"
              value={cell.getValue<string>()}
              onChange={(e) =>
                handleCellUpdate(row.index, "entryFee", e.target.value)
              }
              fullWidth
            />
          ) : (
            cell.getValue<string>()
          ),
      },
      {
        accessorKey: "entries",
        header: "# Entries",
        Cell: ({ cell, row }) =>
          editingRowIndex === row.index ? (
            <TextField
              variant="outlined"
              size="small"
              value={cell.getValue<string>()}
              onChange={(e) =>
                handleCellUpdate(row.index, "entries", e.target.value)
              }
              fullWidth
            />
          ) : (
            cell.getValue<string>()
          ),
      },
      {
        accessorKey: "maxEntries",
        header: "Max",
        Cell: ({ cell, row }) =>
          editingRowIndex === row.index ? (
            <TextField
              variant="outlined"
              size="small"
              value={cell.getValue<string>()}
              onChange={(e) =>
                handleCellUpdate(row.index, "maxEntries", e.target.value)
              }
              fullWidth
            />
          ) : (
            cell.getValue<string>()
          ),
      },
      {
        accessorKey: "time",
        header: "Time",
        Cell: ({ cell, row }) =>
          editingRowIndex === row.index ? (
            <TextField
              variant="outlined"
              size="small"
              value={cell.getValue<string>()}
              onChange={(e) =>
                handleCellUpdate(row.index, "time", e.target.value)
              }
              fullWidth
            />
          ) : (
            cell.getValue<string>()
          ),
      },
      {
        accessorKey: "description",
        header: "Description",
        Cell: ({ cell, row }) =>
          editingRowIndex === row.index ? (
            <TextareaAutosize
              value={cell.getValue<string>()}
              onChange={(e) =>
                handleCellUpdate(row.index, "description", e.target.value)
              }
              minRows={3}
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "8px",
                fontSize: "14px",
              }}
            />
          ) : (
            cell.getValue<string>()
          ),
      },
    ];

    if (isEditable) {
      baseColumns.push({
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <Box display="flex" gap="0.5rem">
            {editingRowIndex === row.index ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleSaveRow}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setEditingRowIndex(row.index)}
              >
                Edit
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDeleteRow(row.index)}
            >
              Delete
            </Button>
          </Box>
        ),
      });
    }

    return baseColumns;
  }, [editingRowIndex, isEditable]);

  return (
    <Box>
      {isEditable && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Button variant="outlined" color="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Box>
      )}
      <MaterialReactTable
        columns={columns}
        data={tableData}
        enableRowSelection={isEditable}
        muiTableContainerProps={{
          sx: {
            maxHeight: "500px",
          },
        }}
        initialState={{
          pagination: { pageIndex: 0, pageSize: 5 },
        }}
      />
    </Box>
  );
};

export default TableComponent;
