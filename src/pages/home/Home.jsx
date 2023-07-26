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
                    <Col xs={12} md={11} className="mx-auto my-2">
                        <SectionTodayMatches />
                    </Col>
                </Row>
                <Row className="my-2 mx-auto">
                    <Col xs={12} md={5} className="mx-auto my-2 ">
                        <SectionSeasonsOpen />
                    </Col>
                    <Col xs={12} md={5} className="mx-auto my-2 ">
                        <SectionLeagues />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
