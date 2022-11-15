import React, { useEffect } from "react";
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
	Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import { Props, ScriptProps } from "next/script";
import { Block } from "@mui/icons-material";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import Table from "../components/Table";
import Link from "next/link";

// fetch from serverside
export async function getServerSideProps() {
	const res = await fetch("http://localhost:5050/items/");
	const res2 = await fetch("http://localhost:5050/categories/");
	// console.log(res);
	const data = await res.json();
	const data2 = await res2.json();
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
	const [items, setItems] = React.useState<Item[] | null>(null);
	const [categories, setCategorys] = React.useState<Category[] | []>([]);
	const [view, setView] = React.useState("grid");
	useEffect(() => {
		setItems(serverItems);
		setCategorys([
			{ _id: "all", name: "All", description: "All" },
			...serverCategories,
		]);
	}, []);
	const handleSidebarClick = (item: Category) => {
		if (item._id === "all") {
			setItems(serverItems);
		} else {
			const filteredData = serverItems.filter(
				(item2: Item) => item2.category._id === item._id,
			);
			setItems(filteredData);
		}
	};
	const handleSetView = (view: string) => {
		setView(view);
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Sidebar
				categories={categories}
				handleSidebarClick={handleSidebarClick}
			/>
			<SearchBar setView={handleSetView} detail={false} />
			<main className={styles.main}>
				{view === "grid" ? (
					<Grid2
						container={true}
						mt={10}
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						{(items ? items : []).map((item) => (
							<Grid2
								xs={4}
								key={item._id}
								sx={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<Link
									href={`/items/${item._id}`}
									style={{ textDecoration: "none" }}
								>
									<Card key={item._id} item={item} />
								</Link>
							</Grid2>
						))}
					</Grid2>
				) : (
					<Container sx={{ marginTop: 12 }}>
						<Table items={items || []} />
					</Container>
				)}
			</main>
		</div>
	);
}
