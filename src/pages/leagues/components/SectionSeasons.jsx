import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import {
    useCreateSeason,
    useDeleteSeason,
    useGetSeasons,
    useUpdateSeason,
} from '../../../features/seasons.features'
import ModalSeasons from './ModalSeasons'
import { Link } from 'react-router-dom'

const SectionSeasons = ({ league }) => {
    const { data: seasons } = useGetSeasons()
    const createSeason = useCreateSeason()
    const updateSeason = useUpdateSeason()
    const deleteSeason = useDeleteSeason()

    const [modalShow, setModalShow] = useState(false)
    const [season, setSeason] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteSeason.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setSeason(data)
        setUpdate(true)
    }

    const seasonByLeague = seasons?.filter(
        (season) => season?.league?._id === league?._id
    )
    seasonByLeague?.sort((a, b) => b.status - a.status)
    return (
        <>
            <section>
                <h5 className="h7 ">
                    Temporadas{' '}
                    <Button variant="warning mx-1 btn-sm" onClick={handleShow}>
                        Crear temporada
                    </Button>
                </h5>
                {!update ? (
                    <ModalSeasons
                        league={league}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createSeason}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalSeasons
                        league={league}
                        season={season}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateSeason}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}

                {seasonByLeague?.length > 0 ? (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar rounded ">
                        <Table
                            variant="dark table-sm table-borderless my-1"
                            responsive
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Temporada</th>
                                    <th>Liga</th>
                                    <th>Deporte</th>
                                    <th>Estatus</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seasonByLeague?.map((season) => (
                                    <tr key={season?._id}>
                                        <td>{season?.season}</td>
                                        <td>{season?.league?.league}</td>
                                        <td>{season?.sport?.sport}</td>
                                        <td>
                                            {season?.status ? (
                                                <span className="text-success">
                                                    Activo!
                                                </span>
                                            ) : (
                                                <span className="text-danger">
                                                    Inactivo!
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    className="btn btn-secondary btn-sm mx-1 rounded "
                                                    to={`../seasons/${season?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm mx-1 rounded"
                                                    onClick={() =>
                                                        handleUpdate(season)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm  mx-1 rounded"
                                                    onClick={() =>
                                                        handleDelete(
                                                            season?._id
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
                        No hay temporadas para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}
export default SectionSeasons
