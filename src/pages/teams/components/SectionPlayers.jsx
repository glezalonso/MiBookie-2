import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Button, Table, Alert, FormControl } from 'react-bootstrap'
import Loading from '../../../ui/Loading'
import { useGetPlayerBySport } from '../../../features/players.features'
import { useAddPlayer } from '../../../features/teams.features'

const SectionPlayers = ({ team }) => {
    const addPlayer = useAddPlayer(team?._id)
    const {
        data: players,
        isLoading,
        isError,
    } = useGetPlayerBySport(team?.sport?._id)

    const [dataFilter, setDataFilter] = useState('')

    const handleAdd = (id, playerId) => {
        addPlayer.mutate({ id, body: { playerId } })
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los jugadores!')

    // players without team
    const playerFilter = players?.filter(
        (player) => player?.team === undefined || player?.team === null
    )

    // Filter ser
    const filter = playerFilter?.filter((player) => {
        if (dataFilter)
            return player?.fullName
                ?.toLowerCase()
                .includes(dataFilter?.toLowerCase())
        else return player
    })

    return (
        <>
            <section>
                <h5 className="h7 ">Jugadores de {team?.sport?.sport}</h5>
                <div className="mx-2 my-3">
                    <FormControl
                        style={{ fontSize: '13px' }}
                        placeholder="Nombre..."
                        name="player"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {filter?.length > 0 ? (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Jugador</th>
                                    <th>Posición</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((player) => (
                                    <tr key={player?._id}>
                                        <td>{player?.fullName}</td>
                                        <td>{player?.position}</td>
                                        <td>
                                            {' '}
                                            <Button
                                                style={{ fontSize: '13px' }}
                                                variant="warning btn-sm p-1"
                                                onClick={() =>
                                                    handleAdd(
                                                        team?._id,
                                                        player?._id
                                                    )
                                                }
                                            >
                                                Agregar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
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
