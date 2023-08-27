import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import SectionSport from './components/SectionsSports'

const Sports = () => {
    return (
        <>
            <Navigate />
            <Container fluid className="p-0">
                <Row className="my-2 ">
                    <Col xs={12} md={8} className="mx-auto my-1">
                        <SectionSport />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Sports
