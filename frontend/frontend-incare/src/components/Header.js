import React from 'react'
import {Navbar,Nav,Container,LinkContainer} from 'react-bootstrap'


const Header = ({loggedIn,setLoggedIn}) => {
   const handlelogout=()=>{
     setLoggedIn(true);
   }
    return (
        <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect >
          <Container>
            <Navbar.Brand href='/'>Incare</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
          {loggedIn===false?
          <Nav className='ml-auto'>
                <Nav.Link href='/login'>
                  <i className='fas fa-shopping-cart'></i> login
                </Nav.Link>
                  <Nav.Link href='/signup'>
                    <i className='fas fa-user'></i> Sign up
                  </Nav.Link>
            </Nav>:
            (<Nav className='ml-auto'>
              <Nav.Link onClick={()=>{console.log('hit me')}}>
                 <i className="fas fa-sign-out-alt"></i> Logout
                  </Nav.Link>
              </Nav>)
              }
          </Navbar.Collapse>
          </Container>
      </Navbar>
        </header>
    )
}

export default Header