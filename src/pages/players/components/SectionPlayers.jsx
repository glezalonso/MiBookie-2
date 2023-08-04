import React, { useState } from 'react'
import {
    useCreatePlayer,
    useDeletePlayer,
    useUpdatePlayer,
    useGetPlayers,
} from '../../../features/players.features'
import { Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import Loading from '../../../ui/Loading'
import ModalPlayers from './ModalPlayers'
import TablePlayers from './TablePlayers'
import FormFilter from '../../comuncomponents/FormFilter'

const SectionPlayers = () => {
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
                <FormFilter
                    name={'jugador'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

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
                    <TablePlayers
                        players={filter}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    ></TablePlayers>
                ) : (
                    <Alert variant="warning">
                        No hay jugadores para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionPlayers
