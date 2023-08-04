import React, { useState } from 'react'
import {
    useCreateMatch,
    useDeleteMatch,
    useUpdateMatch,
    useGetMatchesByRound,
} from '../../../features/matches.features'
import { toast } from 'react-hot-toast'
import { Button, Alert } from 'react-bootstrap'
import ModalMatches from './ModalMatches'
import Loading from '../../../ui/Loading'
import TableMatches from '../../comuncomponents/TableMatches'
import FormFilter from '../../comuncomponents/FormFilter'

const SectionMatches = ({ round }) => {
    const {
        data: matches,
        isLoading,
        isError,
    } = useGetMatchesByRound(round?._id)
    const [dataFilter, setDataFilter] = useState('')
    const createMatch = useCreateMatch()
    const updateMatch = useUpdateMatch()
    const deleteMatch = useDeleteMatch()

    const [modalShow, setModalShow] = useState(false)
    const [match, setMatch] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleDelete = (id) => {
        const sure = confirm('Esta seguro que desea borrar?')
        if (sure) return deleteMatch.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setMatch(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los partidos!')

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

    return (
        <>
            <section>
                <h5>
                    Partidos
                    <Button
                        variant="warning mx-2 my-1 btn-sm"
                        onClick={handleShow}
                    >
                        Crear partido
                    </Button>
                </h5>
                {!update ? (
                    <ModalMatches
                        round={round}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createMatch}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalMatches
                        round={round}
                        match={match}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateMatch}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}
                <FormFilter
                    name={'equipo'}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />

                {filter?.length > 0 ? (
                    <TableMatches
                        match={filter}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                ) : (
                    <Alert variant="warning">
                        There is no information to show!
                    </Alert>
                )}
            </section>
        </>
    )
}
export default SectionMatches
