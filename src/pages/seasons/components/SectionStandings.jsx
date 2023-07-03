import React, { useState } from 'react'
import { FormControl, Alert, Table } from 'react-bootstrap'

const SectionStandings = ({ season }) => {
  const [dataFilter, setDataFilter] = useState('')

  const filter = season?.standings?.filter(teams => {
    if (dataFilter) return teams?.team?.name?.toLowerCase().includes(dataFilter?.toLowerCase())
    else return teams
  })
  return (
        <><div className='mx-2 my-3'>
        <h5 className="h5 static">Standings</h5>
        <FormControl placeholder='Search team...' id='team' name='team' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
        </div>
        {filter?.length > 0
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <Table responsive variant="dark table-sm" hover >
                <thead>

                    <tr>
                        <th>Team </th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Loses</th>

                    </tr>
               </thead>
                <tbody>
                    {filter?.map(team => (
                        <tr key={team?.team?._id}><td>{team?.team?.name}</td>
                        <td>{team?.wins}</td>
                        <td>{team?.draws}</td>
                        <td>{team?.loses}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
          : <Alert variant='warning'>There is no information to show!</Alert>}
    </>
  )
}

export default SectionStandings
