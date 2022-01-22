import React, { useState } from "react";
import "../components/home.css";
import "../bootstrap.min.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import { url } from "../utils/url";

const Home = () => {
  const [email, setEmail] = useState();
  const handleClick = (e) => {
    e.preventDefault();
    Axios.post(`${url}/api/schedule`, email).then((res) => {
      alert("mail send ");
    });
  };
  return (
    <div>
      <div className="container-fluid" style={{ backgroundColor: "#E31C79" }}>
        <h5 className="mb-0 py-2 text-white text-center text-content">
          <center>
            Schedule a meet with the doctor! &nbsp;&nbsp;
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />{" "}
            &nbsp;&nbsp;
            <button className="btn btn-warning h-25" onClick={handleClick}>
              {" "}
              Click Me{" "}
            </button>
          </center>
        </h5>
      </div>

      <div
        className="container-fluid px-0"
        style={{ backgroundColor: "#f4f4f4" }}
      >
        <img alt="" src="ghc.png" />
        <img alt="" src="hero.png" className="image" />
        <Link to="/chatbot">
          <input
            type="image"
            src="docchatbot1.jpg"
            border="2px"
            className="AIBot align-bottom"
          />
        </Link>
        <div className="mt-5">
          <center>
            <h2>
              {" "}
              Supercharge your transformation with the Innovaccer Health Cloud.{" "}
            </h2>
            <br />
            <h3 className="fs-24">
              {" "}
              Unify patient data, generate comprehensive clinical and financial
              insights, and innovate faster.{" "}
            </h3>
          </center>
        </div>
      </div>

      <div className="container-fluid bg-white">
        <div className="row">
          <div className="col-md-6 col1">
            <div className="p1">
              We connect and curate <br />
              world's healthcare data <br />
              and make it accessible <br />
              and useful.
            </div>
            <div className="mt-5 p2">
              Customizable analytics and advanced insights help enhance care
              quality, reduce costs, and improve clinical and financial outcomes
              for providers, payers, and patients.
            </div>
          </div>
          <div className="col-md-6">
            <img
              className="section-image th-1 active"
              src="mobile.png"
              alt="th-1"
            />
          </div>
        </div>
      </div>

      <div className="container-fluid" style={{ backgroundColor: "#FFA400" }}>
        <div className="row row2">
          <div className="col-md-4 meet">
            <h1>
              Meet <br />
              Our
              <br />
              Team <br />
            </h1>
          </div>
          <div className="col-md-8 team">
            <div className="imgcol1">
              <img src="preet.png" alt="" className="teamImage" /> &nbsp;&nbsp;
              <img src="gold.jpg" alt="" className="teamImage" /> &nbsp;&nbsp;
              <img src="gold.jpg" alt="" className="teamImage" /> &nbsp;&nbsp;
              <img src="gold.jpg" alt="" className="teamImage" /> <br />
            </div>

            <div className="imgcol2">
              <img src="gold.jpg" alt="" className="teamImage" /> &nbsp;&nbsp;
              <img src="gold.jpg" alt="" className="teamImage" /> &nbsp;&nbsp;
              <img src="gold.jpg" alt="" className="teamImage" /> &nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
