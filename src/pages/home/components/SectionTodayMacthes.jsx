import React, { useState } from 'react'
import { Alert, Badge } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import { useGetMatchesToday } from '../../../features/matches.features'
import formatedDate from '../../../utils/formatedDate'
import Loading from '../../../ui/Loading'
import TableMatches from '../../comuncomponents/TableMatches'
import FormFilter from '../../comuncomponents/FormFilter'

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
                <h5>
                    Partidos de hoy
                    <Badge bg="dark" className="mx-1">
                        {matches?.length}
                    </Badge>
                </h5>
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
export default SectionTodayMatches
