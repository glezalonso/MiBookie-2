import React, { useState } from 'react'
import {
    useCreateSport,
    useDeleteSport,
    useUpdateSport,
    useGetSports,
} from '../../../features/sports.features'
import { Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import ModalSports from './ModalSports'
import Loading from '../../../ui/Loading'
import TableSports from './TableSports'

const SectionSport = () => {
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

                {sports?.length > 0 ? (
                    <TableSports
                        sports={sports}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <Alert variant="warning">
                        No hay deportes para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionSport
