import React from 'react'
import { Avatar, Typography ,TextField,Button,Container,Box,FormControl,InputLabel,Select,MenuItem} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DateTimePicker from '@mui/lab/DateTimePicker';

const Diagnosis = () => {
    const handleSubmit=()=>{
        console.log('hello')
    }
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
            Problem / Diagnosis
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 ,flexDirection:'row'}}>
              <TextField
              margin="normal"
              required
              fullWidth
              id="problem_name"
              label="Problem/Diagnosis Name"
              name="problem_name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="body_site"
              label="Body site"
              name="Body site"
            /> 
       <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Severity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Severity"
        >
          <MenuItem value='mild'>mild</MenuItem>
          <MenuItem value='moderate'>moderate</MenuItem>
          <MenuItem value='severe'>Severe</MenuItem>
        </Select>
      </FormControl>       
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Prescribe 
            </Button>    
          </Box>
        </Box>
        </Container>
    )
}

export default Diagnosis
