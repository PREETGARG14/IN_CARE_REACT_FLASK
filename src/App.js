import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Immunisation from "./components/Immunisation";
import Diagnosis from "./components/Diagnosis";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Prescriptions from "./components/Prescriptions";
import Doctorlogin from "./components/Doctorlogin";
import Cards from "./components/Cards";
import UserDetailCard from "./components/UserDetailCard";
import Showprescriptions from "./components/Showprescriptions";
import ShowImmunisation from "./components/ShowImmunisation";
import ShowPastProblem from "./components/ShowPastProblem";
import Chatbot from "./components/Chatbot";
import PageNotFound from "./utils/PageNotFound";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    false || Boolean(sessionStorage.getItem("doctorlogin"))
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("user_id"));
  const [userDetailStatus, setUserDetailStatus] = useState(
    Boolean(sessionStorage.getItem("patient_id"))
  );
  const [patientId, setPatientId] = useState(
    sessionStorage.getItem("patient_id")
  );
  const [patientName, setPatientName] = useState(
    sessionStorage.getItem("username")
  );
  return (
    <Router>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        userDetailStatus={userDetailStatus}
        setUserDetailStatus={setUserDetailStatus}
      />
      <main className="my-0">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/card" exact element={<Cards />} />
          <Route
            path="/login"
            element={
              <ProtectedRoutes auth={!loggedIn && !userDetailStatus}>
                <Login
                  setUserDetailStatus={setUserDetailStatus}
                  patientId={patientId}
                  setPatientId={setPatientId}
                  setPatientName={setPatientName}
                />
              </ProtectedRoutes>
            }
          />
          <Route path="/chatbot" exact element={<Chatbot />} />
          <Route
            path="/doctorlogin"
            element={
              <Doctorlogin loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            }
            exact
          />
          <Route path="/signup" element={<Signup />} exact />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes auth={loggedIn}>
                <Dashboard userId={userId} setUserId={setUserId} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/immunisation"
            element={
              <ProtectedRoutes auth={loggedIn && Boolean(userId)}>
                <Immunisation userId={userId} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/diagnosis"
            element={
              <ProtectedRoutes auth={loggedIn && Boolean(userId)}>
                <Diagnosis userId={userId} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/presciption"
            element={
              <ProtectedRoutes auth={loggedIn && Boolean(userId)}>
                <Prescriptions userId={userId} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cards"
            element={
              <ProtectedRoutes auth={loggedIn && Boolean(userId)}>
                <Cards userId={userId} setUserId={setUserId} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/userdetailcard"
            element={
              <ProtectedRoutes auth={userDetailStatus}>
                <UserDetailCard
                  patientId={patientId}
                  setPatientId={setPatientId}
                  patientName={patientName}
                />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/showprescriptions"
            element={
              <ProtectedRoutes auth={userDetailStatus}>
                <Showprescriptions
                  patientId={patientId}
                  setPatientId={setPatientId}
                />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/showimmunisation"
            element={
              <ProtectedRoutes auth={userDetailStatus}>
                <ShowImmunisation
                  patientId={patientId}
                  setPatientId={setPatientId}
                />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/showpastproblem"
            element={
              <ProtectedRoutes auth={userDetailStatus}>
                <ShowPastProblem
                  patientId={patientId}
                  setPatientId={setPatientId}
                />
              </ProtectedRoutes>
            }
          />
          <Route path="/temp" element={<Chatbot />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
export default App;
