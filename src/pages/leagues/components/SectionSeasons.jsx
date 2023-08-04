import React, { useState } from 'react'
import { Button, Alert } from 'react-bootstrap'
import {
    useCreateSeason,
    useDeleteSeason,
    useGetSeasonsByLeague,
    useUpdateSeason,
} from '../../../features/seasons.features'
import ModalSeasons from './ModalSeasons'
import Loading from '../../../ui/Loading'
import TableSeasons from '../../comuncomponents/TableSeasons'

const SectionSeasons = ({ league }) => {
    const { data: seasons, isLoading } = useGetSeasonsByLeague(league?._id)
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
    if (isLoading) return <Loading />

    seasons?.sort((a, b) => b.status - a.status)
    return (
        <>
            <section>
                <h5>
                    Temporadas
                    <Button
                        variant="warning mx-1 my-1 btn-sm"
                        onClick={handleShow}
                    >
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

                {seasons?.length > 0 ? (
                    <TableSeasons
                        seasons={seasons}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
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
