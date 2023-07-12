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
         <div className='mx-auto my-3'>
            <FormControl style={{ fontSize: '13px' }} placeholder='Buscar jugador...' name='filter' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
            </div>
         {(filter?.length > 0)
           ? <div className='table-wrapper-scroll-y my-custom-scrollbar rounded'>
            <Table responsive variant="dark table-sm table-borderless my-1" hover>
            <thead className='border-bottom'>
             <tr>
             <th>Jugador</th>
            <th>Posición</th>
             <th>Opciones</th>
             </tr>
        </thead>
        <tbody>
                {filter?.map(players => players?.map(player => (
                    <tr key={player?._id}><td>{player?.fullName}</td><td>{player?.position}</td><td><Button style={{ fontSize: '13px' }} variant="warning btn-sm" onClick={() => handleAddLineUp(match?._id, player?._id, type)}>Agregar</Button></td></tr>
                )))}

         </tbody>
        </Table>
        </div>
           : <Alert variant='warning'>No hay jugadores para mostar!</Alert>}
        </>
  )
}

export default Roaster
