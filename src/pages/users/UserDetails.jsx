import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import { getUser } from '../../services/users'
import Loading from '../../ui/Loading'

const UserDetails = () => {
  const { id } = useParams()
  const { data: user, isLoading, isError } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) })

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
          <Row >
            <Col >
            <Card bg='light'>
              <Card.Header>
              <Card.Title>{user?.fullName}</Card.Title>
              </Card.Header>
                <Card.Body>
                <Card.Subtitle>Username: {user?.username}</Card.Subtitle>
                <Card.Text>Email: {user?.email}</Card.Text>
                <Card.Text>Rol: {(user?.isAdmin) ? <strong>Admin</strong> : <strong>User</strong>}</Card.Text>
              </Card.Body>
            </Card>

            </Col>
          </Row>
        </Container>

        </>
  )
}

export default UserDetails
