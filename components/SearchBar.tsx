import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Tooltip } from "@mui/material";

const drawerWidth = 240;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar({
  setView,
  detail,
  handleRemoveMode: handleRemove,
  removeMode,
  tittle,
}: { setView: (view: string) => void; detail: boolean, handleRemoveMode: () => void, removeMode: boolean, tittle: string }) {
  return (
    <AppBar
      variant="elevation"
      color="transparent"
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px - 2rem)` },
        ml: { sm: `calc(${drawerWidth}px)` },
        margin: { sm: "1rem" },
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap={true}
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <Link href={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            Inventario
          </Link>
          <Link href={"/items/add"}>
            <Tooltip title='Add Item'
              placement="bottom"
              arrow={true}
            >
              <span>
                <IconButton>
                  <Add />
                </IconButton>
              </span>
            </Tooltip>
          </Link>

          {
            !detail &&
            <Tooltip title={removeMode ? 'Disable delete mode' : 'Enable delete mode'}
              placement="right-end"
              arrow={true}
            >
              <span>
                <IconButton onClick={handleRemove}>
                  <RemoveIcon />
                </IconButton>
              </span>
            </Tooltip>
          }
        </Typography>
        <Typography flex={1} variant="h6" noWrap={true} component="div">
          {tittle}
        </Typography>
        {detail ? null : (
          <>
            <IconButton onClick={() => setView("list")}>
              <ListIcon />
            </IconButton>
            <IconButton onClick={() => setView("grid")}>
              <GridViewIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                sx={{ border: "1px solid black", borderRadius: "5px" }}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
