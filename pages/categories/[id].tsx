import React, { useContext } from "react";
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

// fetch from serverside
export async function getServerSideProps(context: any) {
	const id = context.params.id;
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items`);
	// const res = await fetch(
	//   "https://inventory-backend-production.up.railway.app/items/",
	// );
	const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
	// const res2 = await fetch(
	// 	"https://inventory-backend-production.up.railway.app/categories/",
	// );
	const data = await res.json();
	const data2 = await res2.json();
	return {
		props: {
			serverItems: data.filter((item: any) => item.category._id === id),
			serverCategories: data2.filter((item: any) => item._id === id),
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
	const { view, isRemoveMode, openSidebar } = useContext(AppContext);
	const theme = useTheme();
	return (
		<>
			<Head>
				<title>Inventory</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SearchBar2 />
			<Sidebar2 categories={serverCategories} />
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
							{serverItems?.map((item) => (
								<Grid2
									xs={"auto"}
									key={item._id}
									sx={{
										display: "flex",
										// alignItems: "center",
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
						<Container sx={{ marginTop: 12 }}>
							{/* <Table
							items={items || []}
							removeMode={removeMode}
							handleDelete={handleDelete}
						/> */}
						</Container>
					)}
				</StyledBox>
			</main>
			{/* </Box> */}
		</>
	);
}
