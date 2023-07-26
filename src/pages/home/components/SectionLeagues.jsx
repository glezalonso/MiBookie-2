import React from 'react'
import { useGetLeagues } from '../../../features/leagues.features'
import { Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionLeagues = () => {
    const { data: leagues, isLoading, isError } = useGetLeagues()

    if (isLoading) return <Loading />
    if (isError)
        return toast.error('Hubo un error al cargar los juegos del día')

    return (
        <>
            <section>
                <h5 className="h5 ">Ligas</h5>
                {leagues?.length > 0 ? (
                    <div className="data-tables bg-dark p-1 my-1 rounded">
                        <Table
                            className="h-25"
                            size="sm"
                            responsive
                            variant="dark"
                            hover
                            borderless
                        >
                            <thead className="border-bottom">
                                <tr>
                                    <th>Liga</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leagues?.map((league) => (
                                    <tr key={league?._id}>
                                        <td>{league?.league}</td>
                                        <td>
                                            <Link
                                                to={`../leagues/${league?._id}`}
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
                    <Alert variant="warning">No hay ligas para mostrar!</Alert>
                )}
            </section>
        </>
    )
}

export default SectionLeagues
