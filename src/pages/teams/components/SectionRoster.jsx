import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useRemovePlayer } from '../../../features/teams.features'
import FormFilter from '../../comuncomponents/FormFilter'
import TableRemovePlayer from '../../comuncomponents/TableRemovePlayer'

const SectionRoster = ({ team }) => {
    const removePlayer = useRemovePlayer(team?._id)
    const [dataFilter, setDataFilter] = useState('')

    const handleRemove = (id, playerId) => {
        const sure = confirm('Estas seguro que deseas borrar?')
        if (sure) return removePlayer.mutate({ id, data: { playerId } })
    }
    const filter = team?.players?.filter((player) => {
        if (dataFilter)
            return player?.playerId?.fullName
                ?.toLowerCase()
                .includes(dataFilter?.toLowerCase())
        else return player
    })

    return (
        <>
            <section>
                <h5>Plantilla</h5>
                <FormFilter
                    name={'jugador'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

                {filter?.length > 0 ? (
                    <TableRemovePlayer
                        team={team}
                        players={filter}
                        handleRemove={handleRemove}
                    />
                ) : (
                    <Alert variant="warning">
                        No hay jugadores para mostar!
                    </Alert>
                )}
            </section>
        </>
    )
}
export default SectionRoster
