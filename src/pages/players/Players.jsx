import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '../../services/players'
import Navigate from '../../ui/Navigate'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import TablePlayers from './components/TablesPlayers'

const Players = () => {
  const { data: players, isLoading, isError } = useQuery({ queryKey: ['players'], queryFn: getPlayers })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
          <Row className='p-1 m-2 bg-dark rounded' >
            <Col >
            <TablePlayers players={players}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Players
