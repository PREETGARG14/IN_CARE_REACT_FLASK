import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { initialstate } from "../utils/InitialState";
import Axios from "axios";
import { Container } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
//import '../bootstrap.min.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Prescriptions({ userId }) {
  const [details, setDetails] = useState(initialstate);
  const [open, setOpen] = useState(false);

  const handleClick = (e) => {
    const newDetails = { ...details, pi: nanoid() };
    e.preventDefault();
    console.log(details);
    let token = sessionStorage.getItem("token");
    let config = {
      headers: {
        "x-access-token": token,
      },
    };
    Axios.post(
      `http://127.0.0.1:5000/api/doctor/prescribe/${userId}`,
      newDetails,
      config
    ).then((res) => {
      setOpen(true);
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <form>
      <div className="aboveMainheading pt-2">
        <div style={{ paddingTop: "5px" }}>
          <img
            style={{ height: "20px" }}
            alt=""
            src="id.svg"
            className="images"
          />{" "}
          &nbsp;&nbsp;
          <span>Prescription identifier</span> &nbsp;&nbsp;
          <input type="text" name="pi" id="pi" disabled={true} />
        </div>
      </div>
      <hr />
      <div
        className="mainHeading pt-1"
        style={
          ({ fontFamily: "Arial" },
          { fontSize: "14px" },
          { fontWeight: "bold" })
        }
      >
        <div style={{ backgroundColor: "#E0E0E0" }}>
          <img
            style={{ height: "20px" }}
            alt=""
            className="images"
            src="arrow.svg"
          />
          <span> Medication order </span>
          <span style={({ color: "grey" }, { fontWeight: "bold" })}>
            [0..*]
          </span>
        </div>

        <div
          className="innerHeading"
          style={({ paddingTop: "15px" }, { paddingLeft: "15px" })}
        >
          <img
            style={{ height: "20px" }}
            alt=""
            className="images"
            src="aty.svg"
          />
          <span> Order </span>
          <span style={({ color: "grey" }, { fontWeight: "bold" })}>
            [0..*]
          </span>

          <div className="content" style={{ paddingLeft: "15px" }}>
            <div>
              <img
                style={{ height: "20px" }}
                alt=""
                className="images"
                src="item.svg"
              />
              <span> Medication Item</span>{" "}
              <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                [1..1]
              </span>
              &nbsp;&nbsp;
              <input
                type="text"
                id="Medication item"
                name="Medication item"
                onChange={(e) => {
                  setDetails({ ...details, "Medication item": e.target.value });
                }}
              />
            </div>

            <div className="medication">
              <img
                style={{ height: "20px" }}
                alt=""
                className="images"
                src="medication.svg"
              />
              <span>Preparation</span>

              <div
                className="medication-content"
                style={{ paddingLeft: "15px" }}
              >
                <div>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="item.svg"
                  />
                  <span>Substance Name </span> &nbsp;&nbsp;
                  <input
                    type="text"
                    id="Name"
                    name="Name"
                    onChange={(e) => {
                      setDetails({ ...details, Name: e.target.value });
                    }}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="item.svg"
                  />
                  <span> Form </span>{" "}
                  <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                    [0..*]
                  </span>
                  &nbsp;&nbsp;
                  <input
                    type="text"
                    id="Form"
                    name="Form"
                    onChange={(e) => {
                      setDetails({ ...details, Form: e.target.value });
                    }}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="q.svg"
                  />
                  <span> Strength </span> &nbsp;&nbsp;
                  <input
                    type="text"
                    id="strength"
                    name="strength"
                    onChange={(e) => {
                      setDetails({ ...details, strength: e.target.value });
                    }}
                  />
                  &nbsp;&nbsp;
                  <input
                    type="text"
                    id="strengthUnit"
                    name="strengthUnit"
                    placeholder="Unit"
                    onChange={(e) => {
                      setDetails({ ...details, strengthUnit: e.target.value });
                    }}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="medication.svg"
                  />
                  <span> Diluent </span>

                  <div className="diluent-content">
                    <div>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="q.svg"
                        className="images"
                      />
                      <span>Diluent Amount</span>
                      &nbsp;&nbsp;
                      <input
                        type="text"
                        id="numerator"
                        name="numerator"
                        placeholder=">=0"
                        onChange={(e) => {
                          setDetails({ ...details, numerator: e.target.value });
                        }}
                      />
                      &nbsp;&nbsp;
                      <input
                        type="text"
                        id="numeratorUnit"
                        name="numeratorUnit"
                        placeholder="unit"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            numeratorUnit: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="medication.svg"
                    className="images"
                  />
                  <span>Ingredient </span>
                  <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                    [0..*]
                  </span>
                  &nbsp;&nbsp;
                  <div
                    className="ingredient-content"
                    style={{ paddingLeft: "15px" }}
                  >
                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="medication.svg"
                        className="images"
                      />
                      <span>Ingredient substance</span>
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <span> Substance name</span>&nbsp;&nbsp;
                      <input
                        type="text"
                        id="substanceName"
                        name="substanceName"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            substanceName: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <span>Form</span>{" "}
                      <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                        [0..*]
                      </span>
                      &nbsp;&nbsp;
                      <input
                        type="text"
                        id="ingredientForm"
                        name="ingredientForm"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            ingredientForm: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <span>Category</span> &nbsp;&nbsp;
                      <input
                        type="text"
                        id="category"
                        name="category"
                        onChange={(e) => {
                          setDetails({ ...details, category: e.target.value });
                        }}
                      />
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="q.svg"
                        className="images"
                      />
                      <span>Strength</span> &nbsp;&nbsp;
                      <input
                        type="text"
                        id="ingredientstrength"
                        name="ingredientStrength"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            ingredientstrength: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <span>Strength Unit</span> &nbsp;&nbsp;
                      <input
                        type="text"
                        id="strengthUnit"
                        name="ingredientStrengthUnit"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            strengthUnit: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div style={{ paddingTtop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <span>Description</span> &nbsp;&nbsp;
                      <input
                        type="text"
                        id="medicationDescription"
                        name="medicationDescription"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            medicationDescription: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="q.svg"
                  className="images"
                />
                <span>Ingredient Amount</span> &nbsp;&nbsp;
                <input
                  type="text"
                  id="ingredient-amount"
                  name="ingredient-amount"
                  placeholder=">=0"
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      "ingredient-amount": e.target.value,
                    });
                  }}
                />
                &nbsp;&nbsp;
                <input
                  type="text"
                  id="ingredient-amountUnit"
                  name="ingredient-amountUnit"
                  placeholder="Unit"
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      "ingredient-amountUnit": e.target.value,
                    });
                  }}
                />
              </div>

              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="category.svg"
                  className="images"
                />
                <span>Role</span>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="t_n.svg"
                  className="images"
                />
                <select
                  name="roleStatus"
                  id="status"
                  onChange={(e) => {
                    setDetails({ ...details, roleStatus: e.target.value });
                  }}
                >
                  <option value="active">Therauputic</option>
                  <option value="stopped">Electrolyte</option>
                  <option value="neverActive">Toxic</option>
                  <option value="completed">Diluent</option>
                  <option value="completed">Coloring</option>
                  <option value="completed">Influent</option>
                </select>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="t.svg"
                  className="images"
                />
                <input
                  type="text"
                  id="role"
                  name="role"
                  placeholder=">=0"
                  onChange={(e) => {
                    setDetails({ ...details, role: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "5px" }}>
            <img
              style={{ height: "20px" }}
              alt=""
              src="t.svg"
              className="images"
            />
            <span>Description</span> &nbsp;&nbsp;
            <input
              type="text"
              id="description"
              name="description"
              onChange={(e) => {
                setDetails({ ...details, description: e.target.value });
              }}
            />
          </div>
          <br />
        </div>

        <div style={({ paddingTop: "15px" }, { paddingLeft: "15px" })}>
          <img
            style={{ height: "20px" }}
            alt=""
            src="t.svg"
            className="images"
          />
          <span>Route</span>
          <span style={({ color: "grey" }, { fontWeight: "bold" })}>
            [0..*]
          </span>{" "}
          &nbsp;&nbsp;
          <input
            type="text"
            id="route"
            name="route"
            onChange={(e) => {
              setDetails({ ...details, route: e.target.value });
            }}
          />
        </div>
        <br />
        <div style={{ paddingLeft: "15px" }}>
          <img
            style={{ height: "20px" }}
            alt=""
            src="t.svg"
            className="images"
          />
          <span>dosageInstructions</span> &nbsp;&nbsp;
          <input
            type="text"
            id="dosageInstructions"
            name="dosageInstructions"
            onChange={(e) => {
              setDetails({ ...details, dosageInstructions: e.target.value });
            }}
          />
        </div>

        <div style={({ paddingTop: "5px" }, { paddingLeft: "5px" })}>
          <img
            style={{ height: "20px" }}
            alt=""
            src="medication.svg"
            className="images"
          />
          <span>Dose Direction</span>
          <span style={({ color: "grey" }, { fontWeight: "bold" })}>
            [0..*]
          </span>{" "}
          &nbsp;&nbsp;
          <div className="dose-content" style={{ paddingLeft: "15px" }}>
            <div style={{ paddingTop: "5px" }}>
              <img
                style={{ height: "20px" }}
                alt=""
                src="medication.svg"
                className="images"
              />
              <span>Dose Pattern</span>
              <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                [0..*]
              </span>
              &nbsp;&nbsp;
              <div className="dose-content">
                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="category.svg"
                  />
                  <span>Dose amount</span> &nbsp;&nbsp;
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="q.svg"
                  />
                  <input
                    type="text"
                    name="doseAmount"
                    id="doseAmount"
                    placeholder=">=0"
                    onChange={(e) => {
                      setDetails({ ...details, doseAmount: e.target.value });
                    }}
                  />
                  &nbsp;&nbsp;
                  <span>or</span> &nbsp;&nbsp;
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="lower.svg"
                  />
                  <span>Lower:</span>
                  <input
                    type="text"
                    name="doseAmountLower"
                    id="doseAmountLower"
                    placeholder=">=0"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        doseAmountLower: e.target.value,
                      });
                    }}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span>Upper:</span>&nbsp;&nbsp;
                  <input
                    type="text"
                    name="doseAmountUpper"
                    id="doseAmountUpper"
                    placeholder=">=0"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        doseAmountUpper: e.target.value,
                      });
                    }}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="t.svg"
                  />
                  <span>Dose Unit</span> &nbsp;&nbsp;
                  <input
                    type="text"
                    name="doseUnit"
                    id="doseUnit"
                    onChange={(e) => {
                      setDetails({ ...details, doseUnit: e.target.value });
                    }}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    className="images"
                    src="medication.svg"
                  />
                  <span>Dose timimg</span> &nbsp;&nbsp;
                  <div className="dose-content" style={{ paddingLeft: "15px" }}>
                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        className="images"
                        src="category.svg"
                      />
                      <span>frequency</span> &nbsp;&nbsp;
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        className="images"
                        src="q.svg"
                      />
                      <input
                        type="text"
                        name="frequency"
                        id="frequency"
                        placeholder="0..1 >=0 >=0 >=0"
                        onChange={(e) => {
                          setDetails({ ...details, frequency: e.target.value });
                        }}
                      />
                      &nbsp;&nbsp;
                      <select
                        name="frequencyUnit"
                        id="status"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            frequencyUnit: e.target.value,
                          });
                        }}
                      >
                        <option value="active">1/d</option>
                        <option value="stopped">1/min</option>
                        <option value="neverActive">1/hr</option>
                        <option value="completed">1/s</option>
                      </select>
                      &nbsp;&nbsp;
                      <span>or</span> &nbsp;&nbsp;
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        className="images"
                        src="lower.svg"
                      />
                      <span>Lower:</span>
                      <input
                        type="text"
                        name="frequencyLower"
                        id="frequencyLower"
                        placeholder="0..1 >=0 >=0 >=0"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            frequencyLower: e.target.value,
                          });
                        }}
                      />
                      &nbsp;&nbsp;
                      <select
                        name="frequencyLowerUnit"
                        id="status"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            frequencyLowerUnit: e.target.value,
                          });
                        }}
                      >
                        <option value="active">1/d</option>
                        <option value="stopped">1/min</option>
                        <option value="neverActive">1/hr</option>
                        <option value="completed">1/s</option>
                      </select>
                      &nbsp;&nbsp;
                      <span>Upper:</span>
                      <input
                        type="text"
                        name="frequencyUpper"
                        id="frequencyUpper"
                        placeholder="0..1 >=0 >=0 >=0"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            frequencyUpper: e.target.value,
                          });
                        }}
                      />
                      &nbsp;&nbsp;
                      <select
                        name="frequencyUpperUnit"
                        id="status"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            frequencyUpperUnit: e.target.value,
                          });
                        }}
                      >
                        <option value="active">1/d</option>
                        <option value="stopped">1/min</option>
                        <option value="neverActive">1/hr</option>
                        <option value="completed">1/s</option>
                      </select>
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        className="images"
                        src="hourglass.svg"
                      />
                      <span>Interval</span> &nbsp;&nbsp;
                      <input
                        type="text"
                        name="interval"
                        id="interval"
                        onChange={(e) => {
                          setDetails({ ...details, interval: e.target.value });
                        }}
                      />
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="category.svg"
                        className="images"
                      />
                      <span>Specific Time</span>
                      <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                        [0..*]
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="clock.svg"
                        className="images"
                      />
                      <input
                        type="time"
                        name="st"
                        id="st"
                        onChange={(e) => {
                          setDetails({ ...details, st: e.target.value });
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <span> or </span> &nbsp;&nbsp;
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="lower.svg"
                        className="images"
                      />
                      <span> Lower: Upper:</span>
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="category.svg"
                        className="images"
                      />
                      <span>Named Time Event</span>
                      <span style={{ color: "#C0C0C0" }}>[0..*]</span>{" "}
                      &nbsp;&nbsp;
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <input
                        type="text"
                        name="nte"
                        id="nte"
                        onChange={(e) => {
                          setDetails({ ...details, nte: e.target.value });
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                      <span>or</span>&nbsp;&nbsp;&nbsp;&nbsp;
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t_n.svg"
                        className="images"
                      />
                      <select
                        name="nte2"
                        id="status"
                        onChange={(e) => {
                          setDetails({ ...details, nte2: e.target.value });
                        }}
                      >
                        <option value="active">immediately</option>
                        <option value="stopped">in the morning</option>
                        <option value="neverActive">at night</option>
                        <option value="completed">
                          in the morning/at night
                        </option>
                      </select>
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="tick.svg"
                        className="images"
                      />
                      <span>Exact Time Critical</span> &nbsp;&nbsp;
                      <input
                        style={{ height: "15px" }}
                        type="checkbox"
                        name="timeCritical"
                        id="timeCritical"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            timeCritical: e.target.value,
                          });
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="tick.svg"
                        className="images"
                      />
                      <span>As required</span> &nbsp;&nbsp;
                      <input
                        style={{ height: "15px" }}
                        type="checkbox"
                        name="asRequired"
                        id="asRequired"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            asRequired: e.target.value,
                          });
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                    </div>

                    <div style={{ paddingTop: "5px" }}>
                      <img
                        style={{ height: "20px" }}
                        alt=""
                        src="t.svg"
                        className="images"
                      />
                      <span>As required criterion</span> &nbsp;&nbsp;
                      <input
                        type="text"
                        name="requiredCriterion"
                        id="requiredCriterion"
                        onChange={(e) => {
                          setDetails({
                            ...details,
                            requiredcriterion: e.target.value,
                          });
                        }}
                      />{" "}
                      &nbsp;&nbsp;
                    </div>
                  </div>
                  <div style={({ paddingLeft: "15px" }, { paddingTop: "5px" })}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="category.svg"
                    />
                    <span>Infusion administration rate</span> &nbsp;&nbsp;
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      src="q.svg"
                      className="images"
                    />
                    <input
                      type="text"
                      name="iar"
                      id="iar"
                      placeholder="0..1 >=0 >=0 >=0"
                      onChange={(e) => {
                        setDetails({ ...details, iar: e.target.value });
                      }}
                    />
                    &nbsp;&nbsp;
                    <select
                      name="iarUnit"
                      id="status"
                      onChange={(e) => {
                        setDetails({ ...details, iarUnit: e.target.value });
                      }}
                    >
                      <option value="active">1/d</option>
                      <option value="stopped">1/min</option>
                      <option value="neverActive">1/hr</option>
                      <option value="completed">1/s</option>
                    </select>{" "}
                    &nbsp;&nbsp;
                    <span>or</span> &nbsp;&nbsp;
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="t.svg"
                    />
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      name="iar1"
                      id="iar1"
                      onChange={(e) => {
                        setDetails({ ...details, iar1: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="hourglass.svg"
                    />
                    <span>Dose administration duration</span> &nbsp;&nbsp;
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="t.svg"
                    />
                    <input
                      type="text"
                      name="administration"
                      id="administration"
                      placeholder=">=PT0H  D H M S"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          administration: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  className="images"
                  src="category.svg"
                />
                <span>Direction duration</span> &nbsp;&nbsp;
                <img
                  style={{ height: "20px" }}
                  alt=""
                  className="images"
                  src="t.svg"
                />
                <select
                  name="directionDuration"
                  id=" status"
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      directionDuration: e.target.value,
                    });
                  }}
                >
                  <option value="active">Indefinate</option>
                  <option value="stopped">Indefinate does not continue</option>
                </select>{" "}
                &nbsp;&nbsp;
                <span>or</span> &nbsp;&nbsp;
                <img
                  style={{ height: "20px" }}
                  alt=""
                  className="images"
                  src="hourglass.svg"
                />
                <input
                  type="text"
                  name="directionDuration2"
                  id="directionDuration"
                  placeholder=">=PT0S"
                  onChange={(e) => {
                    setDetails({
                      ...details,
                      directionDuration2: e.target.value,
                    });
                  }}
                />
              </div>
              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  className="images"
                  src="medication.svg"
                />
                <span>Direction repetition</span> &nbsp;&nbsp;
                <div
                  className="direction-repetition-content"
                  style={{ paddingLeft: "15px" }}
                >
                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="hourglass.svg"
                    />
                    <span>Repitition Interval</span> &nbsp;&nbsp;
                    <input
                      type="text"
                      name="repetitionInterval"
                      id="repetitionInterval"
                      placeholder=">=POW   Y M W D"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          repetitionInterval: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="clipboard.svg"
                    />
                    <span>Specific date</span> &nbsp;&nbsp;
                    <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                      {" "}
                      [0..*]
                    </span>
                    &nbsp;&nbsp;
                    <input
                      type="date"
                      name="specificDate"
                      id="specificDate"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          specificDate: e.target.value,
                        });
                      }}
                    />
                    &nbsp;&nbsp;
                    <input
                      type="time"
                      name="specficTime"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          specificTime: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="one.svg"
                    />
                    <span>Specific day of week</span>
                    <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                      {" "}
                      [0..*]
                    </span>{" "}
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      name="specificDayofweek"
                      id="specificDayofweek"
                      placeholder="0..6"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          specificDayofweek: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="one.svg"
                    />
                    <span>Specific day of month</span>
                    <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                      [0..*]
                    </span>
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      name="specificDayofmonth"
                      id="specificDayofweek"
                      placeholder="1..31"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          specificdayofmonth: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      className="images"
                      src="medication.svg"
                    />
                    <span>Specific Event</span> &nbsp;&nbsp;
                    <div className="specific-event-content">
                      <div style={{ paddingTop: "5px" }}>
                        <img
                          style={{ height: "20px" }}
                          alt=""
                          className="images"
                          src="t.svg"
                        />
                        <span>Event Name</span>&nbsp;&nbsp;
                        <input
                          type="text"
                          name="eventName"
                          id="eventName"
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              eventName: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div style={{ paddingTop: "5px" }}>
                        <img
                          style={{ height: "20px" }}
                          alt=""
                          className="images"
                          src="hourglass.svg"
                        />
                        <span>Start Interval</span> &nbsp;&nbsp;
                        <input
                          type="text"
                          name="eventStartInterval"
                          id="specificDayofweek"
                          placeholder="Y M W D"
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              eventStartInterval: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: "15px" }}>
            <img
              style={{ height: "20px" }}
              alt=""
              src="medication.svg"
              className="images"
            />
            <span>Medication safety</span>

            <div
              className="medication-safety-content"
              style={{ paddingLeft: "15px" }}
            >
              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="medication.svg"
                  className="images"
                />
                <span>maxDosePerPeriod</span>

                <div className="medication-safety-content">
                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      src="q.svg"
                      className="images"
                    />
                    <span>Maximum Amount</span>&nbsp;&nbsp;
                    <input
                      type="text"
                      id="maximumAmount"
                      name="maximumAmount"
                      placeholder=">=0"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          maximumAmount: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      src="q.svg"
                      className="images"
                    />
                    <span>Maximum Amount dose unit</span>&nbsp;&nbsp;
                    <input
                      type="text"
                      id="maximumAmountDoseUnit"
                      name="maximumAmountDoseUnit"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          maximumAmountDoseUnit: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      src="hourglass.svg"
                      className="images"
                    />
                    <span>Allowed Period</span> &nbsp;&nbsp;
                    <input
                      type="text"
                      id="allowedPeriod"
                      name="allowedPeriod"
                      placeholder=">=PTOS"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          allowedPeriod: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="t.svg"
                    className="images"
                  />
                  <span>Override reason</span> &nbsp;&nbsp;
                  <input
                    type="text"
                    id="overrideReason"
                    name="overrideReason"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        overrideReason: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "5px" }}>
              <img
                style={{ height: "20px" }}
                alt=""
                src="t.svg"
                className="images"
              />
              <span>additional Instructions</span> &nbsp;&nbsp;
              <input
                type="text"
                id="additionalInstructions"
                name="additionalInstructions"
                onChange={(e) => {
                  setDetails({
                    ...details,
                    additionalInstructions: e.target.value,
                  });
                }}
              />
            </div>

            <div style={{ paddingTop: "5px" }}>
              <img
                style={{ height: "20px" }}
                alt=""
                src="t.svg"
                className="images"
              />
              <span>reason</span> &nbsp;&nbsp;
              <input
                type="text"
                id="reason"
                name="reason"
                onChange={(e) => {
                  setDetails({ ...details, reason: e.target.value });
                }}
              />
            </div>

            <div>
              <img
                style={{ height: "20px" }}
                alt=""
                src="medication.svg"
                className="images"
              />
              <span>Order Details</span> &nbsp;&nbsp;
              <div
                className="order-details-content"
                style={{ paddingLeft: "15px" }}
              >
                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="medication.svg"
                    className="images"
                  />
                  <span>Course Summary</span>&nbsp;&nbsp;
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="t.svg"
                    className="images"
                  />
                  <label for="status">Status</label> &nbsp;&nbsp;
                  <select name="status" id="status">
                    <option value="active">Active</option>
                    <option value="stopped">Stopped</option>
                    <option value="neverActive">Never Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="clipboard.svg"
                    className="images"
                  />
                  <span>Date Discontinued</span> &nbsp;&nbsp;
                  <input
                    type="date"
                    id="dateDiscontinued"
                    name="dateDiscontinued"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        dateDiscontinued: e.target.value,
                      });
                    }}
                  />
                  &nbsp;&nbsp;
                  <input
                    type="time"
                    id="timeDiscontinued"
                    name="timeDiscontinued"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        timeDiscontinued: e.target.value,
                      });
                    }}
                  />
                  &nbsp;&nbsp;
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="clipboard.svg"
                    className="images"
                  />
                  <span>Date Written</span> &nbsp;&nbsp;
                  <input
                    type="date"
                    id="dateWritten"
                    name="dateWritten"
                    onChange={(e) => {
                      setDetails({ ...details, dateWritten: e.target.value });
                    }}
                  />
                  &nbsp;&nbsp;
                  <input
                    type="time"
                    id="timeWritten"
                    name="timeWritten"
                    onChange={(e) => {
                      setDetails({ ...details, timeWritten: e.target.value });
                    }}
                  />
                  &nbsp;&nbsp;
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "5px" }}>
              <img
                style={{ height: "20px" }}
                alt=""
                src="medication.svg"
                className="images"
              />
              <span>Authorization Details</span> &nbsp;&nbsp;
              <div
                className="authorization-details-content"
                style={{ paddingLeft: "15px" }}
              >
                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="one.svg"
                    className="images"
                  />
                  <span>numberOfRepeatsAllowed</span>&nbsp;&nbsp;
                  <input
                    type="text"
                    name="nora"
                    id="nora"
                    placeholder=">=0"
                    onChange={(e) => {
                      setDetails({ ...details, nora: e.target.value });
                    }}
                  />
                </div>

                <div style={{ paddingTop: "5px" }}>
                  <img
                    style={{ height: "20px" }}
                    alt=""
                    src="clipboard.svg"
                    className="images"
                  />
                  <span>validityPeriod</span> &nbsp;&nbsp;
                  <input
                    type="date"
                    id="validityPeriod"
                    name="validityPeriod"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        validityPeriod: e.target.value,
                      });
                    }}
                  />
                  &nbsp;&nbsp;
                  <input
                    type="time"
                    id="validityPeriodTime"
                    name="validityPeriod"
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        validityPeriodTime: e.target.value,
                      });
                    }}
                  />
                  &nbsp;&nbsp;
                </div>
              </div>
              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="medication.svg"
                  className="images"
                />
                <span>Dispense Directions</span> &nbsp;&nbsp;
                <div
                  className="dispense-directions-content"
                  style={{ paddingLeft: "15px" }}
                >
                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      src="t.svg"
                      className="images"
                    />
                    <span>Dispense Instructions</span>
                    <span style={({ color: "grey" }, { fontWeight: "bold" })}>
                      {" "}
                      [0..*]
                    </span>{" "}
                    &nbsp;&nbsp;
                    <input
                      type="text"
                      name="dispenseInstructions"
                      id="dispenseInstructions"
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          dispenseInstructions: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div style={{ paddingTop: "5px" }}>
                    <img
                      style={{ height: "20px" }}
                      alt=""
                      src="medication.svg"
                      className="images"
                    />
                    <span>Dispense Amount</span>

                    <div className="dispense-directions-content">
                      <div style={{ paddingTop: "5px" }}>
                        <img
                          style={{ height: "20px" }}
                          alt=""
                          src="t.svg"
                          className="images"
                        />
                        <span>Amount Description</span>&nbsp;&nbsp;
                        <input
                          type="text"
                          name="amountDescription"
                          id="amountDescription"
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              amountDescription: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div style={{ paddingTop: "5px" }}>
                        <img
                          style={{ height: "20px" }}
                          alt=""
                          src="q.svg"
                          className="images"
                        />
                        <span>Amount</span> &nbsp;&nbsp;
                        <input
                          type="text"
                          name="amountindispense"
                          id="amountindispense"
                          placeholder=">=0"
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              amountindispense: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div style={{ paddingTop: "5px" }}>
                        <img
                          style={{ height: "20px" }}
                          alt=""
                          src="t.svg"
                          className="images"
                        />
                        <span>Units</span> &nbsp;&nbsp;
                        <input
                          type="text"
                          name="dispenseUnits"
                          id="dispenseInstructions"
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              dispenseUnits: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div style={{ paddingTop: "5px" }}>
                        <img
                          style={{ height: "20px" }}
                          alt=""
                          src="hourglass.svg"
                          className="images"
                        />
                        <span>Duration of Supply</span> &nbsp;&nbsp;
                        <input
                          type="text"
                          name="dos"
                          id="dos"
                          placeholder=">=POD  Y M W D S"
                          onChange={(e) => {
                            setDetails({ ...details, dos: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="t.svg"
                  className="images"
                />
                <span>Comment</span> &nbsp;&nbsp;
                <input
                  type="text"
                  name="comment"
                  id="comment"
                  onChange={(e) => {
                    setDetails({ ...details, comment: e.target.value });
                  }}
                />
              </div>
              <div style={{ paddingTop: "5px" }}>
                <img
                  style={{ height: "20px" }}
                  alt=""
                  src="id.svg"
                  className="images"
                />
                <span>identifier</span> &nbsp;&nbsp;
                <input
                  type="text"
                  name="identifier"
                  id="identifier"
                  onChange={(e) => {
                    setDetails({ ...details, identifier: e.target.value });
                  }}
                />
              </div>
              <hr />
              <div className="Button">
                <center>
                  <Button
                    type="button"
                    className="btn btn-dark mt-4 mb-4"
                    onClick={handleClick}
                  >
                    Submit
                  </Button>
                </center>
              </div>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  submitted
                </Alert>
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
