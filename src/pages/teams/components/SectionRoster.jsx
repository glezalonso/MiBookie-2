import React from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { useRemovePlayer } from '../../../features/teams.features'

const SectionRoster = ({ team }) => {
  const removePlayer = useRemovePlayer(team?._id)

  const handleRemove = (id, playerId, player) => {
    const sure = confirm('Want to delete?')
    if (sure) return removePlayer.mutate({ id, data: { playerId, player } })
  }

  return (
        <>
            <h5 className="h5 m-3">Roster</h5>
           { (team?.players?.length > 0)
             ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'> <Table responsive variant='dark table-sm'>
                <thead>
                    <tr>
                    <th>Player</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

            { team?.players?.map(player => (
                 <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger btn-sm" onClick={() => handleRemove(team?._id, player?.playerId, player?.player)} >Remove</Button></td></tr>
            ))}

             </tbody>
             </Table>
             </div>
             : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}
export default SectionRoster
