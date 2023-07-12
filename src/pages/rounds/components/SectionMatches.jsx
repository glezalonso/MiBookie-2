import React, { useState } from 'react'
import { useCreateMatch, useDeleteMatch, useUpdateMatch, useGetMatchesByRound } from '../../../features/matches.features'
import { Table, Button, Alert, ButtonGroup, FormControl } from 'react-bootstrap'
import ModalMatches from './ModalMatches'
import { Link } from 'react-router-dom'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionMatches = ({ round }) => {
  const { data: matches, isLoading, isError } = useGetMatchesByRound(round?._id)
  const [dataFilter, setDataFilter] = useState('')
  const createMatch = useCreateMatch()
  const updateMatch = useUpdateMatch()
  const deleteMatch = useDeleteMatch()

  const [modalShow, setModalShow] = useState(false)
  const [match, setMatch] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Esta seguro que desea borrar?')
    if (sure) return deleteMatch.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setMatch(data)
    setUpdate(true)
  }

  if (isLoading) return <Loading />
  if (isError) return toast.error('Hubo un error al cargar los partidos!')

  const filter = matches?.filter(team => {
    if (dataFilter) return team?.local?.name?.toLowerCase().includes(dataFilter.toLowerCase()) || team?.away?.name?.toLowerCase().includes(dataFilter.toLowerCase())
    else return team
  })

  return (
        <>
        <section>
        <h5 className="h7 ">Partidos  <Button variant="warning mx-2 btn-sm" onClick={handleShow}>Crear partido</Button></h5>
        {(!update)
          ? <ModalMatches round={round} modalShow={modalShow} handleClose={handleClose} action={createMatch} type={'Crear'} setUpdate={setUpdate} />
          : <ModalMatches round={round} match={match} modalShow={modalShow} handleClose={handleClose} action={updateMatch} type={'Editar'} setUpdate={setUpdate} /> }
          <div className='mx-2 mt-2'>
           <FormControl style={{ fontSize: '13px' }} className="mb-3" placeholder='Buscar equipo...' name='team' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
         </div>
        {(filter?.length > 0)
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'
          ><Table style={{ fontSize: '13px' }} variant='dark table-sm table-borderless my-1' responsive hover >
            <caption className='m-1 text-light'>Total: {filter?.length} patidos</caption>
            <thead className='border-bottom'>
                <tr>
                    <th>Fecha</th>
                    <th>Local</th>
                    <th>Visitante</th>
                    <th>Marcador</th>
                    <th>Estatus</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {filter?.map(match => (
                    <tr key={match?._id}>
                        <td>{match?.date?.split('T', 3).reverse().join(' ')}</td>
                        <td>{match?.local?.name}</td>
                        <td>{match?.away?.name}</td>
                        <td><strong> {match?.score?.map(score => score?.local)}</strong>-<strong> {match?.score?.map(score => score?.away)}</strong></td>
                        <td>{(match?.status)
                          ? <span className='text-success'>Activo!</span>
                          : <span className='text-danger'>Inactivo!</span>}</td>
                        <td>
                        <ButtonGroup>
                        <Link style={{ fontSize: '13px' }}className='btn btn-secondary btn-sm mx-1 rounded ' to={`../matches/${match?._id}`}>Detalles</Link>
                        <Button style={{ fontSize: '13px' }} className='btn btn-warning btn-sm mx-1 rounded' onClick={() => handleUpdate(match)}>Editar</Button>
                        <Button style={{ fontSize: '13px' }} className='btn btn-danger btn-sm  mx-1 rounded' onClick={() => handleDelete(match?._id)}>Borrar</Button>
                        </ButtonGroup>
                        </td>
                    </tr>
                ))}
            </tbody>

          </Table>
          </div>
          : <Alert variant='warning'>There is no information to show!</Alert>}
           </section>
        </>
  )
}
export default SectionMatches
