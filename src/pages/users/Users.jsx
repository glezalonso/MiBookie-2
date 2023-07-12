import React from 'react'
import { useGetUsers } from '../../features/users.features'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TableUsers from './components/TableUsers'
import Loading from '../../ui/Loading'
import { toast } from 'react-hot-toast'

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsers()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
         <Container fluid >
          <Row className='my-2 mx-auto' >
            <Col xs={12} md={11} className='bg-dark text-light rounded mx-auto my-2 fs-4'>
              <TableUsers users={users} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default Users
