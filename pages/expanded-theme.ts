import '@mui/material/styles';
// import Pallete

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

import '@material-ui/core/styles';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';
