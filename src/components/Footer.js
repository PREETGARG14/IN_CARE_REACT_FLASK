import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './footer.css';
const Footer = () => {
  return (
    <footer id='footer' className="p-2 bg-dark text-white text-center position-relative">
      <div className='container-fluid'>
        <div className="row pt-4">
          <div className="col-md-6 text-start ps-5">
            <div className='mt-2'>
              <img src='inlogo.svg' alt='' style={{ height: "30px" }}></img>
            </div>
            <p className='mt-4' style={{ color: "grey" }}>
              Innovaccer Inc. 2nd and 9th Floor, Tower 3, Candor Techspace,<br />
              Sector 62, Noida, Uttar Pradesh 201309 <br />
            </p>
          </div>

          <div className="col-md-6 pe-5">
            <div className='mt-2'>
              <div className='resources'>
                <h5>
                  Resources
                </h5>
              </div>
              <div className='text-end mt-2  content' style={{ color: "grey" }}>
                <a href='/'>AboutUs</a> &nbsp;&nbsp; &nbsp;&nbsp;
                <a href='https://github.com/PREETGARG14/IN_CARE_REACT_FLASK' target="_blank"> OurTeam </a> &nbsp;&nbsp; &nbsp;&nbsp;
                <a href='/doctorlogin'>Doctor</a>  &nbsp;&nbsp; &nbsp;&nbsp;
                <a href='/login'>Patient</a>
              </div>
            </div>
          </div>

        </div>
      </div>
      <hr />

      <div className="container-fluid belowHr">
        <div className="row pt-4">
          <div className="col-md-6 text-start px-4">
            <p className='mt-2' style={{ color: "grey" }}>
              <span>&nbsp;&nbsp;&nbsp;&nbsp;Copyright &copy; Incare. 2022</span>
            </p>
          </div>

          <div className="col-md-6 text-end px-5" style={{ color: "grey" }}>
            <a href='/'>Privacy Policy</a> &nbsp;&nbsp; &nbsp;&nbsp;
            <a href='/'>Terms of Use </a> &nbsp;&nbsp; &nbsp;&nbsp;
            <a href='/'>Cookies</a>
          </div>

        </div>

      </div>



    </footer>
  )
}

export default Footer