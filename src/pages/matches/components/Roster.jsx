import React, { useState } from 'react'
import { Button, Table, Alert, FormControl } from 'react-bootstrap'
const Roaster = ({ match, roster, handleAddLineUp, type }) => {
  const [dataFilter, setDataFilter] = useState('')

  const players = roster?.map(team => team?.players?.map(player => player.playerId))

  const filter = players?.map(players => players.filter(player => {
    if (dataFilter) return player?.fullName?.toLowerCase().includes(dataFilter?.toLowerCase())
    else return player
  }))

  return (
        <>
         <div className='mx-2 my-3'>
            <h5 className="h5 static">All Teams</h5>
            <FormControl placeholder='Search players...' id='filter' name='filter' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
            </div>
         {(filter?.length > 0)
           ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'><Table responsive variant="dark table-sm" hover>
            <thead>
             <tr>
                <th>Player</th>
                <th>Position</th>
                <th>Action</th>
             </tr>
        </thead>
        <tbody>
                {filter?.map(players => players?.map(player => (
                    <tr key={player?._id}><td>{player?.fullName}</td><td>{player?.position}</td><td><Button variant="warning btn-sm" onClick={() => handleAddLineUp(match?._id, player?._id, type)}>Add to lineup</Button></td></tr>
                )))}

         </tbody>
        </Table>
        </div>
           : <Alert variant='warning'>There is no information to show!</Alert>}
        </>
  )
}

export default Roaster
