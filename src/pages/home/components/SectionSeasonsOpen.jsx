import React from 'react'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetSeasons } from '../../../features/seasons.features'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionSeasonsOpen = () => {
    const { data: seasons, isLoading, isError } = useGetSeasons()
    const SeasonsOpen = seasons?.filter((season) => season?.status === true)

    if (isLoading) return <Loading />
    if (isError)
        return toast.error('Hubo un error al cargar los juegos del día')

    return (
        <>
            <section>
                <h5 className="h7">Temporadas abiertas</h5>
                {SeasonsOpen?.length > 0 ? (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar rounded my-3">
                        <Table
                            responsive
                            variant="dark table-sm table-borderless"
                            hover
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Temporada</th>
                                    <th>Liga</th>
                                    <th>Deporte</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SeasonsOpen?.map((season) => (
                                    <tr key={season?._id}>
                                        <td>{season?.season}</td>
                                        <td>{season?.league?.league}</td>
                                        <td>{season?.sport?.sport}</td>
                                        <td>
                                            <Link
                                                to={`../seasons/${season?._id}`}
                                                className="btn btn-sm btn-warning"
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
                        No hay temporadas para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionSeasonsOpen
