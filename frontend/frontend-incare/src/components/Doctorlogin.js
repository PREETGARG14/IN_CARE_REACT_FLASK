import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { PasswordOutlined } from '@mui/icons-material';


const Doctorlogin = ({loggedIn,setLoggedIn}) => {
  console.log(loggedIn)
  const history = useNavigate();

  const [password,setPassword]=useState();
  const [email,setEmail]=useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data={
      email_address:email,
      password:password
    }
    console.log(data)
    Axios.post('http://127.0.0.1:5000/api/doctor2',data).
    then((res)=>{
      setLoggedIn(true)
      history('/dashboard');
    }).
    catch((err)=>{
      console.log(err)
    })
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in as a Doctor
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="uniqId"
              label="Email address"
              name="uniqId"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
  );
}

export default Doctorlogin;