import React, { useState } from "react";
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router";
import { url } from "../utils/url";
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
  problem: yup.string().required("Enter Problem Name"),
  body_site: yup.string().required("Enter body site"),
  severity: yup.string().required("select severity"),
});

const Diagnosis = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const history = useNavigate();
  const handleSubmit = (data) => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.post(`${url}/api/doctor/past/${userId}`, data, config)
      .then((res) => {
        setOpen(true);
        history("/dashboard");
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
      problem: "",
      body_site: "",
      severity: "",
      dateTime: "",
      last_updated: "",
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
          Past Problem / Diagnosis
        </Typography>
        <Box sx={{ mt: 1, flexDirection: "row" }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="problem"
              label="Problem/Diagnosis Name"
              name="problem"
              value={formik.values.problem}
              onChange={formik.handleChange}
              error={formik.touched.problem && Boolean(formik.errors.problem)}
              helperText={formik.touched.problem && formik.errors.problem}
            />
            <TextField
              margin="normal"
              fullWidth
              id="body_site"
              label="Body site"
              name="body_site"
              value={formik.values.body_site}
              onChange={formik.handleChange}
              error={
                formik.touched.body_site && Boolean(formik.errors.body_site)
              }
              helperText={formik.touched.body_site && formik.errors.body_site}
            />
            <TextField
              id="dateTime"
              label="Date/time of abatement"
              type="datetime-local"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.dateTime}
              onChange={formik.handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Severity</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="severity"
                label="severity"
                name="severity"
                value={formik.values.severity}
                onChange={formik.handleChange}
                error={
                  formik.touched.severity && Boolean(formik.errors.severity)
                }
                helperText={formik.touched.severity && formik.errors.severity}
              >
                <MenuItem value="mild">mild</MenuItem>
                <MenuItem value="moderate">moderate</MenuItem>
                <MenuItem value="severe">Severe</MenuItem>
              </Select>
              <TextField
                id="last_updated"
                label="Last updated"
                type="datetime-local"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.last_updated}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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

export default Diagnosis;
