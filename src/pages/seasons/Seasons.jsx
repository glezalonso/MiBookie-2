import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { getSeason } from '../../services/seasons'
import { Container, Row, Col, Breadcrumb, Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionRounds from './components/SectionRounds'

const Seasons = () => {
  const { id } = useParams()
  const { data: season, isLoading, isError } = useQuery({ queryKey: ['season', id], queryFn: () => getSeason(id) })

  if (isLoading) return <Spinner animation="border" variant="warning" />
  if (isError) return toast.error('failed to load!')

  return (

         <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container >
         <Row>
         <Breadcrumb>
         <div className='breadcrumb-item'><Link to={`../sports/${season?.sport?._id}`}>{season?.sport?.sport}</Link></div>
         <div className='breadcrumb-item'><Link to={`../leagues/${season?.league?._id}`}>{season?.league?.league}</Link></div>
          <Breadcrumb.Item active>{season?.season}</Breadcrumb.Item>
          </Breadcrumb>
            <Col >
            <SectionRounds season={season}/>
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Seasons
