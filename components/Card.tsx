import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Item } from "../pages/index";
import { Box, CardActionArea, IconButton, Stack } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function MediaCard({ item, removeMode, handleDelete }: { item: Item, removeMode: boolean, handleDelete: (id: string) => void }) {
  return (
    <>
      {item ? (
        <Box
          component="div"
          sx={{
            position: "relative",
          }}
        >
          <Card sx={{ maxWidth: 345 }}>
            {removeMode &&
              <IconButton
                onClick={() => handleDelete(item._id)}
                sx={{ position: "absolute", top: -20, right: -20, zIndex: 2 }}
              >
                <RemoveCircleIcon
                />
              </IconButton>}
            <CardActionArea >
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
                  >
                    <Box component='div'>Price: {item.price}</Box>
                    <Box component='div'>Stock: {item.stock}</Box>
                  </Stack>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      ) : null
      }
    </>
  );
}
