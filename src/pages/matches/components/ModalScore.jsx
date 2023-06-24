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
      away: ''
    },
    validate: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      closeMatch.mutate({ id: match?._id, body: values })
      formik.resetForm()
      handleClose()
      navigate(`../rounds/${match?.round?._id}`)
    }
  })

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Place score</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>{match?.local?.name} :</Form.Label>
                        <FormControl {...formik.getFieldProps('local')} type="number" id="local" name="local" placeholder='Score'></FormControl>
                        </Form.Group>
                        <Form.Label>{match?.away?.name} :</Form.Label>
                        <FormControl {...formik.getFieldProps('away')} type="number" id="away" name="away" placeholder='Score'></FormControl>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={() => handleClose()}>Close</Button>
                <Button variant="warning" type="submit">Place score</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalScore
