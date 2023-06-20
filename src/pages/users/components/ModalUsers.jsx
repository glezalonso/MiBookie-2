import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'

const ModalUsers = ({ user, modalShow, handleClose, action, type, setUpdate }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username || '',
      password: user?.password || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      isAdmin: user?.isAdmin || ''
    },
    validate: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      action.mutate((!user?._id) ? values : { id: user?._id, body: values })
      formik.resetForm()
      handleClose()
      setUpdate(false)
    }
  })

  const handleCloseUpdate = () => {
    console.log()
    setUpdate(false)
    handleClose()
  }

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} User</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control {...formik.getFieldProps('username')} type="text" id="username" name="username" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                            <Form.Control {...formik.getFieldProps('password')} type="password" id="password" name="password"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                            <Form.Control {...formik.getFieldProps('email')} type="email" id="email" name="email"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>FullName</Form.Label>
                            <Form.Control {...formik.getFieldProps('fullName')} type="text" id="fullName" name="fullName"></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>is Admin?</Form.Label>
                        <Form.Select id="isAdmin" name="isAdmin"{...formik.getFieldProps('isAdmin')} >
                            <option >is admin?</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Form.Select>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => handleCloseUpdate()}>Close</Button>
                <Button variant="primary" type="submit">{type} user</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalUsers
