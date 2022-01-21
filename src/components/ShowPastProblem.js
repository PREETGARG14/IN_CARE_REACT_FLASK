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

const ShowPastProblem = ({ patientId }) => {
  const [pastProblems, setPastProblems] = useState([]);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.get(`http://127.0.0.1:5000/api/past/${patientId}`, config).then(
      (res) => {
        setPastProblems(res.data);
      }
    );
  }, []);

  return (
    <Container>
      <Typography className="mt-5 px-3 py-3" style={{backgroundColor:"#40C1AC"}} textAlign="center">
        <h2><b>Your Past history of Problems </b></h2>
      </Typography>
      {pastProblems.length === 0 ? (
        <Typography style={{backgroundColor:"#40C1AC"}} className="mt-5 px-3 py-3" textAlign="center">
          <h2><b> No past Problem to show </b></h2>
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
            <Typography style={{color:"red"}}><b> Problem : {i + 1} </b></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(v).map((item, index) => {
              return (
                <>
                  <span><b>{item} :</b></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>{v[item]}</span>
                  <hr />
                </>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default ShowPastProblem;
