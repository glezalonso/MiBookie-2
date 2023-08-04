import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useGetPlayersTeamless } from '../../../features/players.features'
import { useAddPlayer } from '../../../features/teams.features'
import Loading from '../../../ui/Loading'
import FormFilter from '../../comuncomponents/FormFilter'
import TableAddPlayer from '../../comuncomponents/TableAddPlayer'

const SectionPlayers = ({ team }) => {
    const addPlayer = useAddPlayer(team?._id)
    const {
        data: players,
        isLoading,
        isError,
    } = useGetPlayersTeamless(team?.sport?._id)

    const [dataFilter, setDataFilter] = useState('')

    const handleAdd = (id, playerId) => {
        addPlayer.mutate({ id, body: { playerId } })
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los jugadores!')

    // Filter user
    const filter = players?.filter((player) => {
        if (dataFilter)
            return player?.fullName
                ?.toLowerCase()
                .includes(dataFilter?.toLowerCase())
        else return player
    })

    return (
        <>
            <section>
                <h5>Jugadores de {team?.sport?.sport}</h5>
                <FormFilter
                    name={'jugador'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />
                {filter?.length > 0 ? (
                    <TableAddPlayer
                        team={team}
                        players={filter}
                        handleAdd={handleAdd}
                    />
                ) : (
                    <Alert variant="warning">
                        There is no information to show!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionPlayers
