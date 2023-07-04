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
          <Row className='m-2 p-2 mx-auto' >
            <Col xs={11} className='border rounded mx-auto mt-2 p-3 fs-6' >
            <h5 className="h7 ">All teams</h5>
            <TableTeams teams={teams}/>
            </Col>
          </Row>
        </Container>
        </>
  )
}

export default Teams
