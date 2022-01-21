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
import './sp.css';

const Showprescriptions = ({ patientId }) => {
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.get(`http://127.0.0.1:5000/api/prescribe/${patientId}`, config).then(
      (res) => {
        setPrescriptionDetails(res.data);
      }
    );
  }, []);

  return (
   
    <Container>
      <Typography  textAlign="center" className="mt-5 px-3 py-3" style={{backgroundColor:"#40C1AC"}}>
        <h2><b>Your Prescription Details </b></h2>
      </Typography>
      {prescriptionDetails.length === 0 ? (
        <Typography textAlign="center" className="mt-5 px-3 py-3" style={{backgroundColor:"#40C1AC"}}>
          <h2><b>No Prescriptions to show </b></h2>
        </Typography>
      ) : (
        ""
      )}
      {prescriptionDetails.map((v, i) => (
        <Accordion className='my-5 accordian' key={v.prescriptionID}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{color:"red"}}><b> Prescription : {i + 1} </b></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(v).map((item, index) => {
              return (
                <>
                  <span><b>{item} :</b></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{v[item]}</span>
                  <hr/>
                </>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  
  );
};

export default Showprescriptions;
