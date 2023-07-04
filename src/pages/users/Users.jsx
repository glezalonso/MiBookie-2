import React from 'react'
import { useGetUsers } from '../../features/users.features'
import { toast, Toaster } from 'react-hot-toast'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import TableUsers from './components/TableUsers'
import Loading from '../../ui/Loading'

const Users = () => {
  const { data: users, isLoading, isError } = useGetUsers()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={12}className='border rounded mx-auto p-4 fs-4'>
            <h5 className="h7 ">Users</h5>
              <TableUsers users={users} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default Users
