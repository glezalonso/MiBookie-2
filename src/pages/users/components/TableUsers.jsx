import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import {
    useDeleteUser,
    useCreateUser,
    useUpdateUser,
} from '../../../features/users.features'
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
        const sure = confirm('Está seguro que desea borrar?')
        if (sure) return deleteUser.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setUser(data)
        setUpdate(true)
    }

    return (
        <>
            <section>
                <h5>
                    Usuarios
                    <Button
                        variant="warning mx-1 my-1 btn-sm"
                        onClick={handleShow}
                    >
                        Crear usuario
                    </Button>
                </h5>
                {!update ? (
                    <ModalUsers
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createUser}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalUsers
                        user={user}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateUser}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                {users?.length > 0 ? (
                    <div className="data-tables bg-light rounded p-1 my-1">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="light"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Nombre completo</th>
                                    <th>Email</th>
                                    <th>Usuario</th>
                                    <th>Rol</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map((user) => (
                                    <tr key={user?._id}>
                                        <td>{user?.fullName}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.username}</td>
                                        <td>
                                            {user.isAdmin ? (
                                                <span>User</span>
                                            ) : (
                                                <span>Admin</span>
                                            )}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    className="btn btn-secondary btn-sm mx-1 rounded "
                                                    to={`./${user?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm mx-1 rounded"
                                                    onClick={() =>
                                                        handleUpdate(user)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm  mx-1 rounded"
                                                    onClick={() =>
                                                        handleDelete(user?._id)
                                                    }
                                                >
                                                    Borrar
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <caption className="mx-1 text-dark">
                                Total de usuarios {users?.length}
                            </caption>
                        </Table>
                    </div>
                ) : (
                    <Alert variant="warning">
                        No hay usuarios para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default TableUsers
