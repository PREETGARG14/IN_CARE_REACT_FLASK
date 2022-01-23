import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./usd.css";

const UserDetailCard = ({ userId, setUserID, setPatientId, patientId }) => {
  console.log(patientId);
  const history = useNavigate();
  const handlePrescribe = (e) => {
    e.preventDefault();
    history("/showprescriptions");
  };
  const handleImmunisation = (e) => {
    e.preventDefault();
    history("/showimmunisation");
  };
  const handleProblem = (e) => {
    e.preventDefault();
    history("/showpastproblem");
  };
  return (
    <div>
      <div className="container-fluid py-5 hs">
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
        <div className="py-5"></div>
        <div className="py-5"></div>
      </div>
    </div>
  );
};

export default UserDetailCard;
