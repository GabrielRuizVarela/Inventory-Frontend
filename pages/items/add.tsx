// Form to add a new item
import React, { Children } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";

import { Item } from "../../pages/index";
import Sidebar from "../../components/Sidebar";
import SearchBar from "../../components/SearchBar";
import { useRouter } from "next/router";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { TextField} from "formik-material-ui";
import { Category } from "../../pages/index";

// get categories from server
export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:5050/categories/");
  const data = await res.json();

  return {
    props: { categories: data },
  };
};

export default function AddItem({ categories, endpoint, initialValues }: { categories: Category[], endpoint: string, initialValues: Item }) {
  const router = useRouter();
  return (
    <>
      {!endpoint &&
        <>
          <Sidebar categories={[]} handleSidebarClick={() => { }} />
          <SearchBar setView={() => { }} detail={true} handleRemoveMode={() => { }} />
        </>
      }
      <Container sx={{ marginTop: 12 }}>
        <Paper sx={{ p: 4 }}>
          <Grid container={true} spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item={true} xs={12} md={9}>
              <Formik
                // enableReinitialize={true}
                initialValues={{
                  name: initialValues?.name || "",
                  price: initialValues?.price || 0,
                  stock: initialValues?.stock || 0,
                  description: initialValues?.description || "",
                  img_url: initialValues?.img_url || "",
                  category: 'Choose a category',
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
                    setSubmitting(false);
                    fetch(endpoint || "http://localhost:5050/items/create", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(values),
                    })
                      .then(() => {
                        router.push("/");
                        console.log(values);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }, 400);
                }}
              >
                {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) => (
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Field
                      component={TextField}
                      name="description"
                      type="text"
                      label="Description"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Field
                      component={TextField}
                      name="img_url"
                      type="text"
                      label="Image URL"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Field
                      component='select'
                      name="category"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <Field
                        component='option'
                        value='Choose a category' disabled={true}>Choose a category</Field>
                      {categories.map((category, index) => (
                        <Field
                          component='option'

                          key={category._id}
                          value={category._id}
                          label={category.name}
                        />
                      ))}
                    </Field>
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
                  </Form>)}
              </Formik>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
