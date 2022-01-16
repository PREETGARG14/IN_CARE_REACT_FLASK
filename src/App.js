import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react'
function App() {
  return (
    <>
      <nav className="navbar scrolling-active navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/"><img src="svg.svg" alt="" style={{ height: "25px" }} />InCare</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mx-4 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">Our Team</a>
              </li>
            </ul>
            <ul className="navbar-nav justify-content-end mx-5">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Doctor</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">User</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid bg-dark">
        <h5 className="mb-0 py-2 text-white text-center text-content">
          Schedule a meet with the doctor! &nbsp;&nbsp;
          <button className="btn btn-success h-25"> Click Me </button>
        </h5>
      </div>

      <div className="container-fluid px-0" style={{ backgroundColor: "#f4f4f4" }}>
        <img alt='' src="ghc.png" />
        <img alt='' src="hero.png" className="image" />
        <div className="mt-5">
          <center>
            <h2> Supercharge your transformation with the Innovaccer Health Cloud. </h2>
            <br />
            <h3 className="fs-24"> Unify patient data, generate comprehensive clinical and financial
              insights, and innovate faster. </h3>
          </center>
        </div>
      </div>

      <div className="container-fluid bg-white">
        <div className="row">
          <div className="col-md-6 col1">
            <div className="p1">
              We connect and curate the world's healthcare data <br />and make it accessible <br />and useful.
            </div>
            <div className="mt-5 p2" >
              Customizable analytics and advanced insights help enhance care quality, reduce costs, and improve clinical and financial outcomes for providers, payers, and patients.
            </div>
          </div>
          <div className="col-md-6">
            <img className="section-image th-1 active" src="mobile.png" alt="th-1" />
          </div>
        </div>
      </div>

      <footer className="py-3 footer">

        <div className="copyright">
          <center>&copy; Incare Inc. 2022. All rights reserved.</center>
        </div>

      </footer>

    </>
  );
}

export default App;
