import React, { useState } from 'react'
import { useGetTeamsBySport } from '../../../features/teams.features'
import { toast } from 'react-hot-toast'
import { Alert } from 'react-bootstrap'
import { useAddTeam } from '../../../features/seasons.features'
import Loading from '../../../ui/Loading'
import TableTeams from './TableTeams'
import FormFilter from '../../comuncomponents/FormFilter'

const SectionTeams = ({ season }) => {
    const {
        data: teams,
        isLoading,
        isError,
    } = useGetTeamsBySport(season?.sport?._id)
    const addTeam = useAddTeam()
    const [dataFilter, setDataFilter] = useState('')

    const handleAdd = (id, team) => {
        addTeam.mutate({ id, body: { team } })
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los equipos!')

    const filter = teams?.filter((team) => {
        if (dataFilter)
            return team?.name?.toLowerCase().includes(dataFilter?.toLowerCase())
        else return team
    })

    return (
        <>
            <section>
                <h5>Equipos {season?.sport?.sport}</h5>
                <FormFilter
                    name={'equipo'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

                {filter?.length > 0 ? (
                    <TableTeams
                        season={season}
                        teams={filter}
                        handleAdd={handleAdd}
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
