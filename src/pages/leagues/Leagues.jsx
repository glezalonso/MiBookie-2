import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Spinner, Container, Row, Col, Alert } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import { getLeague } from '../../services/leagues'
import SectionSeasons from './components/SectionSeasons'

const Leagues = () => {
  const { id } = useParams()
  const { data: league, isLoading, isError } = useQuery({ queryKey: ['league', id], queryFn: () => getLeague(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
         <Row className='p-2 bg-dark m-3 rounded'>
          <Alert variant='info  mx-auto'><Alert.Heading>{league?.league}</Alert.Heading></Alert>
            <Col >
            <SectionSeasons league={league} />
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Leagues
