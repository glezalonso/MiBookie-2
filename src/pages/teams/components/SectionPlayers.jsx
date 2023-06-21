import React, { useState } from 'react'
import { getPlayers } from '../../../services/players'
import { addPlayer } from '../../../services/teams'
import toast from 'react-hot-toast'
import { Button, Table, Alert, FormControl, Spinner } from 'react-bootstrap'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

const SectionPlayers = ({ team }) => {
  const { data: players, isLoading, isError } = useQuery({ queryKey: ['players'], queryFn: getPlayers })

  const [dataFilter, setDataFilter] = useState('')
  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      toast.success('added successfully!')
      queryClient.invalidateQueries({ queryKey: ['team'] })
    }
  })

  const handleAdd = (id, playerId, player) => {
    mutationCreate.mutate({ id, body: { playerId, player } })
  }

  const handleOnChange = (event) => {
    setDataFilter(event.target.value)
  }

  const playerBySport = players?.filter(player => player?.sport?._id === team?.sport?._id)
  const playerFilter = playerBySport?.filter(player => player?.team === undefined || player?.team === null)

  const filter = playerFilter?.filter(player => {
    if (dataFilter) return player?.fullName?.toLowerCase().includes(dataFilter?.toLowerCase())
    else return player
  })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (
        <>
            <h1 className="h4 static">All players</h1>
            <FormControl placeholder='Search Player...' id='player' name='player' value={dataFilter} onChange={(event) => handleOnChange(event)} />
            {(filter?.length > 0)
              ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table responsive variant="light mt-3" hover striped>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
          { filter?.map(player => (
            <tr key={player?._id}><td>{player?.fullName}</td><td> <Button variant="warning" onClick={() => handleAdd(team?._id, player?._id, player?.fullName)}>Add</Button></td></tr>
          ))}
            </tbody>
           </Table>
           </div>
              : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}

export default SectionPlayers
