// Form to add a new item
import React, { Children } from "react";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
	// TextField,
} from "@mui/material";

import { Item } from "../../pages/index";
import { Block } from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import Card2 from "../../components/Card";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Select } from "formik-material-ui";
import { Category } from "../../pages/index";
import { Option } from "@mui/joy";

// get categories from server
export const getServerSideProps = async () => {
	const res = await fetch("http://localhost:5050/categories/");
	const data = await res.json();

	return {
		props: { categories: data },
	};
};

export default function AddItem({ categories }: { categories: Category[] }) {
	const router = useRouter();
	// const formik = useFormik({
	// 	initialValues: {
	// 		name: "",
	// 		description: "",
	// 		price: "",
	// 		category: "",
	// 	},
	// 	validationSchema: Yup.object({
	// 		name: Yup.string()
	// 			.max(15, "Must be 15 characters or less")
	// 			.required("Required"),
	// 	}),
	// 	onSubmit: (values, { setSubmitting }) => {
	// 		setTimeout(() => {
	// 			// alert(JSON.stringify(values, null, 2));
	// 			setSubmitting(false);
	// 			// send to server
	// 			fetch("http://localhost:5050/items/create", {
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					CORS: "no-cors",
	// 					"Access-Control-Allow-Origin": "http://localhost:5050",
	// 				},
	// 				body: JSON.stringify(values),
	// 			})
	// 				.then(() => {
	// 					router.push("/");
	// 				})
	// 				.catch((err) => {
	// 					console.log(err);
	// 				});
	// 		}, 400);
	// 	},
	// });

	// const categoriesList = categories.map((category) => category.name);
	const [categoryValue, setCategoryValue] = React.useState(categories[0]._id);
	return (
		<>
			<Sidebar categories={[]} handleSidebarClick={() => {}} />
			<SearchBar setView={() => {}} detail={true} />
			<Container sx={{ marginTop: 12 }}>
				<Grid container={true} spacing={2} sx={{ justifyContent: "center" }}>
					<Grid item={true} xs={12} md={9}>
						<Formik
							enableReinitialize={true}
							initialValues={{
								name: "",
								price: 0,
								stock: 0,
								description: "",
								img_url: "",
								category: categories[0]._id,
								// category: "Choose a category",
							}}
							validationSchema={Yup.object({
								name: Yup.string().required("Required"),
								price: Yup.number().required("Required"),
								stock: Yup.number().required("Required"),
								description: Yup.string().required("Required"),
								img_url: Yup.string().required("Required"),
								category: Yup.string().required("Required"),
							})}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									// alert(JSON.stringify(values, null, 2));
									setSubmitting(false);
									fetch("http://localhost:5050/items/create", {
										method: "POST",
										headers: {
											"Content-Type": "application/json",
											// CORS: "no-cors",
											// "Access-Control-Allow-Origin": "http://localhost:5050",
										},
										body: JSON.stringify(values),
									})
										.then(() => {
											router.push("/");
										})
										.catch((err) => {
											console.log(err);
										});
								}, 400);
							}}
						>
							<Form
								style={{
									display: "grid",
									gridTemplateColumns: "repeat(2, 1fr)",
									gridGap: "1rem",
								}}
							>
								<Field
									component={TextField}
									name="name"
									type="text"
									label="Name"
								/>
								<Field
									component={TextField}
									name="description"
									type="text"
									label="Description"
								/>
								<Field
									component={TextField}
									name="price"
									type="number"
									label="Price"
								/>
								<Field
									component={TextField}
									name="stock"
									type="number"
									label="Stock"
								/>
								<Field
									component={TextField}
									name="img_url"
									type="text"
									label="Image URL"
								/>
								<select
									// component={Select}
									// as="select"
									name="category"
									// label="Category"
									// type="text"
									value={categoryValue}
									onChange={(e) => setCategoryValue(e.target.value)}
									onBlur={(e) => setCategoryValue(e.target.value)}
								>
									{/* <option value="Choose a category" disabled={true}>
										Choose a category
									</option> */}
									{categories.map((category, index) => (
											<option
												// component={"option"}
												// component={MenuItem}
												// as="option"
												key={category._id}
												value={category._id}
												label={category.name}
											/>
									))}
								</select>
								<Button
									type="submit"
									sx={{
										gridColumn: "1 / 3",
										justifySelf: "center",
										alignSelf: "center",
									}}
								>
									Submit
								</Button>
							</Form>
						</Formik>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
