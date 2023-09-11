import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useGetSeasons } from '../../../features/seasons.features'

const ModalTournament = ({
    tournament,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
}) => {
    const { data: seasons } = useGetSeasons()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            season: tournament?.season?._id || '',
            status: tournament?.status || '',
        },
        validate: false,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            action.mutate(
                !tournament?._id
                    ? values
                    : { id: tournament?._id, body: values }
            )
            formik.resetForm()
            handleClose()
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
                    <Modal.Title>{type} Torneo</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Estatus</Form.Label>
                            <Form.Select
                                id="season"
                                name="season"
                                {...formik.getFieldProps('season')}
                            >
                                <option>Selecciona la Temporadas</option>
                                {seasons?.map((season) => (
                                    <option
                                        key={season?._id}
                                        value={season?._id}
                                    >
                                        {season?.season}-{' '}
                                        {season?.league?.league}
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
                        <Button variant="dark" onClick={handleCloseUpdate}>
                            Cerrar
                        </Button>
                        <Button variant="warning" type="submit">
                            {type} Torneo
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalTournament
