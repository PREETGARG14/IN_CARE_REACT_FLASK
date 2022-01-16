import React,{useEffect, useState} from 'react'
import {Container, Typography,Accordion,AccordionSummary,AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Axios from 'axios';


const ShowImmunisation = ({patientId}) => {
    const [immunisationDetails,setImmunisationDetails]=useState([])

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:5000/api/admin/immunisation/${patientId}`).then((res)=>{
            setImmunisationDetails(res.data)
        })
    },[])

    return (
        <Container>
            <Typography variant='h3' textAlign='center'>Your Immunisation Details</Typography>
        { immunisationDetails.length===0?(<Typography variant='h2'>No Immunisation Details to show</Typography>):''}
        { immunisationDetails.map((v,i)=>
        (<Accordion key={v.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography > Immunisation : {i+1}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {Object.keys(v).map((item, index) => {
            return <Typography>{item} : {v[item]}</Typography>
        })}
        </AccordionDetails>
      </Accordion>))}            
     </Container>
    )
}

export default ShowImmunisation
