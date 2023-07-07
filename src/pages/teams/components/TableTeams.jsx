import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import ModalTeams from './ModalTeams'
import { useDeleteTeam, useCreateTeam, useUpdateTeam } from '../../../features/teams.features'

const TableTeams = ({ teams }) => {
  const createTeam = useCreateTeam()
  const deleteTeam = useDeleteTeam()
  const updateTeam = useUpdateTeam()

  const [dataFilter, setDataFilter] = useState('')

  const [modalShow, setModalShow] = useState(false)
  const [team, setTeam] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteTeam.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setTeam(data)
    setUpdate(true)
  }

  const filter = teams.filter(team => {
    if (dataFilter) return team?.name?.toLowerCase().includes(dataFilter.toLowerCase())
    else return team
  })

  return (
        <>
        <section>
        <h5 className="h7 ">All teams</h5>

          <div className='mx-2'>
        <Button className="btn btn-warning btn-sm mb-2" onClick={handleShow} >Create team</Button>
        <FormControl className="mb-3" style={{ fontSize: '13px' }} placeholder='Search Team...' id='team' name='team' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
        </div>
        {(!update)
          ? <ModalTeams modalShow={modalShow} handleClose={handleClose} action={createTeam} type={'Create'} setUpdate={setUpdate} />
          : <ModalTeams team={team} modalShow={modalShow} handleClose={handleClose} action={updateTeam} type={'Edit'} setUpdate={setUpdate} /> }
        {(filter?.length > 0)
          ? <Table responsive variant='dark table-sm table-borderless' hover>
            <thead>
                <tr>
                    <th>
                      Team
                    </th>
                    <th>
                      Stadium
                    </th>
                    <th>
                        Sport
                    </th>
                    <th>
                       Status
                    </th>
                    <th>
                        Options
                    </th>
                </tr>
            </thead>
            <tbody>
                {filter?.map(team => (
                    <tr key={team?._id}>
                        <td>{team?.name}</td>
                        <td>{team?.stadium}</td>
                        <td>{team?.sport?.sport}</td>
                        <td>{(team.status) ? <span className='text-success'>Active</span> : <span className='text-danger'>Desactive</span>}</td>
                        <td>
                            <ButtonGroup>
                            <Link className='btn btn-secondary btn-sm mx-1 rounded ' to={`./${team?._id}`}>Details</Link>
                            <Button className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(team)}>Edit</Button>
                            <Button className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(team?._id)}>Delete</Button>
                            </ButtonGroup>
                        </td>
                        </tr>
                ))}
            </tbody>
        </Table>
          : <Alert variant='warning'>There is no information to show!</Alert>}
           </section>
        </>
  )
}

export default TableTeams
