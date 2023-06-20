import React from 'react'
import { Card } from 'react-bootstrap'
import avatar from '../../../assets/avatar.png'

const SectionTeam = ({ team }) => {
  return (
        <>
      <Card className=" bg-dark text-white text-center">
      <center><Card.Img variant="top" style={{ width: '100px', height: '100px' }} src={team?.poster || avatar } /></center>
      <Card.Body>
        <Card.Title>{team?.name}</Card.Title>
        <Card.Text>
          <span><strong>Stadium:</strong> {team?.stadium} </span>
          <span><strong>Sport: </strong> {team?.sport?.sport}</span>
        </Card.Text>
      </Card.Body>
    </Card>
        </>
  )
}
export default SectionTeam
