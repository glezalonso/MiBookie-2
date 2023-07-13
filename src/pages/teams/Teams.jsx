import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TableTeams from './components/TableTeams'

const Teams = () => {
    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2  mx-auto">
                    <Col
                        xs={12}
                        lg={11}
                        className="bg-dark text-light rounded mx-auto fs-6"
                    >
                        <TableTeams />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teams
