import React from 'react'
import { useGetBookies } from '../../features/bookies.features'
import { toast, Toaster } from 'react-hot-toast'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import Loading from '../../ui/Loading'
import SectionBookies from './components/SectionBookies'

const Bookies = () => {
  const { data: bookies, isLoading, isError } = useGetBookies()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
         <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={12} md={11} className='border rounded mx-auto p-4 fs-4'>
            <SectionBookies bookies={bookies} />

            </Col>
          </Row>
        </Container>

        </>
  )
}

export default Bookies
