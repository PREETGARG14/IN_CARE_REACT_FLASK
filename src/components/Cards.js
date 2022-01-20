import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import React from "react";

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
    <div style={{ backgroundColor: "lightblue" }}>
      <div className="container-fluid py-5 my-5">
        <div className="d-flex justify-content-center">
          <div className="col-8">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className="col mt-5">
                <div className="card border-warning card-wr-bg">
                  {" "}
                  <img src="1.png" className="card-img-top" alt="..." />
                  <div className="card-body d-grid gap-3">
                    <Button fullWidth onClick={handlePrescribe}>
                      {" "}
                      Prescribe
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
                      Immunisation details
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
                      Problem/Diagnosis
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
