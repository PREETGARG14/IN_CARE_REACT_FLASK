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

const ShowPastProblem = ({ patientId }) => {
  const [pastProblems, setPastProblems] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.get(`${url}/api/past/${patientId}`, config).then((res) => {
      setPastProblems(res.data);
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
          <b>Your Past history of Problems </b>
        </h2>
      </Typography>
      {pastProblems.length === 0 ? (
        <Typography
          style={{ backgroundColor: "#40C1AC" }}
          className="mt-5 px-3 py-3"
          textAlign="center"
        >
          <h2>
            <b> No past Problem to show </b>
          </h2>
        </Typography>
      ) : (
        ""
      )}
      {pastProblems.map((v, i) => (
        <Accordion className="my-5" key={v.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ color: "red" }}>
              <b> Problem : {i + 1} </b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <span>
              <b>Problem Name :</b>
            </span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{v.problem}</span>
            <hr />
            <span>
              <b>Body site :</b>
            </span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{v.body_site}</span>
            <hr />
            <span>
              <b>Date of abadement :</b>
            </span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{v.dateTime}</span>
            <hr />
            <span>
              <b>Severity :</b>
            </span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{v.severity}</span>
            <hr />
            <span>
              <b>Last Updated :</b>
            </span>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{v.last_updated}</span>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ShowPastProblem;
