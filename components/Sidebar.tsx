import {
	Drawer,
	Box,
	CssBaseline,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemText,
	styled,
	useTheme,
	Tooltip,
	Button,
	TextField,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../pages/_app";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchBar2 from "./SearchBar";
import { Category, server } from "../pages";
import { Add, RemoveCircleOutline } from "@mui/icons-material";
import Alert from "./Alert";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

let drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}
const StyledAppBar = styled(SearchBar2, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const DrawerList = ({
	listItems,
	isRemoveMode,
	handleDeleteCategory,
}: {
	listItems: Category[] | undefined;
	isRemoveMode: boolean;
	handleDeleteCategory: (id: string) => void;
}) => {
	return (
		<List>
			<Link href={"/"}>
				<ListItem button={true}>
					<ListItemText primary="All" />
				</ListItem>
			</Link>
			{listItems?.map((item, index) => (
				<ListItem
					button={false}
					key={item._id}
					secondaryAction={
						isRemoveMode && (
							<>
								<IconButton
									sx={{ zIndex: 100, padding: 0.1 }}
									onClick={() => handleDeleteCategory(item._id)}
								>
									<RemoveCircleOutline color="warning" />
								</IconButton>
							</>
						)
					}
				>
					<Link href={`/categories/${item._id}`} key={item._id}>
						<ListItemText primary={item.name} />
					</Link>
				</ListItem>
			))}
		</List>
	);
};

const AddForm = ({
	setShowAlert,
	setAlertSeverity,
	setAlertMessage,
	setIsAddCategory,
	setCategories,
	categories,
	refetch,
	setRefetch,
}: {
	setShowAlert: (set: boolean) => void;
	setAlertSeverity: (
		severity: "success" | "error" | "warning" | "info",
	) => void;
	setAlertMessage: (msg: string) => void;
	setIsAddCategory: (set: boolean) => void;
	setCategories: (categories: Category[]) => void;
	categories: Category[] | undefined;
	refetch: boolean;
	setRefetch: (refetch: boolean) => void;
}) => {
	const router = useRouter();
	return (
		<Formik
			enableReinitialize={true}
			initialValues={{
				name: "",
				description: "",
			}}
			validationSchema={Yup.object({
				name: Yup.string()
					.max(15, "Must be 15 characters or less")
					.required("Required")
					.min(3, "Must be 3 characters or more"),
				description: Yup.string()
					.max(20, "Must be 20 characters or less")
					.required("Required"),
			})}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(true);
					fetch(`${server}categories`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: values.name,
							description: values.description,
						}),
					})
						.then((res) => {
							// console.log(res.status);
							if (res.status === 422) {
								console.log("category already exists");
								setShowAlert(true);
								setTimeout(() => {
									setShowAlert(false);
								}, 3000);
								setAlertSeverity("error");
								setAlertMessage("Category not added, category already exists");
							} else {
								if (res.ok) {
									setShowAlert(true);
									setTimeout(() => {
										setShowAlert(false);
									}, 3000);
									setAlertSeverity("success");
									setAlertMessage("Category added successfully");
									setIsAddCategory(false);
									// router.reload();
									setCategories([
										...(categories || []),
										{ ...values, _id: values.name },
									]);
									setRefetch(!refetch);
								}
							}
						})
						.catch((err) => {
							setShowAlert(true);
							setTimeout(() => {
								setShowAlert(false);
							}, 3000);
							setAlertSeverity("error");
							setAlertMessage("Category not added");
						});
				}, 400);
			}}
		>
			{({
				isSubmitting,
				getFieldProps,
				errors,
				handleSubmit,
				handleChange,
				handleBlur,
				values,
			}) => (
				<Form
					onSubmit={handleSubmit}
					style={{
						display: "grid",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<Box sx={{ mt: 4, height: "4rem", flex: 0 }}>
						<TextField
							error={errors.name ? true : false}
							helperText={errors.name}
							FormHelperTextProps={{
								style: { color: "red", fontSize: "0.5em", padding: 0 },
							}}
							label="Name"
							type="text"
							name="name"
							size="small"
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</Box>
					<Box sx={{ height: "4rem", flex: 0 }}>
						<TextField
							error={errors.description ? true : false}
							helperText={errors.description}
							FormHelperTextProps={{
								style: { color: "red", fontSize: "0.5em", padding: 0 },
							}}
							label="Description"
							type="text"
							name="description"
							onChange={handleChange}
							size="small"
							onBlur={handleBlur}
						/>
					</Box>
					<Button
						color="secondary"
						sx={{ width: "100%", justifySelf: "center" }}
						type="submit"
						variant="contained"
					>
						Add
					</Button>
				</Form>
			)}
		</Formik>
	);
};

