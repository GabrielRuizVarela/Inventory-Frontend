import React, { useContext } from "react";
import { Category, Item } from "../index";
import { Box, useTheme } from "@mui/material";
import AddItem from "./add";
import Fab from "@mui/material/Fab";
import SearchBar2 from "../../components/SearchBar";
import { StyledBox } from "../index";
import Sidebar2 from "../../components/Sidebar";
import Card2 from "../../components/Card";
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
	// console.log(item);
	return (
		<>
			<SearchBar2 />
			<Sidebar2 categories={categories} />
			{editMode ? (
				<AddItem initialValues={item} categories={categories} />
			) : (
				<>
					<StyledBox
						theme={theme}
						opendrawer={openSidebar.toString()}
						sx={{ display: "flex", justifyContent: "center", marginTop: 14 }}
					>
						<Box position={"relative"}>
							<Card2 item={item} />
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
					</StyledBox>
				</>
			)}
		</>
	);
}
