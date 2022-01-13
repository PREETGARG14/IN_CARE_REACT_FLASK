import React,{useState} from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer'
import { Container } from 'react-bootstrap';
import Homepage from './components/Home'
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Immunisation from './components/Immunisation';
import Diagnosis from './components/Diagnosis';


function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  return (
    <Router>
    <Header/>
    <main className='py-3'>      
        <Routes>
        <Route path='/' exact element={<Homepage/>}/>
        <Route path='/login' element={<Login loggedIn={loggedIn}/>} exact />
        <Route path='/signup' element={<Signup/>} exact />
        <Route path='/dashboard' element={<Dashboard/>} exact />
        <Route path='/immunisation' element={<Immunisation/>} exact />
        <Route path='/diagnosis' element={<Diagnosis/>} exact />
        </Routes>
    </main>
    <Footer/>
    </Router>
  );
}

export default App;
