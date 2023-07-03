import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import SectionRounds from './components/SectionRounds'
import Loading from '../../ui/Loading'
import { useGetSeason } from '../../features/seasons.features'
import SectionStandings from './components/SectionStandings'
import SectionParticipants from './components/SectionParticipants'
import SectionTeams from './components/SectionTeams'

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
         <Row className='mx-1 mt-2 rounded'>
         <Breadcrumb className='mx-1 mt-2 p-3'>
         <div className='breadcrumb-item'><Link to={`../sports/${season?.sport?._id}`}>{season?.sport?.sport}</Link></div>
         <div className='breadcrumb-item'><Link to={`../leagues/${season?.league?._id}`}>{season?.league?.league}</Link></div>
          <Breadcrumb.Item className='text-secondary'active>{season?.season}</Breadcrumb.Item>
          </Breadcrumb>
            <Col md={8} className='p-2' >
            <SectionRounds season={season}/>
            </Col>
            <Col md={4} className='p-1' >
              <SectionStandings season={season} />
            </Col>
          </Row>
          <Row className='mx-1 mt-2'>
            <Col md={6} className=' p-1'>
              <SectionParticipants season={season} />
            </Col>
            <Col md={6} className='p-1'>
              <SectionTeams season={season} />
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Seasons
