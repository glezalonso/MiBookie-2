import React, { useState } from 'react'
import { Table, Alert, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetMatchesByTeam } from '../../../features/matches.features'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionMatches = ({ team }) => {
    const { data: matches, isLoading, isError } = useGetMatchesByTeam(team?._id)
    const [dataFilter, setDataFilter] = useState('')

    const lastMatches = matches?.filter((match) => match?.status === false)

    if (isLoading) return <Loading />
    if (isError)
        return toast.error('Hubo un error al cargar los juegos del día')
    // filter by user
    const filter = lastMatches?.filter((match) => {
        if (dataFilter)
            return (
                match?.round?.round
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                match?.season?.season
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                match?.away?.name
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase())
            )
        else return match
    })
    return (
        <>
            <section>
                <h5 className="h7 ">Juegos previos</h5>
                <div className="mx-2 my-3">
                    <FormControl
                        placeholder="Busca por equipo, temporada, jornada.."
                        style={{ fontSize: '12px' }}
                        name="team"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {filter?.length > 0 ? (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar rounded">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Fecha</th>
                                    <th>Liga</th>
                                    <th>Temporada</th>
                                    <th>Jornada</th>
                                    <th>Local</th>
                                    <th>Visitante</th>
                                    <th>Marcador</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((match) => (
                                    <tr key={match._id}>
                                        <td>{match?.date?.split('T')[0]}</td>
                                        <td>{match?.league?.league}</td>
                                        <td>{match?.season?.season}</td>
                                        <td>{match?.round?.round}</td>
                                        <td>{match?.local?.name}</td>
                                        <td>{match?.away?.name}</td>
                                        <td>
                                            {match?.score?.map(
                                                (score) => score.local
                                            )}
                                            -{' '}
                                            {match?.score?.map(
                                                (score) => score.away
                                            )}
                                        </td>
                                        <td>
                                            <Link
                                                style={{ fontSize: '11px' }}
                                                className="btn btn-warning btn-sm p-1"
                                                to={`/matches/${match?._id}`}
                                            >
                                                Detalles
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <Alert variant="warning">
                        No hay partidos para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionMatches
