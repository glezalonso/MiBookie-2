import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TableSports from './components/TableSports'

const Sports = () => {
  return (
        <>
        <Navigate />
         <Container fluid >
          <Row className='my-2 mx-auto' >
            <Col md={8} className='bg-dark text-light rounded mx-auto fs-4'>
            <TableSports />
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Sports
