import React from 'react'
import { Modal, Form, Button, FormControl } from 'react-bootstrap'
import { getLeagues } from '../../../services/leagues'
import { useFormik } from 'formik'
import { useQuery } from '@tanstack/react-query'
import { validateSeason } from '../../../helpers/validations'
import { getSports } from '../../../services/sports'

const ModalSeasons = ({ league, season, modalShow, handleClose, action, type, setUpdate }) => {
  const { data: leagues } = useQuery({ queryKey: ['leagues'], queryFn: getLeagues })
  const { data: sports } = useQuery({ queryKey: ['sports'], queryFn: getSports })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      season: season?.season || '',
      description: season?.description || '',
      status: season?.status || '',
      league: league?._id || '',
      sport: league?.sport?._id || ''
    },
    validate: validateSeason,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      action.mutate((!season?._id) ? values : { id: season?._id, body: values })
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

  const leagueBySport = leagues?.filter(leagues => leagues?._id === league?._id)

  return (
        <>
        <Modal className="text-dark" show={modalShow} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header >
                <Modal.Title>{type} season</Modal.Title>
                </Modal.Header>
                    <Form onSubmit={formik.handleSubmit}>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>Season name</Form.Label>
                        <FormControl {...formik.getFieldProps('season')} type="text" id="season" name="season"></FormControl>
                        </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <FormControl {...formik.getFieldProps('description')} type="text" id="description" name="description"></FormControl>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Status</Form.Label>
                        <Form.Select id="status" name="status"{...formik.getFieldProps('status')} >
                            <option >Select status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Desactivate</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>League:</Form.Label>
                        <Form.Select id="league" name="league" {...formik.getFieldProps('league')} disabled>
                            <option value={false}>Select the league</option>
                        {leagueBySport?.map(league => (
                            <option key={league?._id} value={league?._id}>{league?.league}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Sport:</Form.Label>
                        <Form.Select id="sport" name="sport" {...formik.getFieldProps('sport')} disabled>
                            <option value={false}>Select the league</option>
                        {sports?.map(sport => (
                            <option key={sport?._id} value={sport?._id}>{sport?.sport}</option>

                        ))}
                        </Form.Select>
                    </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={handleCloseUpdate}>Close</Button>
                <Button variant="warning" type="submit">{type} league</Button>
            </Modal.Footer>
        </Form>
      </Modal>

        </>
  )
}

export default ModalSeasons
