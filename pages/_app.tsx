import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import router from "next/router";

// const theme = createTheme({
//   palette: {
//     // mode: "dark",
//     primary: {
//       main: "#fff1f0",
//       light: "#ff7961",
//       dark: "#ba000d",
//     },

//     secondary: {
//       main: "#020f1a",
//       light: "#e8f6ff",
//       dark: "#030303",
//     },

//   },
// });

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const AppContext = createContext({
	view: "grid",
	setView: (view: "grid" | "list") => {},
	isDetailPage: false,
	setIsDetailPage: (isDetailPage: boolean) => {},
	isRemoveMode: false,
	setIsRemoveMode: (removeMode: boolean) => {},
	openSidebar: true,
	setOpenSidebar: (openSidebar: boolean) => {},
	openMobileSidebar: false,
	setOpenMobileSidebar: (openMobileSidebar: boolean) => {},
	handleDeleteCategory: (id: string) => {},
	showAlert: false,
	setShowAlert: (showAlert: boolean) => {},
	alertMessage: "",
	setAlertMessage: (alertMessage: string) => {},
	alertSeverity: "success" as "success" | "error" | "info" | "warning",
	setAlertSeverity: (severity: "success" | "error" | "warning" | "info") => {},
	isAddCategory: false,
	setIsAddCategory: (isAddCategory: boolean) => {},
	searchValue: "",
	setSearchValue: (searchValue: string) => {},
});

export default function App({ Component, pageProps }: AppProps) {
	// SearchBar
	const [mode, setMode] = useState<"light" | "dark">("light");
	const [view, setView] = useState("grid");
	const [isDetailPage, setIsDetailPage] = useState(false);
	const [isRemoveMode, setIsRemoveMode] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	// Sidebar
	const [openSidebar, setOpenSidebar] = useState(true);
	const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertSeverity, setAlertSeverity] = useState<
		"success" | "error" | "info" | "warning"
	>("success");
	const [isAddCategory, setIsAddCategory] = useState(false);
	const handleDeleteCategory = (id: string) => {
		fetch(`http://localhost:5050/categories/${id}/delete`, {
			method: "DELETE",
			headers: {
				cors: "no-cors",
			},
		}).then((res) => {
			if (res.ok) {
				// setCategories(categories.filter((category) => category._id !== id));
				setShowAlert(true);
				// timeout to hide the alert
				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
				setAlertSeverity("success");
				setAlertMessage("Category deleted successfully");
				router.push("/");
			}
			// if response status is 422, then the item is not deleted
			if (res.status === 422) {
				setShowAlert(true);
				setTimeout(() => {
					setShowAlert(false);
				}, 3000);
				setAlertSeverity("error");
				setAlertMessage(
					"Category not deleted, check if there are any items in this category",
				);
			}
		});
	};

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[],
	);
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === "light"
						? {
								main: {
									main: "#fff1f0",
									light: "#ff7961",
									dark: "#ba000d",
									contrastText: "#000000",
								},
								secondary: {
									main: "#0a2a46",
									light: "#72d1ff",
									dark: "#007ac1",
								},
						  }
						: {
								main: {
									main: "#081827",
									light: "#295f7e",
									dark: "#030303",
									contrastText: "#ffffff",
								},
								secondary: {
									main: "#b4c6d6",
									light: "#72d1ff",
									dark: "#007ac1",
								},
						  }),
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
			openSidebar,
			setOpenSidebar,
			openMobileSidebar,
			setOpenMobileSidebar,
			handleDeleteCategory,
			showAlert,
			setShowAlert,
			alertMessage,
			setAlertMessage,
			alertSeverity,
			setAlertSeverity,
			isAddCategory,
			setIsAddCategory,
			searchValue,
			setSearchValue,
		}),
		[
			view,
			isDetailPage,
			isRemoveMode,
			openSidebar,
			showAlert,
			alertMessage,
			alertSeverity,
			isAddCategory,
			openMobileSidebar,
			searchValue,
		],
	);
	return (
		<ColorModeContext.Provider value={colorMode}>
			<AppContext.Provider value={appContext}>
				<ThemeProvider theme={theme}>
					<Layout>
						<CssBaseline />
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</AppContext.Provider>
		</ColorModeContext.Provider>
	);
}
