import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import SectionTodayMatches from './components/SectionTodayMacthes'
import SectionLeagues from './components/SectionLeagues'
import SectionSeasonsOpen from './components/SectionSeasonsOpen'

const Home = () => {
    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col
                        md={11}
                        className="bg-dark text-light rounded mx-auto my-2 fs-4"
                    >
                        <SectionTodayMatches />
                    </Col>
                </Row>
                <Row className="my-2 mx-auto">
                    <Col
                        lg={7}
                        className="bg-dark text-light rounded mx-auto my-2 fs-4"
                    >
                        <SectionSeasonsOpen />
                    </Col>
                    <Col
                        lg={4}
                        className="bg-dark text-light rounded mx-auto my-2 fs-4"
                    >
                        <SectionLeagues />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
