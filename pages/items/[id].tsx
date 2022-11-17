import React from "react";
import { Category, Item } from "../index";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import SearchBar from "../../components/SearchBar";
import Sidebar from "../../components/Sidebar";
import { Container } from "@mui/system";
import { Paper } from "@mui/material";
import AddItem from "./add";
import Fab from '@mui/material/Fab';

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5050/items/");
  const data = await res.json();

  const paths = data.map((item: Item) => {
    return {
      params: { id: item._id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const res = await fetch(`http://localhost:5050/items/${id}`);
  const data = await res.json();
  const res2 = await fetch("http://localhost:5050/categories/");
  const data2 = await res2.json();

  return {
    props: { item: data, categories: data2 },
  };
};

const ItemCard = ({
  item,
  categories,
  handleEditClick,
}: { item: Item; categories: Category[], handleEditClick: () => void }) => {
  return (
    <Paper elevation={5} sx={{ width: 'min-content', borderRadius: 3 }}>
      <Card variant="outlined" sx={{ width: 600 }}>
        <CardOverflow>
          <AspectRatio ratio="2">
            <img
              src="/stock-photo.jpg"
              // srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
              loading="lazy"
              alt=""
            />
            <Fab variant="extended" aria-label="add" sx={{ position: "absolute", top: 10, right: 10 }}
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
  const [editMode, setEditMode] = React.useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  }
  return (
    <>
      <SearchBar detail={true} setView={() => { }} removeMode={false} />
      <Sidebar categories={[]} handleSidebarClick={() => { }} />
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: 14 }}
      >
        {editMode ?
          <AddItem endpoint={`http://localhost:5050/items/${item._id}/edit`} initialValues={item} categories={categories} />
          :
          <ItemCard item={item} categories={categories} handleEditClick={handleEditClick} />
        }
      </Container>
    </>
  );
}
