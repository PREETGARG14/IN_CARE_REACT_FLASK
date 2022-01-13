import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="p-5 bg-dark text-white text-center position-relative">
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Incare</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer