import React,{useState} from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import { Avatar, Typography ,TextField,Grid,Button} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert'



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Immunisation = ({userId}) => {
  const [open, setOpen] = useState(false);
  const [immunisationItem,setImmunisationItem]=useState();
  const [route,setRoute]=useState();
  const [targetsite,setTargetSite]=useState();
  const [seqnumber,setSeqnumber]=useState();

    const handleSubmit = (e) =>{
        e.preventDefault();
        let data={
          "immunisation_item":immunisationItem,
          "route":route,
          "target_site":targetsite,
          "sequence_no":seqnumber
        }
        Axios.post(`http://127.0.0.1:5000/api/admin/immunisation/${userId}`,data).then((res=>{
          setOpen(true)
        })).catch((err)=>{
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
            Immunisation Statement
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 ,flexDirection:'row'}}>
              <TextField
              margin="normal"
              required
              fullWidth
              label="Immunisation item"
              onChange={(e)=>setImmunisationItem(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="Route"
              label="Route"
              name="Route"
              onChange={(e)=>setRoute(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="target_site"
              label="Target site"
              name="target_site"
              onChange={(e)=>setTargetSite(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="sequence_number"
              label="Sequence number"
              name="sequence_number"
              onChange={(e)=>setSeqnumber(e.target.value)}
            />        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
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

export default Immunisation
