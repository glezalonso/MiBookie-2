import React from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import { useGetUser } from '../../features/users.features'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'

const UserDetails = () => {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useGetUser(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={11} className='border rounded mx-auto p-4 fs-4'>
            <Card bg='light'>
              <Card.Header>
              <Card.Title >{user?.fullName}</Card.Title>
              </Card.Header>
                <Card.Body>
                <Card.Subtitle>Username: {user?.username}</Card.Subtitle>
                <Card.Text >Email: {user?.email}</Card.Text>
                <Card.Text >Rol: {(user?.isAdmin) ? <strong>Admin</strong> : <strong>User</strong>}</Card.Text>
              </Card.Body>
            </Card>

            </Col>
          </Row>
        </Container>

        </>
  )
}

export default UserDetails
