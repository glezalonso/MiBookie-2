import React, { useState } from 'react'
import { useGetTeams } from '../../../features/teams.features'
import Loading from '../../../ui/Loading'
import toast from 'react-hot-toast'
import { FormControl, Table, Alert, Button } from 'react-bootstrap'
import { useAddTeam } from '../../../features/seasons.features'

const SectionTeams = ({ season }) => {
  const { data: teams, isLoading, isError } = useGetTeams()
  const addTeam = useAddTeam()
  const [dataFilter, setDataFilter] = useState('')

  const handleAdd = (id, team) => {
    addTeam.mutate({ id, body: { team } })
  }

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  const teamBySport = teams?.filter(team => team?.sport?._id === season?.sport?._id)

  const filter = teamBySport?.filter(team => {
    if (dataFilter) return team?.name?.toLowerCase().includes(dataFilter?.toLowerCase())
    else return team
  })

  return (
        <>
         <div className='mx-2 my-3'>
            <FormControl placeholder='Search Teams...' id='filter' name='filter' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
            </div>
            {filter?.length > 0
              ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                <Table responsive variant="dark table-sm table-borderless" hover >
                    <thead>
                        <tr>
                        <th>Team</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                     {filter?.map(team => (
                        <tr key={team?._id}>
                        <td>{team?.name}</td>
                        <td> <Button variant="warning btn-sm" onClick={() => handleAdd(season?._id, team?._id)}>Add</Button></td>
                        </tr>
                     ))}
                    </tbody>
                </Table>
                </div>
              : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}
export default SectionTeams
