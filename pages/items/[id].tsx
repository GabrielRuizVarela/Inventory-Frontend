import React, { useContext } from "react";
import { Box, useTheme } from "@mui/material";
import { AddItemForm } from "./add";
import Fab from "@mui/material/Fab";
import SearchBar2 from "../../components/SearchBar";
import { StyledBox } from "../index";
import Sidebar2 from "../../components/Sidebar";
import Card2 from "../../components/Card";
import { AppContext } from "../_app";
import { useRouter } from "next/router";

export default function OverflowCard() {
	const theme = useTheme();
	const { openSidebar, items, categories, refetch, setRefetch } =
		useContext(AppContext);
	const router = useRouter();
	const id = router.query.id;
	const item = items.find((item) => item._id === id) || null;
	const [editMode, setEditMode] = React.useState(false);
	const handleEditClick = () => {
		setEditMode(true);
	};
	return (
		<>
			<SearchBar2 />
			<Sidebar2 categories={categories} />
			{editMode ? (
				<AddItemForm
					initialValues={item || null}
					categories={categories}
					theme={theme}
					openSidebar={openSidebar}
					refetch={refetch}
					setRefetch={setRefetch}
				/>
			) : (
				item && (
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
				)
			)}
		</>
	);
}
