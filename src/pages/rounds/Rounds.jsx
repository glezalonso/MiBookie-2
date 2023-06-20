import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionMatches from './components/SectionMatches'
import { getRound } from '../../services/rounds'

const Rounds = () => {
  const { id } = useParams()
  const { data: round, isLoading, isError } = useQuery({ queryKey: ['round', id], queryFn: () => getRound(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (

         <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
         <Row className='p-2 bg-dark m-3 rounded'>
          <Alert variant='info  mx-auto'><Alert.Heading>{`${round?.league?.league} / ${round?.season?.season} / ${round.round}`}</Alert.Heading></Alert>
            <Col >
            <SectionMatches round={round}/>
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Rounds
