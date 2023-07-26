import React, { useState } from 'react'
import { FormControl, Alert, Table, Button } from 'react-bootstrap'
import { useRemoveTeam } from '../../../features/seasons.features'

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
                <div className="mx-2 my-3">
                    <FormControl
                        size="sm"
                        placeholder="Buscar equipo..."
                        name="team"
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
                                    <th>Equipos</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((team) => (
                                    <tr key={team?.team?._id}>
                                        <td>{team?.team?.name}</td>
                                        <td>
                                            {' '}
                                            <Button
                                                style={{ fontSize: '13px' }}
                                                variant="danger btn-sm"
                                                onClick={() =>
                                                    handleRemove(
                                                        season?._id,
                                                        team?._id
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
                        No hay equipos participantes!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionParticipants
