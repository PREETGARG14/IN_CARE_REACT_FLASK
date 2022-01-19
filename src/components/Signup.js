import React, { useState } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";

const theme = createTheme();

const validationSchema = yup.object({
  username: yup
    .string("Enter your username")
    .min(8, "Password should be of minimum 8 characters length")
    .required("username is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email_address: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
});

export default function SignUp() {
  const history = useNavigate();

  const handleSubmit = (value) => {
    let data = {
      username: value.username,
      password: value.password,
      fullname: value.firstName + " " + value.lastName,
      email_address: value.email_address,
    };
    Axios.post("http://127.0.0.1:5000/api/register2", data)
      .then((res) => {
        history("/login");
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email_address: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  label="UserName"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email_address"
                  label="Email Address"
                  name="email_address"
                  value={formik.values.email_address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.email_address &&
                    Boolean(formik.errors.email_address)
                  }
                  helperText={
                    formik.touched.email_address && formik.errors.email_address
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
