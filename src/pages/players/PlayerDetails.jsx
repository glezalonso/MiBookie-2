import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPlayer } from '../../services/players'
import toast from 'react-hot-toast'
import Loading from '../../ui/Loading'
import { Container, Row, Col, Card } from 'react-bootstrap'

const PlayerDetails = () => {
  const { id } = useParams()
  const { data: player, isLoading, isError } = useQuery({ queryKey: ['player', id], queryFn: () => getPlayer(id) })

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Container>
          <Row>
            <Col>
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
