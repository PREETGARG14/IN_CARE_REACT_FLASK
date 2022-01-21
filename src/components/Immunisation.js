import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Avatar, Typography, TextField, Grid, Button } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import Axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import * as yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const validationSchema = yup.object({
  immunisation_item: yup.string().required("Enter Immunisation Item"),
  route: yup.string().required("Enter route"),
  target_site: yup.string().required("Enter target site"),
  sequence_no: yup.number().required("Enter sequence no."),
});

const Immunisation = ({ userId }) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.post(
      `http://127.0.0.1:5000/api/doctor/immunisation/${userId}`,
      data,
      config
    )
      .then((res) => {
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      immunisation_item: "",
      route: "",
      target_site: "",
      sequence_no: "",
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
          <LocalHospitalIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Immunisation Statement
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Immunisation item"
              id="immunisation_item"
              name="immunisation_item"
              value={formik.values.immunisation_item}
              onChange={formik.handleChange}
              error={
                formik.touched.immunisation_item &&
                Boolean(formik.errors.immunisation_item)
              }
              helperText={
                formik.touched.immunisation_item &&
                formik.errors.immunisation_item
              }
            />
            <TextField
              margin="normal"
              fullWidth
              id="route"
              name="route"
              label="Route"
              value={formik.values.route}
              onChange={formik.handleChange}
              error={formik.touched.route && Boolean(formik.errors.route)}
              helperText={formik.touched.route && formik.errors.route}
            />
            <TextField
              margin="normal"
              fullWidth
              id="target_site"
              label="Target site"
              name="target_site"
              value={formik.values.target_site}
              onChange={formik.handleChange}
              error={
                formik.touched.target_site && Boolean(formik.errors.target_site)
              }
              helperText={
                formik.touched.target_site && formik.errors.target_site
              }
            />
            <TextField
              margin="normal"
              type="number"
              fullWidth
              id="sequence_no"
              label="Sequence number"
              name="sequence_no"
              value={formik.values.sequence_no}
              onChange={formik.handleChange}
              error={
                formik.touched.sequence_no && Boolean(formik.errors.sequence_no)
              }
              helperText={
                formik.touched.sequence_no && formik.errors.sequence_no
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Prescribe
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                submitted
              </Alert>
            </Snackbar>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Immunisation;
