import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSport, createSport, updateSport } from '../../../services/sports'
import { toast } from 'react-hot-toast'
import ModalSports from './ModalSports'

const TableSport = ({ sports }) => {
  const queryClient = useQueryClient()

  const [modalShow, setModalShow] = useState(false)
  const [sport, setSport] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteSport,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['sports'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: createSport,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['sports'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateSport,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['sports'] })
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
    setSport(data)
    setUpdate(true)
  }

  return (
        <>
          <Button variant="warning mb-2" onClick={handleShow}> Create sport</Button>
        {(!update)
          ? <ModalSports modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalSports sport={sport} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }
        {(sports?.length > 0)
          ? <Table variant='light my-2' responsive striped hover>
            <thead>
                <tr>
                    <th>
                       Sports
                    </th>
                    <th>
                       Description
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {sports?.map(sport => (
                    <tr key={sport?._id}>
                        <td>{sport?.sport}</td>
                        <td>{sport?.description}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-info btn-sm mx-1 rounded ' to={`./${sport?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(sport)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(sport?._id)}>Delete</Button>
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
