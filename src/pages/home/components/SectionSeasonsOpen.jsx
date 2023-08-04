import React from 'react'
import { Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useGetSeasonsOpen } from '../../../features/seasons.features'
import Loading from '../../../ui/Loading'
import TableSeasons from '../../comuncomponents/TableSeasons'

const SectionSeasonsOpen = () => {
    const { data: seasons, isLoading, isError } = useGetSeasonsOpen()

    if (isLoading) return <Loading />
    if (isError)
        return toast.error('Hubo un error al cargar los juegos del día')

    return (
        <>
            <section>
                <h5>Temporadas abiertas</h5>
                {seasons?.length > 0 ? (
                    <TableSeasons seasons={seasons} />
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
