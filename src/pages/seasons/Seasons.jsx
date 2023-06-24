import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionRounds from './components/SectionRounds'
import Loading from '../../ui/Loading'
import { useGetSeason } from '../../features/seasons.features'

const Seasons = () => {
  const { id } = useParams()
  const { data: season, isLoading, isError } = useGetSeason(id)

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (

         <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
         <Row className='mx-1 mt-2'>
         <Breadcrumb className='mx-1 mt-2'>
         <div className='breadcrumb-item'><Link to={`../sports/${season?.sport?._id}`}>{season?.sport?.sport}</Link></div>
         <div className='breadcrumb-item'><Link to={`../leagues/${season?.league?._id}`}>{season?.league?.league}</Link></div>
          <Breadcrumb.Item className='text-secondary'active>{season?.season}</Breadcrumb.Item>
          </Breadcrumb>
            <Col lg={12} className='p-2' >
            <SectionRounds season={season}/>
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Seasons
