import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import Alert from "@mui/material/Alert";
import { url } from "../utils/url";

import "./ul.css";
const validationSchema = yup.object({
  username: yup.string("Enter your username").required("username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login = ({ setUserDetailStatus, setPatientId, setPatientName }) => {
  const history = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (data) => {
    console.log(data);
    Axios.post(`${url}/api/login`, data)
      .then((res) => {
        if (res.data.status === "successful") {
          setUserDetailStatus(true);
          setPatientId(res.data.id);
          setPatientName(res.data.username);
          sessionStorage.setItem("username", res.data.username);
          sessionStorage.setItem("token", res.data.access_token);
          sessionStorage.setItem("patient_id", res.data.id);
          history("/userdetailcard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="ul">
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
            Log in as a Patient
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="User name"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
            <Link class="signup" href="/signup">
              Don't have an account? SignUp!
            </Link>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
