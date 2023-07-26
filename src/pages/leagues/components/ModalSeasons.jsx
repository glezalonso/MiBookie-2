import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { validateSeason } from '../../../helpers/validations'

const ModalSeasons = ({
    league,
    season,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
}) => {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            season: season?.season || '',
            description: season?.description || '',
            status: season?.status || '',
            league: league?._id || '',
            sport: league?.sport?._id || '',
        },
        validate: validateSeason,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            action.mutate(
                !season?._id ? values : { id: season?._id, body: values }
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
                    <Modal.Title>{type} temporada</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nombre de temporada</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('season')}
                                type="text"
                                id="season"
                                name="season"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('description')}
                                type="text"
                                id="description"
                                name="description"
                            ></FormControl>
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
                            {type} temporada
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalSeasons
