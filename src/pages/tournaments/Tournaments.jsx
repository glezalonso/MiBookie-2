import React, { useState } from 'react'
import {
    useGetTournaments,
    useCreateTournament,
    useUpdateTournament,
} from '../../features/tournaments.features'
import {
    Container,
    Row,
    Col,
    Table,
    Button,
    ButtonGroup,
} from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import Navigate from '../../ui/Navigate'
import Loading from '../../ui/Loading'
import ModalTournament from './components/ModalTournament'
import EditButton from '../comuncomponents/EditButton'

const Tournaments = () => {
    const { data: tournaments, isLoading, isError } = useGetTournaments()
    const createTournament = useCreateTournament()
    const updateTournament = useUpdateTournament()

    const [modalShow, setModalShow] = useState(false)
    const [tournament, setTournament] = useState([])
    const [update, setUpdate] = useState(false)

    const handleClose = () => setModalShow(false)
    const handleShow = () => setModalShow(true)

    const handleUpdate = (data) => {
        handleShow()
        setTournament(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar los torneos!')

    return (
        <>
            <Navigate />
            <Container fluid className="p-0">
                <Row className="my-2 mx-">
                    <Col xs={12} lg={8} className="  mx-auto">
                        <h5>
                            Torneo
                            <Button
                                className="btn btn-warning btn-sm my-1 mx-1"
                                onClick={handleShow}
                            >
                                Crear torneo
                            </Button>
                        </h5>
                        {!update ? (
                            <ModalTournament
                                modalShow={modalShow}
                                handleClose={handleClose}
                                action={createTournament}
                                type={'Crear'}
                                setUpdate={setUpdate}
                            />
                        ) : (
                            <ModalTournament
                                tournament={tournament}
                                modalShow={modalShow}
                                handleClose={handleClose}
                                action={updateTournament}
                                type={'Editar'}
                                setUpdate={setUpdate}
                            />
                        )}
                        <div className="data-tables bg-light p-1 my-1 rounded">
                            <Table
                                className="my-1"
                                size="sm"
                                responsive
                                variant="light"
                                hover
                                borderless
                            >
                                <thead>
                                    <tr>
                                        <th>Torneo</th>
                                        <th>Estatus</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tournaments?.map((tournament) => (
                                        <tr key={tournament?._id}>
                                            <td>
                                                {tournament?.season?.season}
                                            </td>
                                            <td>
                                                {tournament?.status
                                                    ? 'abierto'
                                                    : 'cerrado'}
                                            </td>
                                            <td>
                                                <ButtonGroup>
                                                    <EditButton
                                                        data={tournament}
                                                        handleUpdate={
                                                            handleUpdate
                                                        }
                                                    />
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Tournaments
