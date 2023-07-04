import React from 'react'
import Navigate from '../../ui/Navigate'
import formatedDate from '../../utils/formatedDate'
import { useGetMatches } from '../../features/matches.features'
import { Container, Row, Col } from 'react-bootstrap'
import SectionTodayMatches from './components/SectionTodayMacthes'
import SectionLeagues from './components/SectionLeagues'
import SectionSeasonsOpen from './components/SectionSeasonsOpen'

const Home = () => {
  const { data: matches } = useGetMatches()
  const date = formatedDate()
  const matchesToday = matches?.filter(match => match?.date?.split('T')[0] === date)

  return (
        <>
        <Navigate />
        <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={11} className='border rounded mx-auto p-4 fs-4' >
            <h5 className="h7 ">Matches Today</h5>
              <SectionTodayMatches matchesToday={matchesToday} />
            </Col>
            </Row>
            <Row className='m-2 p-2 mx-auto' >
            <Col lg={8}className='border rounded mx-auto p-2 fs-4'>
             <SectionSeasonsOpen />
              </Col>
              <Col lg={4} className='border rounded mx-auto p-2 fs-4' >
             <SectionLeagues />
              </Col>

            </Row>
        </Container>
        </>
  )
}

export default Home
