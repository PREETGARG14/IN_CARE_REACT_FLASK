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

const ShowImmunisation = ({ patientId }) => {
  const [immunisationDetails, setImmunisationDetails] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.get(`${url}/api/immunisation/${patientId}`, config).then((res) => {
      setImmunisationDetails(res.data);
    });
  }, []);

  return (
    <Container>
      <Typography variant="h3" textAlign="center">
        Your Immunisation Details
      </Typography>
      {immunisationDetails.length === 0 ? (
        <Typography variant="h2" textAlign="center">
          No Immunisation Details to show
        </Typography>
      ) : (
        ""
      )}
      {immunisationDetails.map((v, i) => (
        <Accordion key={v.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography> Immunisation : {i + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(v).map((item, index) => {
              return (
                <Typography>
                  {item} : {v[item]}
                </Typography>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ShowImmunisation;
