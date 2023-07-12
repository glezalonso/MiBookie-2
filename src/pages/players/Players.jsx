import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TablePlayers from './components/TablesPlayers'

const Players = () => {
  return (
        <>
        <Navigate />
         <Container fluid>
         <Row className='my-2 mx-auto' >
            <Col xs={12} md={11} className='bg-dark text-white rounded mx-auto my-2 fs-6' >
            <TablePlayers />
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Players
