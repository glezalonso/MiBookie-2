import React from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Loading from '../../ui/Loading'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useGetPlayer } from '../../features/players.features'

const PlayerDetails = () => {
  const { id } = useParams()
  const { data: player, isLoading, isError } = useGetPlayer(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Container fluid>
        <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} md={11} className=' mx-auto  fs-6' >
            <Card>
              <Card.Header><Card.Title>{player?.fullName}</Card.Title></Card.Header>
              <Card.Body>
                <Card.Text>Position: {player?.position}</Card.Text>
                <Card.Text>Team: {player?.team?.name}</Card.Text>
                <Card.Text>Sport: {player?.sport?.sport}</Card.Text>
                <Card.Text>Status: {(player?.status) ? <strong>Active</strong> : <strong>Inactive</strong>}</Card.Text>
              </Card.Body>

            </Card>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default PlayerDetails
