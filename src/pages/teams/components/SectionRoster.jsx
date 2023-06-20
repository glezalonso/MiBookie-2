import React from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { removePlayer } from '../../../services/teams'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const SectionRoster = ({ team }) => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: removePlayer,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['team'] })
    }
  })
  const handleRemove = (id, playerId, player) => {
    const sure = confirm('Want to delete?')
    if (sure) return mutationDelete.mutate({ id, data: { playerId, player } })
  }

  return (
        <>
            <h4 className="h4">Roster</h4>
           { (team?.players?.length > 0)
             ? <Table responsive variant="dark" hover striped>
                <thead>
                    <tr>
                    <th>Player</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

            { team?.players?.map(player => (
                 <tr key={player?.playerId}><td>{player?.player}</td><td><Button variant="danger" onClick={() => handleRemove(team?._id, player?.playerId, player?.player)} >Remove</Button></td></tr>
            ))}

             </tbody>
             </Table>
             : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}
export default SectionRoster
