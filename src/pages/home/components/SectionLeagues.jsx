import React from 'react'
import { useGetLeagues } from '../../../features/leagues.features'
import { Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import Loading from '../../../ui/Loading'
import TableLeagues from '../../comuncomponents/TableLeagues'

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
                    <TableLeagues leagues={leagues} />
                ) : (
                    <Alert variant="warning">No hay ligas para mostrar!</Alert>
                )}
            </section>
        </>
    )
}

export default SectionLeagues
