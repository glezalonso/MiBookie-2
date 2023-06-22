import React from 'react'
import Navigate from '../../ui/Navigate'
import formatedDate from '../../utils/formatedDate'
import { getMatches } from '../../services/matches'
import { useQuery } from '@tanstack/react-query'
import { Container, Row, Col } from 'react-bootstrap'
import SectionTodayMatches from './components/SectionTodayMacthes'
import SectionLeagues from './components/SectionLeagues'
import SectionSeasonsOpen from './components/SectionSeasonsOpen'

const Home = () => {
  const { data: matches } = useQuery({ queryKey: ['matches'], queryFn: getMatches })
  const date = formatedDate()
  const matchesToday = matches?.filter(match => match?.date?.split('T')[0] === date)

  return (
        <>
        <Navigate />
        <Container >
          <Row >
            <Col>
              <SectionTodayMatches matchesToday={matchesToday} />
            </Col>
            </Row>
            <Row>
              <Col>
             <SectionLeagues />
              </Col>
              <Col>
             <SectionSeasonsOpen />
              </Col>
            </Row>
        </Container>
        </>
  )
}

export default Home
