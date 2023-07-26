import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TableTeams from './components/TableTeams'

const Teams = () => {
    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={10} className="mx-auto my-1">
                        <TableTeams />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teams
