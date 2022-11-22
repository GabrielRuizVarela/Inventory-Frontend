import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Item } from "../pages/index";
import { Box, CardActionArea, Divider, IconButton, Stack } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Router from "next/router";
import { AppContext } from "../pages/_app";
import { AspectRatio } from "@mui/joy";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

export default function MediaCard({
	item,
	maxWidth,
}: { item: Item; maxWidth: number }) {
	const { isRemoveMode, isDetailPage } = useContext(AppContext);
	const handleDelete = (id: string) => {
		// fetch(`http://localhost:5050/items/${id}/delete`, {
		fetch(
			"https://inventory-backend-production.up.railway.app/items/${id}/delete",
			{
				method: "DELETE",
			},
		).then((res) => {
			if (res.status === 200) {
				Router.push("/");
			}
		});
	};
	return (
		<>
			{item ? (
				<Box
					component="div"
					sx={{
						position: "relative",
						"&:hover": {
							transform: "scale(1.05)",
							transition: "transform 0.5s",
						},
					}}
				>
					<Card
						sx={{
							maxWidth: { maxWidth },
						}}
					>
						{isRemoveMode && (
							<IconButton
								onClick={() => handleDelete(item._id)}
								sx={{ position: "absolute", top: -20, right: -20, zIndex: 2 }}
							>
								<RemoveCircleIcon />
							</IconButton>
						)}
						<CardActionArea disabled={isRemoveMode}>
							<CardMedia
								component="img"
								height="140"
								// height="240"
								// minHeight="240"
								// width="140"
								// image="/stock-photo.jpg"
								src={item.img_url}
								alt={item.name}
								sx={{
									objectFit: "contain",
									aspectRatio: "4/3",
									minHeight: "240px",
								}}
							/>
							<Divider />
							<CardContent>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "space-between",
									}}
								>
									<Stack
										spacing={1}
										alignItems='center'
										direction={"row"}
										alignSelf='flex-end'
									>
										<Box component='div'>${item.price}</Box>
										<Box component='div'>Stock: {item.stock}</Box>
									</Stack>
									<Typography
										gutterBottom={true}
										variant="h5"
										component="div"
										// alignSelf="center"
									>
										{item.name}
										<Typography variant="subtitle2" fontSize={"0.5em"}>
											{item.category.name}
										</Typography>
									</Typography>
								</Box>
								<Typography variant="body2" color="text.secondary">
									{item.description}
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Box>
			) : null}
		</>
	);
}
