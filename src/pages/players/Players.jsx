import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import TablePlayers from './components/TablesPlayers'
import Loading from '../../ui/Loading'
import { useGetPlayers } from '../../features/players.features'

const Players = () => {
  const { data: players, isLoading, isError } = useGetPlayers()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid>
         <Row className='my-2 mx-auto' >
            <Col xs={12} md={11} className='border rounded mx-auto my-2 fs-6' >
            <TablePlayers players={players}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Players
