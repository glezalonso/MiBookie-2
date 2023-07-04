import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import TableSports from './components/TableSports'
import Loading from '../../ui/Loading'
import { useGetSports } from '../../features/sports.features'

const Sports = () => {
  const { data: sports, isLoading, isError } = useGetSports()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={11} className='border rounded mx-auto p-4 fs-4'>
            <h5 className="h7 ">Sports</h5>
            <TableSports sports={sports}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Sports
