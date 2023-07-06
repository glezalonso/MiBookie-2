import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import ModalPlayers from './ModalPlayers'
import { useCreatePlayer, useDeletePlayer, useUpdatePlayer } from '../../../features/players.features'

const TableSport = ({ players }) => {
  const [dataFilter, setDataFilter] = useState('')
  const createPlayer = useCreatePlayer()
  const updatePlayer = useUpdatePlayer()
  const deletePlayer = useDeletePlayer()

  const [modalShow, setModalShow] = useState(false)
  const [player, setPlayer] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deletePlayer.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setPlayer(data)
    setUpdate(true)
  }

  const filter = players.filter(player => {
    if (dataFilter) return player?.fullName?.toLowerCase().includes(dataFilter.toLowerCase()) || player?.sport?.sport?.toLowerCase().includes(dataFilter.toLowerCase()) || player?.team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
    else return player
  })

  return (
        <>
        <div className='mx-2 my-3'>
        <Button className="btn btn-warning mb-2" onClick={handleShow} >Create player</Button>
        <FormControl placeholder='Search player, team,  sport...' id='filter' name='filter' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
        </div>
        {(!update)
          ? <ModalPlayers modalShow={modalShow} handleClose={handleClose} action={createPlayer} type={'Create'} setUpdate={setUpdate} />
          : <ModalPlayers player={player} modalShow={modalShow} handleClose={handleClose} action={updatePlayer} type={'Edit'} setUpdate={setUpdate} /> }
        {(filter?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'><Table responsive variant='dark table-sm table-borderless'>
            <thead>
                <tr>
                    <th>
                       Fullname
                    </th>
                    <th>
                       Position
                    </th>
                    <th>
                       Sport
                    </th>
                    <th>
                        Status
                    </th>
                    <th>
                        Team
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {filter?.map(player => (
                    <tr key={player?._id}>
                        <td>{player?.fullName}</td>
                        <td>{player?.position}</td>
                        <td>{player?.sport?.sport}</td>
                        <td>{(player?.status) ? <span className='text-success'>Active</span> : <span className='text-danger'>Desactive</span>}</td>
                        <td>{player?.team?.name}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`./${player?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(player)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(player?._id)}>Delete</Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                ))}
            </tbody>
        </Table>
        </div>
          : <Alert variant='warning'>There is no information to show!</Alert>}

        </>
  )
}

export default TableSport
