import React, { useState } from 'react'
import { Avatar, Typography ,TextField,Button,Container,Box,FormControl,InputLabel,Select,MenuItem} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Diagnosis = ({userId}) => {
   const [open, setOpen] = useState(false);
   const [problem,setProblem]=useState();
   const [bodySite,setBodySite]=useState();
   const [dateTime,setDateTime]=useState(new Date());
   const [severity,setSeverity]=useState();
   const [lastUpdated,setLastUpdated]=useState();
    const handleSubmit=(e)=>{
      e.preventDefault();
      let data = {
        "problem":problem,
        "body_site":bodySite,
        "severity":severity,
        "dateTime":dateTime,
        "last_updated":lastUpdated
      }
      Axios.post(`http://127.0.0.1:5000/api/admin/past/${userId}`,data).then((res)=>{
        setOpen(true)
      }).catch((err)=>{
        console.log(err)
      })
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    
    return (
        <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalHospitalIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Past Problem / Diagnosis
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 ,flexDirection:'row'}}>
              <TextField
              margin="normal"
              fullWidth
              id="problem_name"
              label="Problem/Diagnosis Name"
              name="problem_name"
              onChange={(e)=>setProblem(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="body_site"
              label="Body site"
              name="Body site"
              onChange={(e)=>setBodySite(e.target.value)}
            /> 
            <TextField
         id="datetime-local"
         label="Date/time of abatement"
         type="datetime-local"
         fullWidth
         margin="normal"
         InputLabelProps={{
           shrink: true,
         }}
         onChange={(e)=>setDateTime(e.target.value)}
      />
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Severity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Severity"
          onChange={(e)=>setSeverity(e.target.value)}
        >
          <MenuItem value='mild'>mild</MenuItem>
          <MenuItem value='moderate'>moderate</MenuItem>
          <MenuItem value='severe'>Severe</MenuItem>
        </Select>        
      <TextField
         id="datetime-local"
         label="Last updated"
         type="datetime-local"
         fullWidth
         margin="normal"
         InputLabelProps={{
           shrink: true,
         }}
         onChange={(e)=>setLastUpdated(e.target.value)}
      />
      </FormControl>       
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Prescribe 
            </Button>    
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
             <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                submitted
             </Alert>
            </Snackbar>
          </Box>
        </Box>
        </Container>
    )
}

export default Diagnosis
