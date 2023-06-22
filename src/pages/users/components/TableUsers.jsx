import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser, register, updateUser } from '../../../services/users'
import { toast } from 'react-hot-toast'
import ModalUsers from './ModalUsers'

const TableUsers = ({ users }) => {
  const queryClient = useQueryClient()

  const [modalShow, setModalShow] = useState(false)
  const [user, setUser] = useState([])
  const [update, setUpdate] = useState(false)

  const mutationDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const mutationCreate = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('created successfully!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: updateUser,
    onSuccess: data => {
      toast.success('updated successfully !')
      queryClient.invalidateQueries({ queryKey: ['users'] })
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
    setUser(data)
    setUpdate(true)
  }

  return (
        <>
          <Button variant="warning mb-2" onClick={handleShow}> Create user</Button>
        {(!update)
          ? <ModalUsers modalShow={modalShow} handleClose={handleClose} action={mutationCreate} type={'Create'} setUpdate={setUpdate} />
          : <ModalUsers user={user} modalShow={modalShow} handleClose={handleClose} action={mutationUpdate} type={'Edit'} setUpdate={setUpdate} /> }
        {(users?.length > 0)
          ? <Table variant='light my-2' responsive striped hover>
            <thead>
                <tr>
                    <th>
                      Full name
                    </th>
                    <th>
                      email
                    </th>
                    <th>
                      username
                    </th>
                    <th>
                      Permissions
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {users?.map(user => (
                    <tr key={user?._id}>
                        <td>{user?.fullName}</td>
                        <td>{user?.email}</td>
                        <td>{user?.username}</td>
                        <td>{(user.isAdmin) ? <span>User</span> : <span>Admin</span>}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-info btn-sm mx-1 rounded ' to={`./${user?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(user)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(user?._id)}>Delete</Button>
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

export default TableUsers
