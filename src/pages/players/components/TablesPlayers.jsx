import React, { useState } from 'react'
import {
    useCreatePlayer,
    useDeletePlayer,
    useUpdatePlayer,
    useGetPlayers,
} from '../../../features/players.features'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ModalPlayers from './ModalPlayers'
import { toast } from 'react-hot-toast'
import Loading from '../../../ui/Loading'

const TableSport = () => {
    const { data: players, isLoading, isError } = useGetPlayers()
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
        const sure = confirm('Estas seguro que deses que deseas borrar?')
        if (sure) return deletePlayer.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setPlayer(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los jugadores!')

    const filter = players.filter((player) => {
        if (dataFilter)
            return (
                player?.fullName
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                player?.sport?.sport
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                player?.team?.name
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase())
            )
        else return player
    })

    return (
        <>
            <section>
                <h5>
                    Jugadores
                    <Button
                        className="btn btn-warning btn-sm my-2 mx-1"
                        onClick={handleShow}
                    >
                        Crear jugador
                    </Button>
                </h5>
                <div className="mx-2 my-3">
                    <FormControl
                        size="sm"
                        placeholder="Bucar por nombre, equipo, deporte..."
                        name="player"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {!update ? (
                    <ModalPlayers
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createPlayer}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalPlayers
                        player={player}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updatePlayer}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                {filter?.length > 0 ? (
                    <div className="data-tables bg-dark rounded p-1 my-1">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Posición</th>
                                    <th>Deporte</th>
                                    <th>Equipo</th>
                                    <th>Estatus</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((player) => (
                                    <tr key={player?._id}>
                                        <td>{player?.fullName}</td>
                                        <td>{player?.position}</td>
                                        <td>{player?.sport?.sport}</td>
                                        <td>{player?.team?.name}</td>
                                        <td>
                                            {player?.status ? (
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
                                                    className="btn btn-secondary btn-sm  "
                                                    to={`./${player?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm "
                                                    onClick={() =>
                                                        handleUpdate(player)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(
                                                            player?._id
                                                        )
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
                    </div>
                ) : (
                    <Alert variant="warning">
                        No hay jugadores para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default TableSport
