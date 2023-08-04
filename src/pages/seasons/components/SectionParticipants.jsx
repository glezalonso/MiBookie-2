import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useRemoveTeam } from '../../../features/seasons.features'
import FormFilter from '../../comuncomponents/FormFilter'
import TableParticipants from './TableParticipants'

const SectionParticipants = ({ season }) => {
    const [dataFilter, setDataFilter] = useState('')

    const removeTeam = useRemoveTeam(season?._id)

    const handleRemove = (id, team) => {
        const sure = confirm('Estas seguro que quieres remover el equipo?')
        if (sure) return removeTeam.mutate({ id, data: { team } })
    }
    const filter = season?.standings?.filter((teams) => {
        if (dataFilter)
            return teams?.team?.name
                ?.toLowerCase()
                .includes(dataFilter?.toLowerCase())
        else return teams
    })

    return (
        <>
            <section>
                <h5>Participantes</h5>
                <FormFilter
                    name={'equipo'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

                {filter?.length > 0 ? (
                    <TableParticipants
                        season={season}
                        teams={filter}
                        handleRemove={handleRemove}
                    />
                ) : (
                    <Alert variant="warning">
                        No hay equipos participantes!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionParticipants
