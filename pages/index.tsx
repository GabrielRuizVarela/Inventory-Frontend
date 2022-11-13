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

// fetch from serverside
export async function getServerSideProps() {
	const res = await fetch("http://localhost:5050/items/");
	// console.log(res);
	const data = await res.json();
	return {
		props: { data },
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

export default function Home({ data }: { data: Item[] }) {
	console.log(data);
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* <SearchBar /> */}

			<Sidebar />
			<SearchBar />
			<main
				className={
					styles.main
				}
				// style={{
				// 	display: "flex",
				// 	justifyContent: "center",
				// }}
			>
				<Grid2
					container={true}
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
					sx={
						{
							// 		display: "flex",
							// 		flexDirection: "row",
							// 		flexWrap: "wrap",
							// justifyContent: "center",
							// alignItems: "center",
							// alignContent: "center",
							// 		gap: "1rem",
						}
					}
				>
					{data.map((item) => (
						<Grid2
							xs={4}
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Card key={item._id} item={item} />
						</Grid2>
					))}
				</Grid2>
				<Container>
					<Table items={data} />
				</Container>
			</main>

			{/* <main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>
			</main> */}
		</div>
	);
}
