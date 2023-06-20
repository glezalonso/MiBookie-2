import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container, Row, Col, Alert } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import { getMatch } from '../../services/matches'
import MatchContent from './components/MatchContent'

const Matches = () => {
  const { id } = useParams()
  const { data: match, isLoading, isError } = useQuery({ queryKey: ['match', id], queryFn: () => getMatch(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
         <Row className='p-2 bg-dark m-3 rounded'>
          <Alert variant='info  mx-auto'><Alert.Heading>{`${match?.league?.league} / ${match?.season?.season} / ${match?.round?.round} / ${match?.local?.name} vs ${match?.away.name}`}</Alert.Heading></Alert>
            <Col >
                <MatchContent match={match} />
            </Col>
          </Row>

         </Container>
        </>
  )
}

export default Matches
