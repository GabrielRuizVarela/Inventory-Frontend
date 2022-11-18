import { Drawer, SwipeableDrawer, Container, AppBar, Box, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, styled, useTheme } from "@mui/material";
import { Main } from "next/document";
import { useContext, useState } from "react";
import { AppContext } from "../pages/_app";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchBar2 from "./SearchBar2";
import { Category } from "../pages";

let drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const StyledAppBar = styled(SearchBar2, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerList = ({ listItems }: { listItems: Category[] | undefined }) => {
  console.log(listItems);
  return (
    <List>
      {
        listItems?.map((text, index) => (
          <ListItem button={true} key={text._id}>
            <ListItemText primary={text.name} />
          </ListItem>
        ))}
    </List>
  );
}


interface Props {
  categories?: Category[];
}

export default function Sidebar2({ categories }: Props) {
  // const [clientCategories, setClientCategories] = useState<Category[] | null>(categories);
  const theme = useTheme();
  const { openSidebar, setOpenSidebar } = useContext(AppContext);
  console.log(categories);
  return (
    <div id="container">
      <Box>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.primary.main.toString(),
            },
            display: { sm: 'none', md: 'block' },
          }}
          variant="persistent"
          anchor="left"
          open={openSidebar}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpenSidebar(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <DrawerList listItems={categories} />

        </Drawer>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
            display: { sm: 'block', md: 'none' },
          }}
          variant="temporary"
          anchor="left"
          open={openSidebar}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpenSidebar(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <DrawerList listItems={categories} />
        </Drawer>
      </Box>
    </div>
  )
}