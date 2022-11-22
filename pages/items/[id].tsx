import React, { useContext } from "react";
import { Category, Item } from "../index";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";

import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import { Container } from "@mui/system";
import { Box, Paper, useTheme } from "@mui/material";
import AddItem from "./add";
import Fab from "@mui/material/Fab";
import SearchBar2 from "../../components/SearchBar";
import { StyledBox } from "../index";
import Sidebar2 from "../../components/Sidebar";
import Card2 from "../../components/Card";
import { Typography } from "@mui/joy";
import { AppContext } from "../_app";

export const getServerSideProps = async (context: any) => {
	const id = context.params.id;
	const [res1, res2] = await Promise.all([
		// fetch("http://localhost:5050/items/"),
		// fetch("http://localhost:5050/categories"),
		fetch("https://inventory-backend-production.up.railway.app/items/"),
		fetch("https://inventory-backend-production.up.railway.app/categories"),
	]);
	const item = await res1.json();
	const categories = await res2.json();
	return {
		props: {
			item: item.find((item: Item) => item._id === id),
			categories,
		},
	};
};

const ItemCard = ({
	item,
	categories,
	handleEditClick,
}: { item: Item; categories: Category[]; handleEditClick: () => void }) => {
	// get id from url
	const theme = useTheme();
	return (
		<Paper elevation={5} sx={{ width: "min-content", borderRadius: 3 }}>
			<Card variant="outlined" sx={{ width: 600 }}>
				<CardOverflow>
					<AspectRatio ratio="2">
						<img
							src="/stock-photo.jpg"
							// srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
							loading="lazy"
							alt=""
						/>
						<Fab
							variant="extended"
							aria-label="add"
							sx={{ position: "absolute", top: 10, right: 10 }}
							onClick={handleEditClick}
						>
							Edit
						</Fab>
					</AspectRatio>
				</CardOverflow>
				<Typography
					level="h2"
					sx={{ fontSize: "xl", mt: 2, fontWeight: "bold" }}
				>
					{item.name}
				</Typography>
				<Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
					{item.description}
				</Typography>
				<Divider />
				<CardOverflow
					variant="soft"
					sx={{
						display: "flex",
						gap: 1.5,
						py: 1.5,
						px: "var(--Card-padding)",
						bgcolor: "background.level1",
					}}
				>
					<Typography
						level="body3"
						sx={{ fontWeight: "md", color: "text.secondary" }}
					>
						Price: ${item.price}
					</Typography>
					<Divider orientation="vertical" />
					<Typography
						level="body3"
						sx={{ fontWeight: "md", color: "text.secondary" }}
					>
						Stock: {item.stock}
					</Typography>
				</CardOverflow>
			</Card>
		</Paper>
	);
};

export default function OverflowCard({
	item,
	categories,
}: { item: Item; categories: Category[] }) {
	const theme = useTheme();
	const { openSidebar } = useContext(AppContext);
	const [editMode, setEditMode] = React.useState(false);
	const handleEditClick = () => {
		setEditMode(true);
	};
	console.log(item);
	return (
		<>
			<SearchBar2 />
			<Sidebar2 categories={categories} />
			{editMode ? (
				<AddItem
					endpoint={`http://localhost:5050/items/${item._id}/edit`}
					initialValues={item}
					categories={categories}
				/>
			) : (
				<>
					<StyledBox
						theme={theme}
						opendrawer={openSidebar.toString()}
						sx={{ display: "flex", justifyContent: "center", marginTop: 14 }}
					>
						<Box position={"relative"}>
							<Card2 maxWidth={800} item={item} />
							<Fab
								variant="extended"
								color="main"
								aria-label="edit"
								sx={{ position: "absolute", top: 10, right: 10 }}
								onClick={handleEditClick}
							>
								Edit
							</Fab>
						</Box>
						{/* <ItemCard
							item={item}
							categories={categories}
							handleEditClick={handleEditClick}
						/> */}
					</StyledBox>
				</>
			)}
		</>
	);
}
