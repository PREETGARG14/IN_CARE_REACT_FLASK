import React,{useEffect, useState} from 'react'
import {Container, Typography,Accordion,AccordionSummary,AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Axios from 'axios';


const ShowPastProblem = ({patientId}) => {
    const [pastProblems,setPastProblems]=useState([])

    useEffect(()=>{
        Axios.get(`http://127.0.0.1:5000/api/admin/past/${patientId}`).then((res)=>{
            setPastProblems(res.data)
        })
    },[])

    return (
        <Container>
            <Typography variant='h3' textAlign='center'>Your Past history of Problems</Typography>
        {pastProblems.length===0?(<Typography variant='h2' textAlign='center'>No past Problem to show</Typography>):''}
        { pastProblems.map((v,i)=>
        (<Accordion key={v.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography > Problem : {i+1}</Typography>
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

export default ShowPastProblem
