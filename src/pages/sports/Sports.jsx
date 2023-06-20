import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSports } from '../../services/sports'
import Navigate from '../../ui/Navigate'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import TableSports from './components/TableSports'

const Sports = () => {
  const { data: sports, isLoading, isError } = useQuery({ queryKey: ['sports'], queryFn: getSports })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
          <Row className='p-1 m-2 bg-dark rounded' >
            <Col >
            <TableSports sports={sports}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Sports
