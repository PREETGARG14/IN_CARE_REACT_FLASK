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
import ProtectedRoutes from './utils/ProtectedRoutes';
import Prescriptions from './components/Prescriptions';
import Doctorlogin from './components/Doctorlogin';
import Cards from './components/Cards'
import UserDetailCard from './components/UserDetailCard';


function App() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [userId,setUserId]=useState();
  const [userDetailStatus,setUserDetailStatus]=useState(false)
  return (
    <Router>
    <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userDetailStatus={userDetailStatus} setUserDetailStatus={setUserDetailStatus}/>
    <main className='py-3'>      
        <Routes>
        <Route path='/' exact element={<Homepage/>}/>
        <Route path='/login' element={<Login setUserDetailStatus={setUserDetailStatus}/>} exact />
        <Route path='/doctorlogin' element={<Doctorlogin loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} exact />
        <Route path='/signup' element={<Signup/>} exact />
        <Route path='/dashboard' element={<ProtectedRoutes auth={loggedIn}>
                                            <Dashboard userId={userId} setUserId={setUserId}/> 
                                            </ProtectedRoutes>}/>
        <Route path='/immunisation' element={<ProtectedRoutes auth={loggedIn}>
                                            <Immunisation userId={userId}/> 
                                            </ProtectedRoutes>}/>   
        <Route path='/diagnosis' element={<ProtectedRoutes auth={loggedIn}>
                                            <Diagnosis userId={userId}/> 
                                            </ProtectedRoutes>}/>  
        <Route path='/presciption' element={<ProtectedRoutes auth={loggedIn}>
                                            <Prescriptions userId={userId}/> 
                                            </ProtectedRoutes>}/>    
        <Route path='/cards' element={<ProtectedRoutes auth={loggedIn}>
                                            <Cards userId={userId} setUserId={setUserId}/> 
                                            </ProtectedRoutes>}/>
        <Route path='/userdetailcard' element={<ProtectedRoutes auth={userDetailStatus}>
                                            <UserDetailCard /> 
                                            </ProtectedRoutes>}/>
        </Routes>
    </main>
    <Footer/>
    </Router>
  );
}
export default App;
