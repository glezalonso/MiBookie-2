import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import SectionTeams from './components/SectionTeams'

const Teams = () => {
    return (
        <>
            <Navigate />
            <Container fluid className="p-0">
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={8} className="mx-auto">
                        <SectionTeams />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teams