interface Props {
	categories?: Category[];
}

export default function Sidebar2({ categories }: Props) {
	const theme = useTheme();
	const {
		openSidebar,
		setOpenSidebar,
		openMobileSidebar,
		setOpenMobileSidebar,
		isRemoveMode,
		handleDeleteCategory,
		showAlert,
		setShowAlert,
		alertMessage,
		setAlertMessage,
		alertSeverity,
		setAlertSeverity,
		isAddCategory,
		setIsAddCategory,
		setCategories,
		refetch,
		setRefetch,
	} = useContext(AppContext);

	return (
		<div id="container">
			<Box>
				<CssBaseline />
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
							backgroundColor: theme.palette.main.main,
						},
						display: { xs: "none", md: "block" },
					}}
					variant="persistent"
					anchor="left"
					open={openSidebar}
					onClose={() => setOpenSidebar(false)}
				>
					<DrawerHeader>
						<IconButton
							onClick={() => {
								setOpenSidebar(false);
							}}
						>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<DrawerList
						listItems={categories}
						isRemoveMode={isRemoveMode}
						handleDeleteCategory={handleDeleteCategory}
					/>
					<Divider />
					<Tooltip
						placement="left"
						title={isAddCategory ? "Cancel" : "Add Category"}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row-reverse",
								alignItems: "center",
							}}
						>
							<IconButton
								sx={{ m: 1, p: 1 }}
								onClick={() => setIsAddCategory(!isAddCategory)}
							>
								<Add />
							</IconButton>
						</Box>
					</Tooltip>
					<Divider />
					{isAddCategory && (
						<AddForm
							setShowAlert={setShowAlert}
							setAlertSeverity={setAlertSeverity}
							setAlertMessage={setAlertMessage}
							setIsAddCategory={setIsAddCategory}
							setCategories={setCategories}
							categories={categories}
							refetch={refetch}
							setRefetch={setRefetch}
						/>
					)}
					<Alert
						showAlert={showAlert}
						setShowAlert={setShowAlert}
						severity={alertSeverity}
						msg={alertMessage}
					/>
				</Drawer>
				{/* Mobile Sidebar */}
				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						"& .MuiDrawer-paper": {
							width: drawerWidth,
							boxSizing: "border-box",
							backgroundColor: theme.palette.main.main,
						},
						display: { xs: "block", md: "none" },
					}}
					variant="temporary"
					anchor="left"
					open={openMobileSidebar}
				>
					<DrawerHeader>
						<IconButton onClick={() => setOpenMobileSidebar(false)}>
							{theme.direction === "ltr" ? (
								<ChevronLeftIcon />
							) : (
								<ChevronRightIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
					<DrawerList
						listItems={categories}
						isRemoveMode={isRemoveMode}
						handleDeleteCategory={handleDeleteCategory}
					/>
					<Divider />

					<Tooltip title={isAddCategory ? "Cancel" : "Add Category"}>
						<div
							style={{
								display: "flex",
								flexDirection: "row-reverse",
								alignItems: "center",
							}}
						>
							<IconButton
								sx={{ mr: 1, p: 1, mb: 1 }}
								onClick={() => setIsAddCategory(!isAddCategory)}
							>
								<Add />
							</IconButton>
						</div>
					</Tooltip>
					<Divider />
					{isAddCategory && (
						<AddForm
							setShowAlert={setShowAlert}
							setAlertSeverity={setAlertSeverity}
							setAlertMessage={setAlertMessage}
							setIsAddCategory={setIsAddCategory}
							categories={categories}
							setCategories={setCategories}
							refetch={refetch}
							setRefetch={setRefetch}
						/>
					)}

					<Alert
						showAlert={showAlert}
						setShowAlert={setShowAlert}
						severity={alertSeverity}
						msg={alertMessage}
					/>
				</Drawer>
			</Box>
		</div>
	);
}
