import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchAppBar from "./SearchBar";
import { Category } from "../pages";
import Link from "next/link";
import { Add, ContactPageOutlined, Remove, RemoveCircleOutline, Router } from "@mui/icons-material";
import Alert from "./Alert";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import { Button, FormGroup, TextField, Tooltip } from "@mui/material";
import * as Yup from "yup";
import router from "next/router";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  categories: Category[] | [];
  handleSidebarClick: (category: Category) => void;
  removeMode: boolean;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const { categories: serverCategories } = props;
  const [categories, setCategories] = React.useState<Category[]>([]);
  const { removeMode } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [addCategory, setAddCategory] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [severity, setSeverity] = React.useState<
    "success" | "error" | "info" | "warning"
  >("success");
  const [alertMessage, setAlertMessage] = React.useState("");
  React.useEffect(() => {
    setCategories(serverCategories);
  }, [serverCategories]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddCategoryButton = () => {
    setAddCategory(!addCategory);
  };

  const handleDeleteCategory = (id: string) => {
    fetch(`http://localhost:5050/categories/${id}/delete`, {
      method: "DELETE",
      headers: {
        cors: "no-cors",
      },
    }).then((res) => {
      if (res.ok) {
        setCategories(categories.filter((category) => category._id !== id));
        setShowAlert(true);
        // timeout to hide the alert
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setSeverity("success");
        setAlertMessage("Category deleted successfully");
        router.push("/");
      }
      // if response status is 422, then the item is not deleted
      console.log(res.status);
      if (res.status === 422) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
        setSeverity("error");
        setAlertMessage(
          "Category not deleted, check if there are any items in this category",
        );
      }
    });
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem disablePadding={true}>
          <ListItemButton>
            <ListItemText primary="All" />
          </ListItemButton>
        </ListItem>
        {categories?.map((item, index) => (
          <Box
            key={item._id}
            component='div'
            onClick={() => props.handleSidebarClick(item)}
          >
            <ListItem
              disablePadding={true}
              secondaryAction={
                removeMode && (
                  <>
                    {/* <Button
                      title="Edit"
                      variant="outlined"
                      size="small"
                      color="inherit"
                      onClick={() => handleEditCategoryButton(item._id)}
                    >edit</Button> */}
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
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Box>
        ))
        }
        <Divider />
      </List >
      {serverCategories?.length > 0 && (
        <>
          <Tooltip title={addCategory ? "Cancel" : "Add Category"}>
            <div style={{ display: "flex", flexDirection: 'row-reverse', alignItems: 'center' }}>
              <IconButton
                sx={{ mr: 1, p: 1, mb: 1 }}
                onClick={handleAddCategoryButton}>
                <Add />
              </IconButton>
            </div>
          </Tooltip>
          <Divider />
        </>
      )}
      {
        addCategory && (
          <>
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
                // console.log("submitting")
                setTimeout(() => {
                  setSubmitting(true);
                  // alert(JSON.stringify(values, null, 2));
                  fetch("http://localhost:5050/categories/create", {
                    method: "POST",
                    headers: {
                      cors: "no-cors",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: values.name,
                      description: values.description,
                    }),
                  }).then((res) => {
                    console.log(res.status)
                    if (res.status === 422) {
                      console.log("category already exists")
                      setShowAlert(true);
                      setTimeout(() => {
                        setShowAlert(false);
                      }, 3000);
                      setSeverity("error");
                      setAlertMessage("Category not added, category already exists");
                    } else {
                      if (res.ok) {
                        setShowAlert(true);
                        setTimeout(() => {
                          setShowAlert(false);
                        }, 3000);
                        setSeverity("success");
                        setAlertMessage(
                          "Category added successfully",
                        );
                        setAddCategory(false);
                        setCategories([
                          ...categories,
                          {
                            _id: values.name,
                            name: values.name,
                            description: values.description,
                          },
                        ]);
                      }
                    }
                  })
                    .catch((err) => {
                      setShowAlert(true);
                      setTimeout(() => {
                        setShowAlert(false);
                      }, 3000);
                      setSeverity("error");
                      setAlertMessage("Category not added");
                    })
                }, 400);
              }}
            >
              {({ isSubmitting, getFieldProps, errors, handleSubmit, handleChange, handleBlur, values }) => (
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    display: "grid",
                    // gap: "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Box sx={{ mt: 4, height: "4rem", flex: 0 }}>
                    <TextField
                      error={errors.name ? true : false}
                      helperText={errors.name}
                      FormHelperTextProps={{ style: { color: "red", fontSize: '0.5em', padding: 0 } }}
                      label="Name"
                      type="text"
                      name="name"
                      // variant="filled"
                      size="small"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Box sx={{ height: '4rem', flex: 0 }}>
                    <TextField
                      error={errors.description ? true : false}
                      helperText={errors.description}
                      FormHelperTextProps={{ style: { color: "red", fontSize: '0.5em', padding: 0 } }}
                      label="Description"
                      type="text"
                      name="description"
                      onChange={handleChange}
                      size="small"
                      onBlur={handleBlur}
                    />
                  </Box>
                  <Button
                    // center the button
                    sx={{ width: "25ch" }}
                    type="submit" variant="contained">
                    Add
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )
      }
      {
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          severity={severity}
          msg={alertMessage}
        />
      }
    </div >
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open={true}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
