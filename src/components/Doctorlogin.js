import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { url } from "../utils/url";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import './dl.css';

const validationSchema = yup.object({
  email_address: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Doctorlogin = ({ loggedIn, setLoggedIn }) => {
  console.log(loggedIn);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  const handleSubmit = (data) => {
    console.log(data);
    Axios.post(`${url}/api/doctor`, data)
      .then((res) => {
        if (res.data.status === "successful") {
          setLoggedIn(true);
          sessionStorage.setItem("doctorlogin", true);
          sessionStorage.setItem("token", res.data.token);
          history("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email_address: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
  <div className="dl">
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          paddingTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in as a Doctor
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email_address"
              label="Email address"
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
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            {errorMessage !== "" ? (
              <Alert
                onClose={() => setErrorMessage("")}
                variant="filled"
                severity="error"
              >
                {errorMessage}
              </Alert>
            ) : (
              ""
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
    </div>
  );
};

export default Doctorlogin;
