import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import SectionNews from './components/SectionNews'

const News = () => {
    return (
        <>
            <Navigate />
            <Container fluid className="p-0 ">
                <Row className="m-2 p-2 mx-auto">
                    <Col xs={12} md={10} className="mx-auto my-1">
                        <SectionNews />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default News
