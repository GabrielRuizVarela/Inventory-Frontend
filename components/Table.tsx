import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Item } from "../pages";
import { Button, IconButton } from "@mui/material";
import { DeleteOutline } from '@mui/icons-material'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
// 	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
// 	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
// 	createData("Eclair", 262, 16.0, 24, 6.0),
// 	createData("Cupcake", 305, 3.7, 67, 4.3),
// 	createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function DenseTable({ items, removeMode, handleDelete }: { items: Item[], removeMode: boolean, handleDelete: (id: string) => void }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Stock</TableCell>
            {
              removeMode &&
              <TableCell align="center"> <DeleteOutline /></TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.category.name}</TableCell>
              <TableCell align="center">{item.price}</TableCell>
              <TableCell align="center">{item.stock}</TableCell>
              {
                removeMode &&
                <TableCell align="center"><Button variant="outlined" color="inherit" size="small"
                  onClick={() => handleDelete(item._id)}
                >Delete</Button></TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
