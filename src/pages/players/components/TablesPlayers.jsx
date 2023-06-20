import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPlayer, updatePlayer, deletePlayer } from '../../../services/players'
import { toast } from 'react-hot-toast'
import ModalPlayers from './ModalPlayers'

const TableSport = ({ players }) => {
  const [dataFilter, setDataFilter] = useState('')
  const queryClient = useQueryClient()

  const [modalShow, setModalShow] = useState(false)
  const [player, setPlayer] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['players'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['players'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updatePlayer,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['players'] })
    }
  })

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return mutationDelete.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setPlayer(data)
    setUpdate(true)
  }
  const handleOnChange = (event) => {
    setDataFilter(event.target.value)
  }

  const filter = players.filter(player => {
    if (dataFilter) return player?.fullName?.toLowerCase().includes(dataFilter.toLowerCase())
    else return player
  })

  return (
        <>
          <div className='mx-2'>
        <Button className="btn btn-warning mb-2" onClick={handleShow} >Create player</Button>
        <FormControl className="mb-3"placeholder='Search player...' id='player' name='player' value={dataFilter} onChange={(event) => handleOnChange(event)} />
        </div>
        {(!update)
          ? <ModalPlayers player={player} modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalPlayers player={player} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }
        {(filter?.length > 0)
          ? <Table variant='dark my-2' responsive striped hover>
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
                        <td>{(player) ? <span>Active</span> : <span>Desactive</span>}</td>
                        <td>{player?.team?.name}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-info btn-sm mx-1 rounded ' to={`./${player?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(player)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(player?._id)}>Delete</Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                ))}
            </tbody>
        </Table>
          : <Alert variant='warning'>There is no information to show!</Alert>}

        </>
  )
}

export default TableSport
