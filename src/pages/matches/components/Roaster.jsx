import React from 'react'
import { Button, Table, Alert } from 'react-bootstrap'
const Roaster = ({ match, roster, handleAddLineUp, type }) => {
  return (
        <>
         {(roster?.length > 0)
           ? <Table responsive variant="dark" striped>
            <thead>
             <tr>
                <th>Player</th>
                <th>Action</th>
             </tr>
        </thead>
        <tbody>
                {roster?.map(players => players.players?.map(player => (
                    <tr key={player.playerId}><td>{player.player}</td><td><Button variant="success" onClick={() => handleAddLineUp(match?._id, player?.playerId, player?.player, type)}>Add to lineup</Button></td></tr>
                )))}

         </tbody>
        </Table>
           : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}

export default Roaster
