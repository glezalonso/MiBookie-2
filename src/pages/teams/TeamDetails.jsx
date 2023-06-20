import React from 'react'
import { useParams } from 'react-router-dom'
import { getTeam } from '../../services/teams'
import toast, { Toaster } from 'react-hot-toast'
import { Container, Spinner, Row, Col } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import Navigate from '../../ui/Navigate'
import SectionTeam from './components/SectionTeam'
import SectionMatches from './components/SectionMatches'
import SectionRoster from './components/SectionRoster'
import SectionPlayers from './components/SectionPlayers'

const TeamDetail = () => {
  const { id } = useParams()
  const { data: team, isLoading, isError } = useQuery({ queryKey: ['team', id], queryFn: () => getTeam(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="botton-center" reverseOrder={false} />
        <Container className='w-100 mt-3'>
          <Row>
            <Col>
             <SectionTeam team={team} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SectionMatches team={team} />
            </Col>
          </Row>
          <Row>
            <Col className='col-xs-6'>
              <SectionRoster team={team} />
            </Col>
            <Col className='col-xs-6'>
              <SectionPlayers team={team} />
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default TeamDetail
