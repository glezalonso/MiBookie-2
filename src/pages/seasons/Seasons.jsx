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
         <Row className='m-2 p-2 mx-auto' >
            <Col xs={11} className='border rounded mx-auto  fs-6' >
         <Breadcrumb className='mx-1 mt-2 p-3'>
         <div className='breadcrumb-item'><Link to={`../sports/${season?.sport?._id}`}>{season?.sport?.sport}</Link></div>
         <div className='breadcrumb-item'><Link to={`../leagues/${season?.league?._id}`}>{season?.league?.league}</Link></div>
          <Breadcrumb.Item className='text-secondary'active>{season?.season}</Breadcrumb.Item>
          </Breadcrumb>
          </Col>
            <Col md={7} className='border rounded mx-auto mt-2 p-3  fs-6' >
            <h5 className="h7 ">Rounds</h5>
            <SectionRounds season={season}/>
            </Col>
            <Col md={5} className='border rounded mx-auto mt-2 p-3  fs-6' >
            <h5 className="h7 ">Standings</h5>
              <SectionStandings season={season} />
            </Col>
          </Row>
          <Row className='m-2 p-2 mx-auto'>
            <Col md={5} className='border rounded mx-auto mt-2  p-3  fs-6'>
            <h5 className="h7">Participants</h5>
              <SectionParticipants season={season} />
            </Col>
            <Col md={5} className='border rounded mx-auto mt-2  p-3  fs-6'>
            <h5 className="h7">All teams</h5>
              <SectionTeams season={season} />
            </Col>
          </Row>

         </Container>

        </>
  )
}

export default Seasons
