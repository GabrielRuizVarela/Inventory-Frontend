import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Item, Category, server } from ".";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export interface AppContextInterface {
	view: "grid" | "list";
	setView: (view: "grid" | "list") => void;
	isDetailPage: boolean;
	setIsDetailPage: (isDetailPage: boolean) => void;
	isRemoveMode: boolean;
	setIsRemoveMode: (removeMode: boolean) => void;
	openSidebar: boolean;
	setOpenSidebar: (openSidebar: boolean) => void;
	openMobileSidebar: boolean;
	setOpenMobileSidebar: (openMobileSidebar: boolean) => void;
	handleDeleteCategory: (id: string) => void;
	showAlert: boolean;
	setShowAlert: (showAlert: boolean) => void;
	alertMessage: string;
	setAlertMessage: (alertMessage: string) => void;
	alertSeverity: "success" | "error" | "warning" | "info";
	setAlertSeverity: (
		severity: "success" | "error" | "warning" | "info",
	) => void;
	isAddCategory: boolean;
	setIsAddCategory: (isAddCategory: boolean) => void;
	searchValue: string;
	setSearchValue: (searchValue: string) => void;
	items: Item[];
	setItems: (items: Item[]) => void;
	categories: Category[];
	setCategories: (categories: Category[]) => void;
	refetch: boolean;
	setRefetch: (refetch: boolean) => void;
}

export const AppContext = createContext({} as AppContextInterface);

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	// Initialize state
	const [items, setItems] = useState<Item[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [refetch, setRefetch] = useState(false);
	// SearchBar
	const [mode, setMode] = useState<"light" | "dark">("light");
	const [view, setView] = useState<"grid" | "list">("grid");
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
		fetch(`${server}/categories/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok) {
					setShowAlert(true);
					setTimeout(() => {
						setShowAlert(false);
					}, 3000);
					setAlertSeverity("success");
					setAlertMessage("Category deleted successfully");
					setCategories(categories.filter((category) => category._id !== id));
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
			})
			.catch((err) => {
				console.log(err);
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
									main: "#180827",
									light: "#295f7e",
									dark: "#030303",
									contrastText: "#ffffff",
								},
								secondary: {
									main: "#b4c6d6",
									light: "#72d1ff",
									dark: "#007ac1",
								},
								background: {
									default: "rgb(20, 12, 1)",
									paper: "#180827",
								},
						  }),
				},
			}),
		[mode],
	);
	const appContext: AppContextInterface = useMemo(
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
			items,
			setItems,
			categories,
			setCategories,
			refetch,
			setRefetch,
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
			items,
			categories,
		],
	);
	return (
		<Layout>
			<ColorModeContext.Provider value={colorMode}>
				<AppContext.Provider value={appContext}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</AppContext.Provider>
			</ColorModeContext.Provider>
		</Layout>
	);
}
