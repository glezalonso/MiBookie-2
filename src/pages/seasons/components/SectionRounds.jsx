import React, { useState } from 'react'
import {
    useCreateRound,
    useDeleteRound,
    useGetRoundsBySeason,
    useUpdateRound,
} from '../../../features/rounds.features'
import { Button, Alert } from 'react-bootstrap'
import ModalRounds from './ModalRounds'
import TableRounds from './TableRounds'

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
                    <TableRounds
                        rounds={rounds}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
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
