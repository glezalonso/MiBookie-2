import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { getTeams } from '../../../services/teams'
import { useFormik } from 'formik'
import { useQuery } from '@tanstack/react-query'
import { validateMatch } from '../../../helpers/validations'
import { getRounds } from '../../../services/rounds'

const ModalMatches = ({ round, match, modalShow, handleClose, action, type, setUpdate }) => {
  const { data: teams } = useQuery({ queryKey: ['teams'], queryFn: getTeams })
  const { data: rounds } = useQuery({ queryKey: ['rounds'], queryFn: getRounds })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      date: match?.date || '',
      teamHome: match?.local?._id || '',
      teamAway: match?.away?._id || '',
      round: round?._id,
      league: round?.league?._id,
      season: round?.season?._id,
      sport: round?.sport?._id,
      status: match?.status || ''
    },
    validate: validateMatch,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      action.mutate((!match?._id) ? values : { id: match?._id, body: values })
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

  const filterBySport = teams?.filter(team => team?.sport?._id === round?.sport?._id)

  return (
        <>

        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{type} match</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Date :</Form.Label>
                        <FormControl {...formik.getFieldProps('date')} type="datetime-local" id="date" name="date"></FormControl>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Local team</Form.Label>
                        <Form.Select id="teamHome" name="teamHome" {...formik.getFieldProps('teamHome')}>
                            <option value={false} >Select the local team </option>
                            {filterBySport?.map(team => (
                            <option key={team?._id} value={team?._id}>{team?.name}</option>
                            ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Away team:</Form.Label>
                        <Form.Select id="teamAway" name="teamAway" {...formik.getFieldProps('teamAway')}>
                            <option value={false}>Select the away team </option>
                            {filterBySport?.map(team => (
                            <option key={team?._id} value={team?._id}>{team?.name}</option>
                            ))}
                        </Form.Select>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Round:</Form.Label>
                        <Form.Select id="round" name="round" {...formik.getFieldProps('round')} disabled>
                            <option value={false}>Select the away team </option>
                            {rounds?.map(round => (
                            <option key={round?._id} value={round?._id}>{round?.round}</option>
                            ))}
                        </Form.Select>
                        </Form.Group>

                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Select status</option>
                            <option value={true}>Activo</option>
                            <option value={false}>Desactivo</option>
                        </Form.Select>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseUpdate()}>Close</Button>
                <Button variant="primary" type="submit">{type} match</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalMatches
