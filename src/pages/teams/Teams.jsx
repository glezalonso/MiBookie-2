import React from 'react'
import Navigate from '../../ui/Navigate'
import { Container, Row, Col } from 'react-bootstrap'
import { toast, Toaster } from 'react-hot-toast'
import TableTeams from './components/TableTeams'
import Loading from '../../ui/Loading'
import { useGetTeams } from '../../features/teams.features'

const Teams = () => {
  const { data: teams, isLoading, isError } = useGetTeams()

  if (isLoading) return <Loading />
  if (isError) return toast.error('failed to load!')

  return (
        <>
        <Navigate />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
         <Container fluid >
          <Row className='m-1 rounded' >
            <Col xs={12} className='p-2' >
            <TableTeams teams={teams}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Teams
