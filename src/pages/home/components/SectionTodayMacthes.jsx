import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Alert, FormControl } from 'react-bootstrap'
import { useGetMatchesToday } from '../../../features/matches.features'
import formatedDate from '../../../utils/formatedDate'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionTodayMatches = () => {
    const [dataFilter, setDataFilter] = useState('')
    const date = formatedDate()

    const { data: matches, isLoading, isError } = useGetMatchesToday(date)

    if (isLoading) return <Loading />
    if (isError)
        return toast.error('Hubo un error al cargar los juegos del día')

    const filter = matches?.filter((team) => {
        if (dataFilter)
            return (
                team?.local?.name
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                team?.away?.name
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase())
            )
        else return team
    })

    filter?.sort((a, b) => b.status - a.status)
    return (
        <>
            <section>
                <h5 className="h7 ">Partidos de hoy ({matches?.length})</h5>
                <div className="mx-auto my-3">
                    <FormControl
                        style={{ fontSize: '13px' }}
                        className="mb-3"
                        placeholder="Buscar equipo..."
                        name="team"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {filter?.length > 0 ? (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar p-1">
                        <Table
                            responsive
                            size="sm"
                            borderless
                            variant="dark"
                            hover
                        >
                            <caption className="m-1 text-light">
                                Total: {filter?.length} partidos
                            </caption>
                            <thead className="border-bottom">
                                <tr>
                                    <th>Hora</th>
                                    <th>Liga</th>
                                    <th>Jornada</th>
                                    <th>Local</th>
                                    <th>Visitante</th>
                                    <th>Estatus</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter?.map((match) => (
                                    <tr key={match?._id}>
                                        <td>{match?.date?.split('T', 3)[1]}</td>
                                        <td>{match?.league?.league}</td>

                                        <td>{match?.round?.round}</td>
                                        <td>
                                            {match?.local.name}
                                            <strong>
                                                {' '}
                                                {match?.score?.map(
                                                    (score) => score?.local
                                                )}
                                            </strong>
                                        </td>
                                        <td>
                                            {' '}
                                            {match?.away?.name}
                                            <strong>
                                                {' '}
                                                {match?.score?.map(
                                                    (score) => score?.away
                                                )}
                                            </strong>
                                        </td>
                                        <td>
                                            {match?.status ? (
                                                <span className="text-success">
                                                    Abierto!
                                                </span>
                                            ) : (
                                                <span className="text-danger">
                                                    Cerrado!
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <Link
                                                style={{ fontSize: '13px' }}
                                                className="btn  btn-warning btn-sm w-100 "
                                                to={`../matches/${match?._id}`}
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
export default SectionTodayMatches
