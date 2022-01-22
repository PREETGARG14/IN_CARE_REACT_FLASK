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
      <Typography
        className="mt-5 px-3 py-3"
        style={{ backgroundColor: "#40C1AC" }}
        textAlign="center"
      >
        <h2>
          <b>Your Immunisation Details</b>
        </h2>
      </Typography>
      {immunisationDetails.length === 0 ? (
        <Typography
          className="mt-5 px-3 py-3"
          style={{ backgroundColor: "#40C1AC" }}
          textAlign="center"
        >
          <h2>
            <b>No Immunisation Details to show </b>
          </h2>
        </Typography>
      ) : (
        ""
      )}
      {immunisationDetails.map((v, i) => (
        <Accordion className="my-5" key={v.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ color: "red" }}>
              <b> Immunisation : {i + 1} </b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              <b>Immunisation Item :</b>
            </span>{" "}
            &nbsp;&nbsp;
            <span>{v.immunisation_item}</span>
            <hr />
            <span>
              <b>Route :</b>
            </span>{" "}
            &nbsp;&nbsp;
            <span>{v.route}</span>
            <hr />
            <span>
              <b>Target Site :</b>
            </span>{" "}
            &nbsp;&nbsp;
            <span>{v.target_site}</span>
            <hr />
            <span>
              <b>Sequence No :</b>
            </span>{" "}
            &nbsp;&nbsp;
            <span>{v.sequence_no}</span>
            <hr />
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ShowImmunisation;
