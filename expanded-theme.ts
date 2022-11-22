import '@mui/material/styles';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    main: PaletteColor;
  }
  interface PaletteOptions {
    main?: PaletteColorOptions;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    main: true;
  }
}

declare module '@mui/material/Fab' {
  interface FabPropsColorOverrides {
    main: true;
  }
}

// import '@material-ui/core/styles';
