import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'

const ModalBookies = ({ bookie, modalShow, handleClose, action }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: bookie?.username || '',
      password: bookie?.password || '',
      email: bookie?.email || '',
      fullName: bookie?.fullName || ''
    },
    validate: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      action.mutate({ id: bookie?._id, body: values })
      formik.resetForm()
      handleClose()
    }
  })

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Editar bookie</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control {...formik.getFieldProps('username')} type="text" id="username" name="username" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>COntraseña</Form.Label>
                            <Form.Control {...formik.getFieldProps('password')} type="password" id="password" name="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                            <Form.Control {...formik.getFieldProps('email')} type="email" id="email" name="email"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre completo</Form.Label>
                            <Form.Control {...formik.getFieldProps('fullName')} type="text" id="fullName" name="fullName"></Form.Control>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="dark" onClick={() => handleClose()}>Cerrar</Button>
                <Button variant="warning" type="submit">Editar bookie</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalBookies
