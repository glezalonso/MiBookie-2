import React, { useState } from 'react'
import { FormControl, Alert, Table, Button } from 'react-bootstrap'
import { useRemoveTeam } from '../../../features/seasons.features'

const SectionParticipants = ({ season }) => {
  const [dataFilter, setDataFilter] = useState('')

  const removeTeam = useRemoveTeam(season?._id)

  const handleRemove = (id, team) => {
    const sure = confirm('Want to delete?')
    if (sure) return removeTeam.mutate({ id, data: { team } })
  }
  const filter = season?.standings?.filter(teams => {
    if (dataFilter) return teams?.team?.name?.toLowerCase().includes(dataFilter?.toLowerCase())
    else return teams
  })

  return (
        <>
        <div className='mx-2 my-3'>

            <FormControl placeholder='Search team...' id='team' name='team' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
            </div>
            {filter?.length > 0
              ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
                <Table responsive variant="dark table-sm table-borderless" hover >
                    <thead>

                        <tr>
                            <th>Team participant</th>
                            <th>Actions</th>
                        </tr>
                   </thead>
                    <tbody>
                        {filter?.map(team => (
                            <tr key={team?.team?._id}><td>{team?.team?.name}</td>
                            <td> <Button variant="danger btn-sm" onClick={() => handleRemove(season?._id, team?._id)}>Remove</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
              : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}

export default SectionParticipants
