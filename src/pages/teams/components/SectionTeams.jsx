import React, { useState } from 'react'
import {
    useDeleteTeam,
    useCreateTeam,
    useUpdateTeam,
    useGetTeams,
} from '../../../features/teams.features'
import { Button, Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import Loading from '../../../ui/Loading'
import ModalTeams from './ModalTeams'
import TableTeams from './TableTeams'
import FormFilter from '../../comuncomponents/FormFilter'

const SectionTeams = () => {
    const { data: teams, isLoading, isError } = useGetTeams()
    const createTeam = useCreateTeam()
    const deleteTeam = useDeleteTeam()
    const updateTeam = useUpdateTeam()

    const [dataFilter, setDataFilter] = useState('')

    const [modalShow, setModalShow] = useState(false)
    const [team, setTeam] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteTeam.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setTeam(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los equipos!')

    const filter = teams.filter((team) => {
        if (dataFilter)
            return team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
        else return team
    })

    return (
        <>
            <section>
                <h5>
                    Equipos
                    <Button
                        className="btn btn-warning btn-sm my-1 mx-1"
                        onClick={handleShow}
                    >
                        Crear equipo
                    </Button>
                </h5>
                <FormFilter
                    name={'equipo'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />
                {!update ? (
                    <ModalTeams
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createTeam}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalTeams
                        team={team}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateTeam}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                {filter?.length > 0 ? (
                    <TableTeams
                        teams={filter}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <Alert variant="warning">
                        No hay equipos para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionTeams
