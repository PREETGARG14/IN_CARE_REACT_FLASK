import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { Avatar, Typography ,TextField,Grid,Button} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Immunisation = () => {
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('hit')
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
            Immunisation Statement
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 ,flexDirection:'row'}}>
              <TextField
              margin="normal"
              required
              fullWidth
              id="Immunisation_item"
              label="Immunisation item"
              name="Immunisation_item"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Route"
              label="Route"
              name="Route"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="target_site"
              label="Target site"
              name="target_site"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sequence_number"
              label="Sequence number"
              name="sequence_number"
            />        
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

export default Immunisation
