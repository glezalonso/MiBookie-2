import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useCloseMatch } from '../../../features/matches.features'

const ModalScore = ({ match, modalShow, handleClose }) => {
    const closeMatch = useCloseMatch()
    const navigate = useNavigate()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            local: '',
            away: '',
        },
        validate: false,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            closeMatch.mutate({ id: match?._id, body: values })
            formik.resetForm()
            handleClose()
            navigate(`../rounds/${match?.round?._id}`)
        },
    })

    return (
        <>
            <Modal
                className="text-dark"
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Colocar marcador</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor="local">
                                {' '}
                                {match?.local?.name} :
                            </Form.Label>
                            <FormControl
                                {...formik.getFieldProps('local')}
                                type="number"
                                id="local"
                                name="local"
                                placeholder="Marcador equipo local"
                            ></FormControl>
                        </Form.Group>
                        <Form.Label htmlFor="away">
                            {match?.away?.name} :
                        </Form.Label>
                        <FormControl
                            {...formik.getFieldProps('away')}
                            type="number"
                            id="away"
                            name="away"
                            placeholder="Marcador equipo visitante"
                        ></FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={() => handleClose()}>
                            Cerrar
                        </Button>
                        <Button variant="warning" type="submit">
                            Colocar marcador
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalScore
