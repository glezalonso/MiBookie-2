import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import SectionSport from './components/SectionsSports'

const Sports = () => {
    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={8} className="mx-auto my-1">
                        <SectionSport />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Sports
