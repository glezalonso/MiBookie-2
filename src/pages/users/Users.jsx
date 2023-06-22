import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import { getUsers } from '../../services/users'
import TableUsers from './components/TableUsers'
import Loading from '../../ui/Loading'

const Users = () => {
  const { data: users, isLoading, isError } = useQuery({ queryKey: ['users'], queryFn: getUsers })

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
          <Row >
            <Col >
              <TableUsers users={users} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default Users
