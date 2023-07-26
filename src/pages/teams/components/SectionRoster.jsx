import React, { useState } from 'react'
import { Alert, Button, Table, FormControl } from 'react-bootstrap'
import { useRemovePlayer } from '../../../features/teams.features'

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
                <div className=" my-3">
                    <FormControl
                        size="sm"
                        placeholder="Nombre..."
                        name="player"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>

                {filter?.length > 0 ? (
                    <div className="data-tables bg-dark rounded p-1 my-1">
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
                                    <tr key={player?.playerId?._id}>
                                        <td>{player?.playerId?.fullName}</td>
                                        <td>{player?.playerId?.position}</td>
                                        <td>
                                            <Button
                                                style={{ fontSize: '13px' }}
                                                variant="danger btn-sm p-1"
                                                onClick={() =>
                                                    handleRemove(
                                                        team?._id,
                                                        player?.playerId?._id
                                                    )
                                                }
                                            >
                                                Remover
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
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
