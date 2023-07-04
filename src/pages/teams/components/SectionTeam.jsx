import React from 'react'
import { Card } from 'react-bootstrap'

const SectionTeam = ({ team }) => {
  return (
        <>
        <Card bg='dark' text='white'>
        <Card.Body>
        <Card.Title>Team: {team?.name}</Card.Title>
        <Card.Subtitle>Stadium: {team?.stadium} </Card.Subtitle>
        <Card.Text>Sport: {team?.sport?.sport}</Card.Text>
      </Card.Body>
    </Card>

        </>
  )
}
export default SectionTeam
