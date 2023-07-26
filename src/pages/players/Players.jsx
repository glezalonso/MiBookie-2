import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TablePlayers from './components/TablesPlayers'

const Players = () => {
    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={10} className="mx-auto my-2">
                        <TablePlayers />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Players
