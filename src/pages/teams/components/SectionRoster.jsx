import React from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { useRemovePlayer } from '../../../features/teams.features'

const SectionRoster = ({ team }) => {
  const removePlayer = useRemovePlayer(team?._id)

  const handleRemove = (id, playerId) => {
    const sure = confirm('Want to delete?')
    if (sure) return removePlayer.mutate({ id, data: { playerId } })
  }

  return (
        <>
            <h5 className="h5 m-3">Roster</h5>
           { (team?.players?.length > 0)
             ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'> <Table responsive variant='dark table-sm'>
                <thead>
                    <tr>
                    <th>Player</th>
                    <th>Position</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

            { team?.players?.map(player => (
                 <tr key={player?.playerId?._id}><td>{player?.playerId?.fullName}</td><td>{player?.playerId?.position}</td><td><Button variant="danger btn-sm" onClick={() => handleRemove(team?._id, player?.playerId?._id)} >Remove</Button></td></tr>
            ))}

             </tbody>
             </Table>
             </div>
             : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}
export default SectionRoster
