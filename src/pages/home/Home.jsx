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
            <Container fluid className="p-0">
                <Row className="my-2 mx-auto ">
                    <Col xs={12} md={8} className="mx-auto mt-2 min-vh-75">
                        <SectionTodayMatches />
                    </Col>
                </Row>
                <Row className="d-flex my-2 justify-content-center mx-auto">
                    <Col xs={12} md={5} className="mr-auto my-2 ">
                        <SectionSeasonsOpen />
                    </Col>
                    <Col xs={12} md={3} className="ml-auto my-2 ">
                        <SectionLeagues />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home
