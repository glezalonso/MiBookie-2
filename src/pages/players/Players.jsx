import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import SectionPlayers from './components/SectionPlayers'

const Players = () => {
    return (
        <>
            <Navigate />
            <Container fluid className="p-0 ">
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={8} className="mx-auto my-2">
                        <SectionPlayers />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Players
