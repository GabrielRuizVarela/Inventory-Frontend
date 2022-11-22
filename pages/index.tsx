import React, { useEffect, useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import styles from "../styles/Home.module.css";
import {
	Container,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Theme,
	Toolbar,
	useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { Props, ScriptProps } from "next/script";
import { Block } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import Table from "../components/Table";
import Link from "next/link";
import SearchBar2 from "../components/SearchBar";
import Sidebar2 from "../components/Sidebar";
import { AppContext } from "./_app";
import styled from "@emotion/styled";
import Card2 from "../components/Card";

const drawerWidth = 240;
export const StyledBox = styled(Box)<{ opendrawer: string; theme: Theme }>(
	({ theme, opendrawer }) => ({
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(opendrawer === "true" && {
			[theme.breakpoints.up("md")]: {
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		}),
	}),
);

// fetch from serverside
export async function getServerSideProps() {
	// const res = await fetch("http://localhost:5050/items/");
	const res = await fetch(
		"https://inventory-backend-production.up.railway.app/items/",
	);
	// const res2 = await fetch("http://localhost:5050/categories/");
	const res2 = await fetch(
		"https://inventory-backend-production.up.railway.app/categories/",
	);
	const data = await res.json();
	const data2 = await res2.json();
	// console.log(data2);
	return {
		props: {
			serverItems: data,
			serverCategories: data2,
		},
	};
}
export type Item = {
	_id: string;
	name: string;
	price: number;
	stock: number;
	description: string;
	img_url: string;
	category: {
		_id: string;
		name: string;
		description: string;
	};
};

export type Category = {
	_id: string;
	name: string;
	description: string;
};

export default function Home({
	serverItems,
	serverCategories: serverCategories,
}: { serverItems: Item[]; serverCategories: Category[] }) {
	// const [items, setItems] = React.useState<Item[] | null>(null);
	// const [categories, setCategorys] = React.useState<Category[] | []>([]);
	// const [activeCategory, setActiveCategory] = React.useState<string>('All');
	// const [view, setView] = React.useState("grid");
	// const [removeMode, setRemoveMode] = React.useState(false);
	// useEffect(() => {
	//   setItems(serverItems);
	//   setCategorys([
	//     ...serverCategories,
	//   ]);
	// }, [serverCategories, serverItems]);
	// const handleSidebarClick = (item: Category) => {
	//   setActiveCategory(item.name);
	//   if (item._id === "all") {
	//     setItems(serverItems);
	//   } else {
	//     const filteredData = serverItems.filter(
	//       (item2: Item) => item2.category._id === item._id,
	//     );
	//     setItems(filteredData);
	//   }
	// };
	// const handleSetView = (view: string) => {
	//   setView(view);
	// };
	// const handleRemoveMode = () => {
	//   setRemoveMode(!removeMode);
	// }
	// const handleDelete = (id: string) => {
	//   fetch(`http://localhost:5050/items/${id}/delete`, {
	//     method: "DELETE",
	//   }).then((res) => {
	//     if (res.status === 200) {
	//       const filteredData = items?.filter((item: Item) => item._id !== id);
	//       setItems(filteredData || []);
	//     }
	//   }
	//   );
	// };
	// @refresh reset
	const { view, isRemoveMode, openSidebar, searchValue } =
		useContext(AppContext);
	const theme = useTheme();
	return (
		<>
			{/* Box className={styles.container} sx={{ width: "100vw" }}> */}
			<Head>
				<title>Inventory</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SearchBar2 />
			<Sidebar2 categories={serverCategories} />
			<main className={styles.main}>
				<StyledBox
					theme={theme}
					opendrawer={openSidebar.toString()}
					sx={{ flexGrow: 1 }}
				>
					{view === "grid" ? (
						<Grid2
							container={true}
							mt={4}
							mx={2}
							spacing={{ xs: 2, md: 6 }}
							columns={{ xs: 4, sm: 8, md: 12 }}
							justifyContent="center"
						>
							{/* filtar server items, fijarse que contenga a searchValue */}
							{serverItems
								?.filter((item) =>
									item.name.toLowerCase().includes(searchValue.toLowerCase()),
								)
								.map((item) => (
									<Grid2
										xs={"auto"}
										key={item._id}
										sx={{
											display: "flex",
											// alignItems: "center",
										}}
									>
										{isRemoveMode ? (
											<Card2 key={item._id} item={item} />
										) : (
											<Link
												href={`/items/${item._id}`}
												style={{ textDecoration: "none" }}
											>
												<Card2 key={item._id} item={item} />
											</Link>
										)}
									</Grid2>
								))}
						</Grid2>
					) : (
						<Container sx={{ marginTop: 4 }}>
							<Table
								items={serverItems.filter((item) =>
									item.name.toLowerCase().includes(searchValue.toLowerCase()),
								)}
							/>
						</Container>
					)}
				</StyledBox>
			</main>
			{/* </Box> */}
		</>
	);
}
