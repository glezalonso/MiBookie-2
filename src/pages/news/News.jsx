import React from 'react'
import { useGetNews } from '../../features/news.features'
import { toast, Toaster } from 'react-hot-toast'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import Loading from '../../ui/Loading'
import SectionNews from './components/SectionNews'

const News = () => {
  const { data: news, isLoading, isError } = useGetNews()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} md={11} className='border rounded mx-auto  fs-4'>
              <SectionNews news={news} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default News
