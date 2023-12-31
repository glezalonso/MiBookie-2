import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'

import { validateSport } from '../../../helpers/validations'

const ModalSports = ({
    sport,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
}) => {
    const [file, setFile] = useState()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sport: sport?.sport || '',
            description: sport?.description || '',
        },
        validate: validateSport,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            values = Object.assign(values, {
                poster: file || '',
            })
            action.mutate(
                !sport?._id ? values : { id: sport?._id, body: values }
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
                    <Modal.Title>{type} deporte</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Deporte</Form.Label>
                            <Form.Control
                                {...formik.getFieldProps('sport')}
                                type="text"
                                id="sport"
                                name="sport"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                {...formik.getFieldProps('description')}
                                type="text"
                                id="description"
                                name="description"
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Poster</Form.Label>
                            <Form.Control
                                type="file"
                                id="poster"
                                name="poster"
                                onChange={(event) =>
                                    setFile(event.target.files[0])
                                }
                            ></Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={handleCloseUpdate}>
                            Cerrar
                        </Button>
                        <Button variant="warning" type="submit">
                            {type} deporte
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalSports
