import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff1f0",
      light: "#ff7961",
      dark: "#ba000d",
    },

    secondary: {
      main: "#3ea6ff",
      light: "#72d1ff",
      dark: "#007ac1",
    },
  },

});

export const ColorModeContext = createContext({ toggleColorMode: () => { } });
export const AppContext = createContext({
  view: "grid",
  setView: (view: "grid" | "list") => { },
  isDetailPage: false,
  setIsDetailPage: (isDetailPage: boolean) => { },
  isRemoveMode: false,
  setIsRemoveMode: (removeMode: boolean) => { },
});
export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [view, setView] = useState('grid');
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#fff1f0",
            light: "#ff7961",
            dark: "#ba000d",
          },

          secondary: {
            main: "#3ea6ff",
            light: "#72d1ff",
            dark: "#007ac1",
          },
        },
      }),
    [mode],
  );
  const appContext = useMemo(
    () => ({
      view,
      setView,
      isDetailPage,
      setIsDetailPage,
      isRemoveMode,
      setIsRemoveMode,
    }),
    [view, isDetailPage, isRemoveMode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppContext.Provider value={appContext}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AppContext.Provider>
    </ColorModeContext.Provider>
  );
}
