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
import { Add, Home } from "@mui/icons-material";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Stack, Tooltip, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext, AppContext } from "../pages/_app";
import { useContext } from "react";

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
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0.5em",
      width: "8ch",
      fontSize: "0.7em",
    },
  },
}));

const StyledBox = styled(Box)<{ opendrawer: string }>(({ theme, opendrawer }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(opendrawer === "true" && {
    // width: `calc(100%)`,
    //add breakpoint only for sm and below
    [theme.breakpoints.up("md")]: {
      marginLeft: `${drawerWidth / 2}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }
  }),

}));



export default function SearchAppBar() {
  const theme = useTheme();
  const { view, setView, isDetailPage, isRemoveMode, setIsRemoveMode, setOpenSidebar, openSidebar } =
    useContext(AppContext);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      sx={{ height: 60, width: "100vw", p: 0, m: 0, justifyContent: "center" }}
    >
      <AppBar position="static" color={'primary'} sx={{ px: { xl: 16 } }}>
        <Toolbar>
          {/* 1/3 */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, width: "min-content" }}
            onClick={() => setOpenSidebar(!openSidebar)}
          >
            <MenuIcon />
          </IconButton>
          {/* 2/3 */}
          <StyledBox
            opendrawer={openSidebar.toString()}
            // variant="h6"
            // noWrap={true}
            // component="div"
            sx={{ flexGrow: 1 }}
          >
            <Stack direction={"row"}>
              <Link
                href={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <IconButton color="inherit">
                  <Home />
                </IconButton>
              </Link>
              <Link href={"/items/add"}>
                <Tooltip title='Add Item' placement="bottom" arrow={true}>
                  <span>
                    <IconButton>
                      <Add />
                    </IconButton>
                  </span>
                </Tooltip>
              </Link>
              {!isDetailPage && (
                <Tooltip
                  title={
                    isRemoveMode ? "Disable delete mode" : "Enable delete mode"
                  }
                  placement="right-end"
                  arrow={true}
                >
                  <span>
                    <IconButton onClick={() => setIsRemoveMode(!isRemoveMode)}>
                      <RemoveIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
            </Stack>
          </StyledBox>
          {/* 3/3 */}
          <Stack direction='row'>
            {isDetailPage ? null : (
              <>
                {view === "grid" ? (
                  <IconButton
                    onClick={() =>
                      setView("list")
                    }
                  >
                    <ListIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setView("grid")}>
                    <GridViewIcon />
                  </IconButton>
                )}
                <Stack
                  direction='row'
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon
                        sx={{ display: { xs: "none", md: "block" } }}
                      />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      sx={{
                        border: "1px solid black",
                        borderRadius: "5px",
                        height: 30,
                        pl: { sx: 0 },
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {theme.palette.mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                </Stack>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
