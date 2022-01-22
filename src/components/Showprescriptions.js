import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Axios from "axios";
import { url } from "../utils/url";
import PrescriptionDetail from "./PrescriptionDetail";
const Showprescriptions = ({ patientId }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.get(`${url}/api/prescribe/${patientId}`, config).then((res) => {
      setPrescriptionDetails(res.data);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h3" textAlign="center">
        Your Prescription Details
      </Typography>
      {prescriptionDetails.length === 0 ? (
        <Typography variant="h2" textAlign="center">
          No Prescriptions to show
        </Typography>
      ) : (
        ""
      )}
      {prescriptionDetails.map((v, i) => (
        <Accordion key={v.prescriptionID}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Prescription : {i + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PrescriptionDetail initialstate={v} />{" "}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default Showprescriptions;
