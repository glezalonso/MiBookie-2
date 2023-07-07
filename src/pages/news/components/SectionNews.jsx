import React, { useState } from 'react'
import { Button, Alert, FormControl } from 'react-bootstrap'
import { useCreateNew, useDeleteNew, useUpdateNew } from '../../../features/news.features'
import ModalNews from './ModalNews'
import CardNew from './CardNew'

const SectionNews = ({ news }) => {
  const createNew = useCreateNew()
  const updateNew = useUpdateNew()
  const deleteNew = useDeleteNew()
  const [dataFilter, setDataFilter] = useState('')

  const [modalShow, setModalShow] = useState(false)
  const [content, setContent] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClose = () => setModalShow(false)
  const handleShow = () => setModalShow(true)

  const handleDelete = (id) => {
    const sure = confirm('Want to delete?')
    if (sure) return deleteNew.mutate(id)
  }

  const handleUpdate = (data) => {
    handleShow()
    setContent(data)
    setUpdate(true)
  }

  const filter = news?.filter(news => {
    if (dataFilter) return news?.sport?.toLowerCase().includes(dataFilter.toLowerCase()) || news?.content?.toLowerCase().includes(dataFilter.toLowerCase())
    else return news
  })

  return (
        <>
        <section>
        <h5 className="h7 ">News</h5>
        <div className='mx-2'>
        <Button className="btn btn-warning btn-sm mb-2" onClick={handleShow} >Create New</Button>
        <FormControl className="mb-3" style={{ fontSize: '13px' }} placeholder='Search sport, Team...' id='team' name='team' value={dataFilter} onChange={(event) => setDataFilter(event.target.value)} />
        </div>
        {(!update)
          ? <ModalNews modalShow={modalShow} handleClose={handleClose} action={createNew} type={'Create'} setUpdate={setUpdate} />
          : <ModalNews content={content} modalShow={modalShow} handleClose={handleClose} action={updateNew} type={'Edit'} setUpdate={setUpdate} /> }

        {filter?.length > 0
          ? filter?.map(content => (
            <CardNew key={content?._id} content={content} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          ))
          : <Alert variant='warning'>There is no information to show!</Alert>}
        </section>
        </>
  )
}

export default SectionNews
