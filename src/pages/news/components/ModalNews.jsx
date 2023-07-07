import React from 'react'
import { useFormik } from 'formik'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { useGetSports } from '../../../features/sports.features'
import { useAuthStore } from '../../../store/auth'

const ModalNews = ({ content, modalShow, handleClose, action, type, setUpdate }) => {
  const { profile } = useAuthStore(state => state)
  const { data: sports } = useGetSports()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      sport: content?.sport || '',
      title: content?.title || '',
      date: content?.date || '',
      content: content?.content || '',
      author: profile
    },
    validate: false,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      action.mutate((!content?._id) ? values : { id: content?._id, body: values })
      formik.resetForm()
      handleClose()
      setUpdate(false)
    }
  })

  const handleCloseUpdate = () => {
    formik.resetForm()
    setUpdate(false)
    handleClose()
  }

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header >
                <Modal.Title>{type} new</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')}>
                            <option value={false} >Select the sport</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <FormControl {...formik.getFieldProps('date')} type="datetime-local" id="date" name="date"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <FormControl {...formik.getFieldProps('title')} type="text" id="title" name="title"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <FormControl {...formik.getFieldProps('content')} as="textarea" rows={3} id="content" name="content"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <FormControl {...formik.getFieldProps('author')} type="text" id="author" name="author" disabled></FormControl>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={() => handleCloseUpdate()}>Close</Button>
                <Button variant="dark" type="submit">{type} new</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalNews
