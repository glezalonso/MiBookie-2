import React from 'react'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Row, Col } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import SectionTeam from './components/SectionTeam'
import SectionMatches from './components/SectionMatches'
import SectionRoster from './components/SectionRoster'
import SectionPlayers from './components/SectionPlayers'
import SectionNextMatches from './components/SectionNextMatches'
import { useGetTeam } from '../../features/teams.features'

const TeamDetail = () => {
  const { id } = useParams()
  const { data: team, isLoading, isError } = useGetTeam(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container fluid >
          <Row className='m-1 rounded'>
            <Col lg={6} className='p-2'>
            <SectionTeam team={team} />
            </Col>
          </Row>
          <Row className='m-1 rounded'>
            <Col lg={6} className='p-2'>
            <h5 className="h7 ">Next matches</h5>
              <SectionNextMatches team={team} />
            </Col>

            <Col lg={6} className='p-2'>
            <h5 className="h7 ">Last matches</h5>
              <SectionMatches team={team} />
            </Col >
          </Row >
          <Row className='m-1 rounded'>
            <Col md={5} className='p-2 mx-auto'>
            <h5 className="h7 ">Roster</h5>
              <SectionRoster team={team} />
            </Col>
            <Col md={5} className='p-2 mx-auto'>
            <h5 className="h7 ">All players</h5>
              <SectionPlayers team={team} />
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default TeamDetail
