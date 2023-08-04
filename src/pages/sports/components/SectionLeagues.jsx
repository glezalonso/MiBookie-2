import React, { useState } from 'react'
import {
    useCreateLeague,
    useGetLeaguesBySport,
    useUpdateLeague,
    useDeleteLeague,
} from '../../../features/leagues.features'
import { Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import ModalLeagues from './ModalLeagues'
import Loading from '../../../ui/Loading'
import TableLeagues from '../../comuncomponents/TableLeagues'

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

    const handleUpdate = (data) => {
        handleShow()
        setLeague(data)
        setUpdate(true)
    }

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteLeague.mutate(id)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los deportes!')
    return (
        <>
            <section>
                <h5>
                    Ligas
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
                    <TableLeagues
                        leagues={leagues}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <Alert variant="warning">No hay ligas para mostrar!</Alert>
                )}
            </section>
        </>
    )
}
export default SectionLeagues
