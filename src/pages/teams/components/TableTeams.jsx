import React, { useState } from 'react'
import {
    useDeleteTeam,
    useCreateTeam,
    useUpdateTeam,
    useGetTeams,
} from '../../../features/teams.features'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Loading from '../../../ui/Loading'
import ModalTeams from './ModalTeams'

const TableTeams = () => {
    const { data: teams, isLoading, isError } = useGetTeams()
    const createTeam = useCreateTeam()
    const deleteTeam = useDeleteTeam()
    const updateTeam = useUpdateTeam()

    const [dataFilter, setDataFilter] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [team, setTeam] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteTeam.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setTeam(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los equipos!')

    const filter = teams.filter((team) => {
        if (dataFilter)
            return team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
        else return team
    })

    return (
        <>
            <section>
                <h5>
                    Equipos
                    <Button
                        className="btn btn-warning btn-sm my-1 mx-1"
                        onClick={handleShow}
                    >
                        Crear equipo
                    </Button>
                </h5>
                <div className="mx-2">
                    <FormControl
                        className="mb-3"
                        size="sm"
                        placeholder="Buscar equipo..."
                        name="team"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {!update ? (
                    <ModalTeams
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createTeam}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalTeams
                        team={team}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateTeam}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                <div className="data-tables bg-dark  rounded p-1 my-1">
                    {filter?.length > 0 ? (
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Equipo</th>
                                    <th>Estadio</th>
                                    <th>Deporte</th>
                                    <th>Estatus</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((team) => (
                                    <tr key={team?._id}>
                                        <td>{team?.name}</td>
                                        <td>{team?.stadium}</td>
                                        <td>{team?.sport?.sport}</td>
                                        <td>
                                            {team.status ? (
                                                <span className="text-success">
                                                    Activo
                                                </span>
                                            ) : (
                                                <span className="text-danger">
                                                    Inactivo
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    className="btn btn-secondary btn-sm "
                                                    to={`./${team?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() =>
                                                        handleUpdate(team)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm "
                                                    onClick={() =>
                                                        handleDelete(team?._id)
                                                    }
                                                >
                                                    Borrar
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <Alert variant="warning">
                            No hay equipos para mostrar!
                        </Alert>
                    )}
                </div>
            </section>
        </>
    )
}

export default TableTeams
