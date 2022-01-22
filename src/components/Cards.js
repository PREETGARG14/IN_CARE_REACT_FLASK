import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./usd.css";
import img from "./pres.jpg";

const Cards = ({ userId, setUserID }) => {
  console.log(userId);
  const history = useNavigate();
  const handlePrescribe = (e) => {
    e.preventDefault();
    history("/presciption");
  };
  const handleImmunisation = (e) => {
    e.preventDefault();
    history("/immunisation");
  };
  const handleProblem = (e) => {
    e.preventDefault();
    history("/diagnosis");
  };
  return (
    <div style={{ backgroundImage: "url(/1.png)" }}>
      <div className="container-fluid py-5">
        <div className="text-center">
          <h1>Welcome!</h1>
        </div>
        <div className="d-flex justify-content-center ps-5">
          <div className="col-8 pt-5">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col mt-5">
                <div className="card border-warning card-wr-bg">
                  {" "}
                  <img src="1.png" className="card-img-top" alt="..." />
                  <div className="card-body d-grid gap-3">
                    <Button fullWidth onClick={handlePrescribe}>
                      {" "}
                      <h6> Prescription Details </h6>
                    </Button>
                  </div>
                  <div className="card-footer text-light bg-warning"></div>
                </div>
              </div>
              <div className="col mt-5">
                <div className="card border-success card-s-bg ">
                  {" "}
                  <img src="1.png" className="card-img-top" alt="..." />
                  <div className="card-body d-grid gap-3">
                    <Button fullWidth onClick={handleImmunisation}>
                      {" "}
                      <h6> Immunisation details </h6>
                    </Button>
                  </div>
                  <div className="card-footer bg-success text-light"></div>
                </div>
              </div>
              <div className="col mt-5">
                <div className="card border-danger card-d-bg">
                  {" "}
                  <img src="1.png" className="card-img-top" alt="..." />
                  <div className="card-body d-grid gap-3">
                    <Button fullWidth onClick={handleProblem}>
                      {" "}
                      <h6> Diagnosis Details </h6>
                    </Button>
                  </div>
                  <div className="card-footer bg-danger text-light"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
