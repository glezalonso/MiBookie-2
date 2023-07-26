import React, { useState } from 'react'
import { Table, Button, Alert, ButtonGroup } from 'react-bootstrap'
import ModalRounds from './ModalRounds'
import { Link } from 'react-router-dom'
import {
    useCreateRound,
    useDeleteRound,
    useGetRoundsBySeason,
    useUpdateRound,
} from '../../../features/rounds.features'

const SectionRounds = ({ season }) => {
    const { data: rounds } = useGetRoundsBySeason(season?._id)
    const createRound = useCreateRound()
    const updateRound = useUpdateRound()
    const deleteRound = useDeleteRound()

    const [modalShow, setModalShow] = useState(false)
    const [round, setRound] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Want to delete?')
        if (sure) return deleteRound.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setRound(data)
        setUpdate(true)
    }

    rounds?.sort((a, b) => b.status - a.status)
    return (
        <>
            <section>
                <h5>
                    Jornadas
                    <Button
                        variant="warning mx-1 my-1 btn-sm"
                        onClick={handleShow}
                    >
                        Crear jornada
                    </Button>
                </h5>
                {!update ? (
                    <ModalRounds
                        season={season}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createRound}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalRounds
                        round={round}
                        season={season}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateRound}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                {rounds?.length > 0 ? (
                    <div className="data-tables bg-dark rounded p-1 myl1">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Jornada</th>
                                    <th>Estatus</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rounds?.map((round) => (
                                    <tr key={round?._id}>
                                        <td>{round?.round}</td>
                                        <td>
                                            {round?.status ? (
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
                                                    className="btn btn-secondary btn-sm  "
                                                    to={`../rounds/${round?._id}`}
                                                >
                                                    Detalles
                                                </Link>
                                                <Button
                                                    className="btn btn-warning btn-sm "
                                                    onClick={() =>
                                                        handleUpdate(round)
                                                    }
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    className="btn btn-danger btn-sm  "
                                                    onClick={() =>
                                                        handleDelete(round?._id)
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
                        No hay jornadas para mostar!
                    </Alert>
                )}
            </section>
        </>
    )
}
export default SectionRounds
