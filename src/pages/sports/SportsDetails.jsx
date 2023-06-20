import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Spinner, Container, Row, Col, Alert } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import { getSport } from '../../services/sports'
import toast, { Toaster } from 'react-hot-toast'

import SectionLeagues from './components/SectionLeagues'

const SportDetails = () => {
  const { id } = useParams()
  const { data: sport, isLoading, isError } = useQuery({ queryKey: ['sport', id], queryFn: () => getSport(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
          <Row className='p-2 bg-dark m-3 rounded'>
          <Alert variant='info  mx-auto'><Alert.Heading>{sport?.sport}</Alert.Heading></Alert>
            <Col >
            <SectionLeagues sport={sport} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default SportDetails
