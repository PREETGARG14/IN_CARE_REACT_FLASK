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
import "./sp.css";

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
      <Typography
        textAlign="center"
        className="mt-5 px-3 py-3"
      >
        <h3>
          <b>Your Prescription Details </b>
        </h3>
      </Typography>
      {prescriptionDetails.length === 0 ? (
        <>
          <Typography
            className="mt-5 px-3 py-3"
          >
          <center><img src="no-record.png" alt="" style={{height:"200px"}} /></center>

          </Typography>
          <div className="py-5"></div>
          <div className="py-5"></div>

        </>

      ) : (
        ""
      )}
      {prescriptionDetails.map((v, i) => (
        <Accordion className="my-5 accordian" key={v.prescriptionID}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ color: "red" }}>
              <b> Prescription : {i + 1} </b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PrescriptionDetail initialstate={v} />{" "}
          </AccordionDetails>
        </Accordion>
      ))}
        <div className="py-5"></div>
        <div className="py-5"></div>

    </Container>
    
  );
};

export default Showprescriptions;
