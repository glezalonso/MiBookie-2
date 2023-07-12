import React from 'react'
import { Card } from 'react-bootstrap'

const SectionTeam = ({ team }) => {
  return (
        <>
        <section>
        <Card bg='dark' text='white'>
        <Card.Body>
        <Card.Title>Equipo: {team?.name}</Card.Title>
        <Card.Subtitle>Estadio: {team?.stadium} </Card.Subtitle>
        <Card.Text>Deporte: {team?.sport?.sport}</Card.Text>
        </Card.Body>
        </Card>
        </section>

        </>
  )
}
export default SectionTeam
