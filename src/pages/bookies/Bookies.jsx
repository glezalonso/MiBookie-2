import React from 'react'
import { useGetBookies } from '../../features/bookies.features'
import { toast } from 'react-hot-toast'
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
         <Container fluid >
          <Row className='my-2  mx-auto' >
            <Col md={11} className='bg-dark text-light rounded mx-auto  fs-4'>
            <SectionBookies bookies={bookies} />
            </Col>
          </Row>
        </Container>

        </>
  )
}

export default Bookies
