import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { validateMatch } from '../../../helpers/validations'

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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            date: match?.date || '',
            teamHome: match?.local?._id || '',
            teamAway: match?.away?._id || '',
            oddHome: match?.oddHome || '',
            oddAway: match?.oddAway || '',
            oddDraw: match?.oddDraw || '',
            oddOverUnder: match?.oddOverUnder || '',
            round: round?._id,
            league: round?.league?._id,
            season: round?.season?._id,
            sport: round?.sport?._id,
            status: match?.status || '',
            moreImportant: match?.moreImportant || '',
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
                            <Form.Label>Cuota Local</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('oddHome')}
                                type="text"
                                id="oddHome"
                                name="oddHome"
                            ></FormControl>
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
                            <Form.Label>Cuota Visita</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('oddAway')}
                                type="text"
                                id="oddAway"
                                name="oddAway"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cuota empate</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('oddDraw')}
                                type="text"
                                id="oddDraw"
                                name="oddDraw"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cuota total</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('oddOverUnder')}
                                type="text"
                                id="oddOverUnder"
                                name="oddOverUnder"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Importante?</Form.Label>
                            <Form.Select
                                id="moreImportant"
                                name="moreImportant"
                                {...formik.getFieldProps('moreImportant')}
                            >
                                <option value={false}>Es importante?</option>
                                <option value={true}>Si</option>
                                <option value={false}>No</option>
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
