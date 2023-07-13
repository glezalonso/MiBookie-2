import React, { useState } from 'react'
import { Button, Alert, FormControl } from 'react-bootstrap'
import {
    useCreateNew,
    useDeleteNew,
    useUpdateNew,
    useGetNews,
} from '../../../features/news.features'
import ModalNews from './ModalNews'
import CardNew from './CardNew'
import Loading from '../../../ui/Loading'
import { toast } from 'react-hot-toast'

const SectionNews = () => {
    const { data: news, isLoading, isError } = useGetNews()
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
        const sure = confirm('Estas seguro que desea borrar?')
        if (sure) return deleteNew.mutate(id)
    }

    const handleUpdate = (data) => {
        handleShow()
        setContent(data)
        setUpdate(true)
    }

    if (isLoading) return <Loading />
    if (isError) return toast.error('Hubo un error al cargar las noticias!')

    const filter = news?.filter((news) => {
        if (dataFilter)
            return (
                news?.sport?.sport
                    ?.toLowerCase()
                    .includes(dataFilter.toLowerCase()) ||
                news?.title?.toLowerCase().includes(dataFilter.toLowerCase())
            )
        else return news
    })

    return (
        <>
            <section>
                <h5 className="h7 ">
                    Noticias{' '}
                    <Button
                        className="btn btn-warning btn-sm mb-2 mx-1"
                        onClick={handleShow}
                    >
                        Crear noticia
                    </Button>
                </h5>
                <div className="mx-2">
                    <FormControl
                        className="mb-3"
                        style={{ fontSize: '13px' }}
                        placeholder="Buscar por deporte, título.."
                        id="team"
                        name="team"
                        value={dataFilter}
                        onChange={(event) => setDataFilter(event.target.value)}
                    />
                </div>
                {!update ? (
                    <ModalNews
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={createNew}
                        type={'Crear'}
                        setUpdate={setUpdate}
                    />
                ) : (
                    <ModalNews
                        content={content}
                        modalShow={modalShow}
                        handleClose={handleClose}
                        action={updateNew}
                        type={'Editar'}
                        setUpdate={setUpdate}
                    />
                )}

                {filter?.length > 0 ? (
                    filter?.map((content) => (
                        <CardNew
                            key={content?._id}
                            content={content}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                        />
                    ))
                ) : (
                    <Alert variant="warning">
                        No hay noticias para mostrar!
                    </Alert>
                )}
            </section>
        </>
    )
}

export default SectionNews
