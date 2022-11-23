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
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
	const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
	const { items } = await res.json();
	const { categories } = await res2.json();
	return {
		props: {
			item: items.find((item: Item) => item._id === id),
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
