import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Item } from "../pages/index";
import { CardActionArea } from "@mui/material";

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
							<Typography gutterBottom={true} variant="h5" component="div">
								{item.name}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{item.description}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Price: {item.price}</Button>
							<Button size="small">Stock: {item.stock}</Button>
						</CardActions>
					</Card>
				</CardActionArea>
			) : null}
		</>
	);
}
