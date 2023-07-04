import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Table, Alert, FormControl } from 'react-bootstrap'
import Loading from '../../../ui/Loading'
import { useGetPlayers } from '../../../features/players.features'
import { useAddPlayer } from '../../../features/teams.features'

const SectionPlayers = ({ team }) => {
  const addPlayer = useAddPlayer(team?._id)
  const { data: players, isLoading, isError } = useGetPlayers()

  const [dataFilter, setDataFilter] = useState('')

  const handleAdd = (id, playerId) => {
    addPlayer.mutate({ id, body: { playerId } })
  }

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  // players belog to a sport
  const playerBySport = players?.filter(player => player?.sport?._id === team?.sport?._id)

  // players without team
  const playerFilter = playerBySport?.filter(player => player?.team === undefined || player?.team === null)

  // Filter ser
  const filter = playerFilter?.filter(player => {
    if (dataFilter) return player?.fullName?.toLowerCase().includes(dataFilter?.toLowerCase())
    else return player
  })

  return (
        <>
        <div className='mx-2 my-3'>

            <FormControl placeholder='Search Player...' id='player' name='player' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
            </div>
            {(filter?.length > 0)
              ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table responsive variant="dark table-sm" hover >
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
          { filter?.map(player => (
            <tr key={player?._id}><td>{player?.fullName}</td><td>{player?.position}</td><td> <Button variant="warning btn-sm" onClick={() => handleAdd(team?._id, player?._id)}>Add</Button></td></tr>
          ))}
            </tbody>
           </Table>
           </div>
              : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}

export default SectionPlayers
