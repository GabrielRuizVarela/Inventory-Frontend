import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Item } from "../pages/index";
import { Box, CardActionArea, Stack } from "@mui/material";

export default function MediaCard({ item }: { item: Item }) {
	return (
		<>
			{item ? (
				<CardActionArea sx={{ maxWidth: 345 }}>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image="/stock-photo.jpg"
							alt="green iguana"
						/>
						<CardContent>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Typography gutterBottom={true} variant="h5" component="div">
									{item.name}
									<Typography variant="subtitle2">{item.category.name}</Typography>
								</Typography>
								<Stack
									spacing={1}
									sx={
										{
											// display: "flex",
										}
									}
								>
									<Box component='div'>Price: {item.price}</Box>
									<Box component='div'>Stock: {item.stock}</Box>
								</Stack>
							</Box>
							<Typography variant="body2" color="text.secondary">
								{item.description}
							</Typography>
						</CardContent>
					</Card>
				</CardActionArea>
			) : null}
		</>
	);
}
