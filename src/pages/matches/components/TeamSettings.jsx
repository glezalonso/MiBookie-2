import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'

const TeamSettings = ({ match, handleRemoveLineUp, type }) => {
  return (
        <>
        {(type === 'local')
          ? (match?.lineup?.length > 0)
              ? <Table responsive variant="dark" striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                { match?.lineup?.map(local => local?.local?.map(player => (
                <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'local')}>Remover</Button></td></tr>
                )))}

               </tbody>
            </Table>
              : <Alert variant='warning'>There is no information to show!</Alert>

          : (match?.lineup?.length > 0)
              ? <Table responsive variant="dark" striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { match?.lineup?.map(away => away?.away?.map(player => (
                    <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger" onClick={() => handleRemoveLineUp(match?._id, player?.playerId, player?.player, player?._id, 'away')}>Remove from lineup</Button></td></tr>

                    )))}
              </tbody>
                </Table>
              : <Alert variant='warning'>There is no information to show!</Alert>

}
        </>
  )
}
export default TeamSettings
