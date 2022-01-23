import React from "react";
import { useNavigate } from "react-router";
import { Navbar, Nav, Container, LinkContainer } from "react-bootstrap";

const Header = ({
  loggedIn,
  setLoggedIn,
  userDetailStatus,
  setUserDetailStatus,
}) => {
  const history = useNavigate();
  const handlelogout = () => {
    setLoggedIn(false);
    setUserDetailStatus(false);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("patient_id");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("doctorlogin");
    sessionStorage.removeItem("username");
    history("/");
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container style={{ fontWeight: "bold" }}>
          <Navbar.Brand href="/">
            <img src="svg.svg" style={{ height: "25px" }} alt="" />
            InCare
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#aboutus">
                <i className="fas fa-shopping-cart"></i> About Us
              </Nav.Link>
              <Nav.Link
                href="https://github.com/PREETGARG14/IN_CARE_REACT_FLASK"
                target="_blank"
              >
                <i className="fas fa-shopping-cart"></i>Star Us on Github
              </Nav.Link>
              <Nav.Link href="#footer">
                <i className="fas fa-shopping-cart"></i> Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {loggedIn === false && userDetailStatus === false ? (
              <Nav className="ml-auto">
                <Nav.Link href="/doctorlogin">
                  <i className="fas fa-shopping-cart"></i> Doctors
                </Nav.Link>
                <Nav.Link href="/login ">
                  <i className="fas fa-shopping-cart"></i> Patients
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link href={loggedIn ? "/dashboard" : "/userdetailcard"}>
                  <i className="fas fa-sign-out-alt"></i> Dashboard
                </Nav.Link>
                <Nav.Link onClick={handlelogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
