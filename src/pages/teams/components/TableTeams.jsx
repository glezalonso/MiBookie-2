import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTeam, updateTeam, deleteTeam } from '../../../services/teams'
import { toast } from 'react-hot-toast'
import ModalTeams from './ModalTeams'

const TableTeams = ({ teams }) => {
  const [dataFilter, setDataFilter] = useState('')
  const queryClient = useQueryClient()

  const [modalShow, setModalShow] = useState(false)
  const [team, setTeam] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['teams'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateTeam,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['teams'] })
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
    setTeam(data)
    setUpdate(true)
  }
  const handleOnChange = (event) => {
    setDataFilter(event.target.value)
  }

  const filter = teams.filter(team => {
    if (dataFilter) return team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
    else return team
  })

  return (
        <>
          <div className='mx-2'>
        <Button className="btn btn-warning mb-2" onClick={handleShow} >Create team</Button>
        <FormControl className="mb-3"placeholder='Search Team...' id='team' name='team' value={dataFilter} onChange={(event) => handleOnChange(event)} />
        </div>
        {(!update)
          ? <ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }
        {(filter?.length > 0)
          ? <Table variant='dark my-2' responsive striped hover>
            <thead>
                <tr>
                    <th>
                      Team
                    </th>
                    <th>
                      Stadium
                    </th>
                    <th>
                       Status
                    </th>
                    <th>
                        Sport
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {filter?.map(team => (
                    <tr key={team?._id}>
                        <td>{team?.name}</td>
                        <td>{team?.stadium}</td>
                        <td>{team?.sport?.sport}</td>
                        <td>{(team.status) ? <span>Active</span> : <span>Desactive</span>}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-info btn-sm mx-1 rounded ' to={`./${team?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(team)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(team?._id)}>Delete</Button>
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

export default TableTeams
