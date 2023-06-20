import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { getSeason } from '../../services/seasons'
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionRounds from './components/SectionRounds'

const Seasons = () => {
  const { id } = useParams()
  const { data: season, isLoading, isError } = useQuery({ queryKey: ['season', id], queryFn: () => getSeason(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (

         <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
         <Row className='p-2 bg-dark m-3 rounded'>
          <Alert variant='info  mx-auto'><Alert.Heading>{`${season?.league?.league} / ${season?.season}`}</Alert.Heading></Alert>
            <Col >
            <SectionRounds season={season}/>
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Seasons
