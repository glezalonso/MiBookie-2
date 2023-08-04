import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useGetMatchesByTeam } from '../../../features/matches.features'
import Loading from '../../../ui/Loading'
import FormFilter from '../../comuncomponents/FormFilter'
import TableMatches from '../../comuncomponents/TableMatches'

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
                <h5>Juegos previos</h5>
                <FormFilter
                    name={'equipo'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

                {filter?.length > 0 ? (
                    <TableMatches match={filter} />
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
