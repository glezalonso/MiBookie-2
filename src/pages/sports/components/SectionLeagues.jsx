import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import ModalLeagues from './ModalLeagues'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'
import {
    useCreateLeague,
    useDeleteLeague,
    useGetLeaguesBySport,
    useUpdateLeague,
} from '../../../features/leagues.features'

const SectionLeagues = ({ sport }) => {
    const {
        data: leagues,
        isLoading,
        isError,
    } = useGetLeaguesBySport(sport?._id)
    const createLeague = useCreateLeague()
    const updateLeague = useUpdateLeague()
    const deleteLeague = useDeleteLeague()

    const [modalShow, setModalShow] = useState(false)
    const [league, setLeague] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteLeague.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setLeague(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los deportes!')
    return (
        <>
            <section>
                <h5>
                    Ligas{' '}
                    <Button variant="warning mx-2 btn-sm" onClick={handleShow}>
                        Crear liga
                    </Button>
                </h5>
                {!update ? (
                    <ModalLeagues
                        sportId={sport?._id}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createLeague}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalLeagues
                        league={league}
                        sportId={sport?._id}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateLeague}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}

                {leagues?.length > 0 ? (
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
                                    <th>Liga</th>
                                    <th>Descripción</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leagues?.map((league) => (
                                    <tr key={league._id}>
                                        <td>{league?.league}</td>
                                        <td>{league?.description}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    className="btn btn-secondary btn-sm mx-1 rounded "
                                                    to={`../leagues/${league?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm mx-1 rounded"
                                                    onClick={() =>
                                                        handleUpdate(league)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm  mx-1 rounded"
                                                    onClick={() =>
                                                        handleDelete(
                                                            league?._id
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
                    <Alert variant="warning">No hay ligas para mostrar!</Alert>
                )}
            </section>
        </>
    )
}
export default SectionLeagues
