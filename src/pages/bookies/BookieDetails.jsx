import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import { useGetBookie } from '../../features/bookies.features'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'

const BookieDetails = () => {
  const { id } = useParams()
  const { data: bookie, isLoading, isError } = useGetBookie(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} md={11} className='border rounded mx-auto p-4 fs-4'>
            <Card bg='light'>
              <Card.Header>
              <Card.Title >{bookie?.fullName}</Card.Title>
              </Card.Header>
                <Card.Body>
                <Card.Subtitle>Username: {bookie?.username}</Card.Subtitle>
                <Card.Text >Email: {bookie?.email}</Card.Text>
              </Card.Body>
            </Card>

            </Col>
          </Row>
        </Container>

        </>
  )
}

export default BookieDetails
