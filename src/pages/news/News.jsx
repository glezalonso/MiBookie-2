import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import SectionNews from './components/SectionNews'

const News = () => {
  return (
        <>
        <Navigate />
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} md={11} className='bg-dark text-light rounded mx-auto  fs-4'>
              <SectionNews />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default News
