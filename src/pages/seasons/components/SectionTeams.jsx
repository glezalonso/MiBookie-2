import React, { useState } from 'react'
import { useGetTeamsBySport } from '../../../features/teams.features'
import Loading from '../../../ui/Loading'
import toast from 'react-hot-toast'
import { FormControl, Table, Alert, Button } from 'react-bootstrap'
import { useAddTeam } from '../../../features/seasons.features'

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
                <h5 className="h7">Equipos {season?.sport?.sport}</h5>
                <div className="mx-2 my-3">
                    <FormControl
                        style={{ fontSize: '13px' }}
                        placeholder="Buscar equipo..."
                        name="team"
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
                                    <th>Equipo</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((team) => (
                                    <tr key={team?._id}>
                                        <td>{team?.name}</td>
                                        <td>
                                            {' '}
                                            <Button
                                                style={{ fontSize: '13px' }}
                                                variant="warning btn-sm"
                                                onClick={() =>
                                                    handleAdd(
                                                        season?._id,
                                                        team?._id
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
                        No hay equipos para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}
export default SectionTeams
