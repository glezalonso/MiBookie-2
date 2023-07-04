import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'

const TeamSettings = ({ match, handleRemoveLineUp, type }) => {
  return (
        <>
        {(type === 'local')
          ? (match?.lineup?.length > 0)
              ? <Table responsive variant="dark table-sm" striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                { match?.lineup?.map(local => local?.local?.map(player => (
                <tr key={player?.playerId?._id}><td>{player?.playerId?.fullName}</td><td>{player?.playerId?.position}</td><td><Button variant="danger btn-sm" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?._id, 'local')}>Remove from lineup</Button></td></tr>
                )))}

               </tbody>
            </Table>
              : <Alert variant='warning'>There is no information to show!</Alert>

          : (match?.lineup?.length > 0)
              ? <Table responsive variant="dark table-sm" striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { match?.lineup?.map(away => away?.away?.map(player => (
                    <tr key={player?.playerId?._id}><td>{player?.playerId?.fullName}</td><td>{player?.playerId?.position}</td><td><Button variant="danger btn-sm" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?._id, 'away')}>Remove</Button></td></tr>

                    )))}
              </tbody>
                </Table>
              : <Alert variant='warning'>There is no information to show!</Alert>

}
        </>
  )
}
export default TeamSettings
