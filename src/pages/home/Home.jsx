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
          <Row className='my-2 mx-auto' >
            <Col md={10} xs={12} className='border rounded mx-auto my-2 fs-4' >
              <SectionTodayMatches matchesToday={matchesToday} />
            </Col>
            </Row>
            <Row className='my-2 mx-auto' >
            <Col lg={7} className='border rounded mx-auto my-2 fs-4'>
             <SectionSeasonsOpen />
              </Col>
              <Col lg={4} className='border rounded mx-auto my-2 fs-4' >
             <SectionLeagues />
              </Col>
            </Row>
        </Container>
        </>
  )
}

export default Home
