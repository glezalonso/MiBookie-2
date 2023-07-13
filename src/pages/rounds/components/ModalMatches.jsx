import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { validateMatch } from '../../../helpers/validations'
import { useGetRounds } from '../../../features/rounds.features'
import { useGetSeason } from '../../../features/seasons.features'

const ModalMatches = ({
    round,
    match,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
}) => {
    const { data: season } = useGetSeason(round?.season?._id)
    const { data: rounds } = useGetRounds()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: match?.date || '',
            teamHome: match?.local?._id || '',
            teamAway: match?.away?._id || '',
            round: round?._id,
            league: round?.league?._id,
            season: round?.season?._id,
            sport: round?.sport?._id,
            status: match?.status || '',
        },
        validate: validateMatch,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            action.mutate(
                !match?._id ? values : { id: match?._id, body: values }
            )
            formik.resetForm()
            handleClose()
            setUpdate(false)
        },
    })

    const handleCloseUpdate = () => {
        formik.resetForm()
        setUpdate(false)
        handleClose()
    }

    return (
        <>
            <Modal
                className="text-dark"
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>{type} partido</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Fecha</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('date')}
                                type="datetime-local"
                                id="date"
                                name="date"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Equipo local</Form.Label>
                            <Form.Select
                                id="teamHome"
                                name="teamHome"
                                {...formik.getFieldProps('teamHome')}
                            >
                                <option value={false}>
                                    Selecciona el equipo local
                                </option>
                                {season?.standings?.map((teams) => (
                                    <option
                                        key={teams?.team?._id}
                                        value={teams?.team?._id}
                                    >
                                        {teams?.team?.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Equipo visitante</Form.Label>
                            <Form.Select
                                id="teamAway"
                                name="teamAway"
                                {...formik.getFieldProps('teamAway')}
                            >
                                <option value={false}>
                                    Selecciona el equipo visitante
                                </option>
                                {season?.standings?.map((teams) => (
                                    <option
                                        key={teams?.team?._id}
                                        value={teams?.team?._id}
                                    >
                                        {teams?.team?.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Jornada:</Form.Label>
                            <Form.Select
                                id="round"
                                name="round"
                                {...formik.getFieldProps('round')}
                                disabled
                            >
                                <option value={false}>
                                    Selecciona la jornada{' '}
                                </option>
                                {rounds?.map((round) => (
                                    <option key={round?._id} value={round?._id}>
                                        {round?.round}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Estatus</Form.Label>
                            <Form.Select
                                id="status"
                                name="status"
                                {...formik.getFieldProps('status')}
                            >
                                <option>Selecciona el estatus</option>
                                <option value={true}>Activo</option>
                                <option value={false}>Inactivo</option>
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="dark"
                            onClick={() => handleCloseUpdate()}
                        >
                            Cerrar
                        </Button>
                        <Button variant="warning" type="submit">
                            {type} partido
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalMatches
