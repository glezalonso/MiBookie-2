import React, { useState } from 'react'
import { Table, Alert, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetMatchesByTeam } from '../../../features/matches.features'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionNextMatches = ({ team }) => {
    const { data: matches, isLoading, isError } = useGetMatchesByTeam(team?._id)
    const [dataFilter, setDataFilter] = useState('')

    const nextMatches = matches?.filter((match) => match?.status === true)

    if (isLoading) return <Loading />
    if (isError)
        return toast.error('Hubo un error al cargar los juegos del día')
    // filter by user
    const filter = nextMatches?.filter((match) => {
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
                <h5 className="h7 ">Próximos partidos</h5>
                <div className="mx-2 my-3">
                    <FormControl
                        style={{ fontSize: '11px' }}
                        placeholder="Busca por equipo, temporada, jornada.."
                        name="filter"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {filter?.length > 0 ? (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar rounded">
                        <Table
                            style={{ fontSize: '11px' }}
                            responsive
                            variant="dark table-sm table-borderless"
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
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((match) => (
                                    <tr key={match._id}>
                                        <td>
                                            {match?.date
                                                ?.split('T', 3)
                                                .join(' ')}
                                        </td>
                                        <td>{match?.league?.league}</td>
                                        <td>{match?.season?.season}</td>
                                        <td>{match?.round?.round}</td>
                                        <td>{match?.local?.name} </td>
                                        <td>{match?.away?.name} </td>
                                        <td>
                                            <Link
                                                style={{ fontSize: '11px' }}
                                                className="btn btn-warning btn-sm"
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

export default SectionNextMatches
