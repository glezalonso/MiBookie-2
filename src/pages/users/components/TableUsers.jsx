import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { useDeleteUser, useCreateUser, useUpdateUser } from '../../../features/users.features'

import ModalUsers from './ModalUsers'

const TableUsers = ({ users }) => {
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const createUser = useCreateUser()

  const [modalShow, setModalShow] = useState(false)
  const [user, setUser] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteUser.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setUser(data)
    setUpdate(true)
  }

  return (
        <>
          <Button variant="warning m-1 btn-sm" onClick={handleShow}> Create user</Button>
        {(!update)
          ? <ModalUsers modalShow={modalShow} handleClose={handleClose} action={createUser} type={'Create'} setUpdate={setUpdate} />
          : <ModalUsers user={user} modalShow={modalShow} handleClose={handleClose} action={updateUser} type={'Edit'} setUpdate={setUpdate} /> }
        {(users?.length > 0)
          ? <Table variant='dark table-sm' responsive hover>
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
                            <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`./${user?._id}`}>Details</Link>
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
