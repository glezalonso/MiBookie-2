import React from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'

import { useAuthStore } from '../../../store/auth'
import { useGetLeagues } from '../../../features/leagues.features'

const ModalNews = ({
    content,
    modalShow,
    handleClose,
    action,
    type,
    setUpdate,
}) => {
    const { profile } = useAuthStore((state) => state)
    const { data: leagues } = useGetLeagues()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sport: content?.sport?._id || '',
            league: content?.league || '',
            title: content?.title || '',
            date: content?.date || '',
            content: content?.content || '',
            author: profile,
        },
        validate: false,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            action.mutate(
                !content?._id ? values : { id: content?._id, body: values }
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
                    <Modal.Title>{type} noticia</Modal.Title>
                </Modal.Header>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Liga:</Form.Label>
                            <Form.Select
                                id="league"
                                name="league"
                                {...formik.getFieldProps('league')}
                            >
                                <option value={false}>
                                    Selecciona la liga
                                </option>
                                {leagues?.map((league) => (
                                    <option
                                        key={league?._id}
                                        value={league?._id}
                                    >
                                        {league?.league}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
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
                            <Form.Label>Título</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('title')}
                                type="text"
                                id="title"
                                name="title"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Contenido</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('content')}
                                as="textarea"
                                rows={3}
                                id="content"
                                name="content"
                            ></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Autor</Form.Label>
                            <FormControl
                                {...formik.getFieldProps('author')}
                                type="text"
                                id="author"
                                name="author"
                                disabled
                            ></FormControl>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="warning"
                            onClick={() => handleCloseUpdate()}
                        >
                            Cerrar
                        </Button>
                        <Button variant="dark" type="submit">
                            {type} noticia
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default ModalNews
