import { Grid, Typography ,Stack} from '@mui/material'
import Button from '@mui/material/Button';
import React from 'react'
import { Container } from 'react-bootstrap'

const Home = () => {
    return (
        <div>
            <Container >
            <Typography variant='h3' textAlign='center'>About us</Typography>
            <Typography variant='body1'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique deleniti possimus magnam corporis ratione facere!

            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque reiciendis eius autem eveniet mollitia, at asperiores suscipit quae similique laboriosam iste minus placeat odit velit quos, nulla architecto amet voluptates?
            </Typography>
            <br/>
            <Grid container justifyContent='center'>
            <Stack direction="row" spacing={2} textAlign='center'>
              <Button variant="contained">Schedule a meet with doctor</Button>
              <Button variant="contained">Link</Button>
              </Stack>
              </Grid>
            </Container>
            
        </div>
    )
}

export default Home
