import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { Container, Theme, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import Link from "next/link";
import SearchBar2 from "../../components/SearchBar";
import Sidebar2 from "../../components/Sidebar";
import { AppContext } from "../_app";
import styled from "@emotion/styled";
import Card2 from "../../components/Card";
import Table from "../../components/Table";
import { useRouter } from "next/router";
import useGetData from "../../hooks/useGetData";

const drawerWidth = 240;
const StyledBox = styled(Box)<{ opendrawer: string; theme: Theme }>(
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

export default function Categories() {
	const {
		view,
		isRemoveMode,
		openSidebar,
		items,
		categories,
		searchValue,
		setItems,
		setCategories,
	} = useContext(AppContext);
	const router = useRouter();
	const id = router.query.id;
	const filteredByCategory = items.filter((item) => item.category._id === id);
	const theme = useTheme();
	useGetData(setItems, setCategories);

	return (
		<>
			<Head>
				<title>Inventory</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SearchBar2 />
			<Sidebar2 categories={categories} />
			<main>
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
							{filteredByCategory?.map((item) => (
								<Grid2
									xs={"auto"}
									key={item._id}
									sx={{
										display: "flex",
									}}
								>
									<Link
										href={`/items/${item._id}`}
										style={{ textDecoration: "none" }}
									>
										<Card2 key={item._id} item={item} />
									</Link>
								</Grid2>
							))}
						</Grid2>
					) : (
						<Container sx={{ marginTop: 4 }}>
							<Table
								items={filteredByCategory.filter((item) =>
									item.name.toLowerCase().includes(searchValue.toLowerCase()),
								)}
							/>
						</Container>
					)}
				</StyledBox>
			</main>
		</>
	);
}
