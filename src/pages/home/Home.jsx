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
          <Row className='m-1 rounded' >
            <Col xs={12} className='p-2' >
              <SectionTodayMatches matchesToday={matchesToday} />
            </Col>
            </Row>
            <Row className='m-1  rounded' >
            <Col lg={8} className='p-1'>
             <SectionSeasonsOpen />
              </Col>
              <Col lg={4} className='p-2' >
             <SectionLeagues />
              </Col>

            </Row>
        </Container>
        </>
  )
}

export default Home
