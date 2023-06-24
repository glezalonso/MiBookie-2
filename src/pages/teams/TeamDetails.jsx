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
             <SectionTeam team={team} />
          <Row className='m-1 rounded'>
            <Col lg={6} className='p-2'>
              <SectionNextMatches team={team} />
            </Col>

            <Col lg={6} className='p-2'>
              <SectionMatches team={team} />
            </Col >
          </Row >
          <Row className='m-1 rounded'>
            <Col md={6} className='p-2'>
              <SectionRoster team={team} />
            </Col>
            <Col md={6} className='p-2'>
              <SectionPlayers team={team} />
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default TeamDetail
