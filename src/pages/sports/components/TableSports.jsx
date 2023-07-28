import React, { useState } from 'react'
import {
    useCreateSport,
    useDeleteSport,
    useUpdateSport,
    useGetSports,
} from '../../../features/sports.features'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ModalSports from './ModalSports'
import Loading from '../../../ui/Loading'

const TableSport = () => {
    const { data: sports, isLoading, isError } = useGetSports()
    const createSport = useCreateSport()
    const updateSport = useUpdateSport()
    const deleteSport = useDeleteSport()

    const [modalShow, setModalShow] = useState(false)
    const [sport, setSport] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteSport.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setSport(data)
        setUpdate(true)
    }
    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los deportes!')

    return (
        <>
            <section>
                <h5>
                    Deportes
                    <Button
                        variant="warning mx-1 btn-sm my-1 "
                        onClick={handleShow}
                    >
                        Crear deporte
                    </Button>
                </h5>
                {!update ? (
                    <ModalSports
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createSport}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalSports
                        sport={sport}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateSport}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                <div className="data-tables bg-dark rounded p-1 my-1">
                    {sports?.length > 0 ? (
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Deporte</th>
                                    <th>Description</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sports?.map((sport) => (
                                    <tr key={sport?._id}>
                                        <td>{sport?.sport}</td>
                                        <td>{sport?.description}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    className="btn btn-secondary btn-sm  "
                                                    to={`./${sport?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm "
                                                    onClick={() =>
                                                        handleUpdate(sport)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm  "
                                                    onClick={() =>
                                                        handleDelete(sport?._id)
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
                            No hay deportes para mostrar!
                        </Alert>
                    )}
                </div>
            </section>
        </>
    )
}

export default TableSport
