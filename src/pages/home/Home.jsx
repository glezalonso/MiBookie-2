import React from 'react'
import Navigate from '../../ui/Navigate'
import formatedDate from '../../utils/formatedDate'
import { getMatches } from '../../services/matches'
import { useQuery } from '@tanstack/react-query'
import { Container, Row, Col, Table, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data: matches } = useQuery({ queryKey: ['matches'], queryFn: getMatches })
  const date = formatedDate()
  const matchesToday = matches?.filter(match => match?.date?.split('T')[0] === date)

  return (
        <>
        <Navigate />
        <Container className='w-100 mt-3' >
          <Row>
            <Col>
        <h3 className="h3 m-2">Matches Today</h3>
          {(matchesToday?.length > 0)
            ? <Table responsive variant="dark" hover striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>League</th>
                <th>Season</th>
                <th>Round</th>
                <th>Local</th>
                <th>Away</th>
                <th>Status</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {matchesToday?.map(match => (
                <tr key={match?._id}>
                  <td>{match?.date}</td>
                  <td>{match?.league?.league}</td>
                  <td>{match?.season?.season}</td>
                  <td>{match?.round?.round}</td>
                  <td>{match?.local.name}<strong> {match?.score?.map(score => score?.local)}</strong></td>
                  <td> {match?.away?.name}<strong> {match?.score?.map(score => score?.away)}</strong></td>
                  <td>{(match?.status) ? <span className='text-success'>Abierto</span> : <span className='text-danger'>Cerrado</span>}</td>
                  <td><Link className='btn btn-info p-2' to={`../matches/${match?._id}`}>Details</Link></td>
                </tr>
              ))}
            </tbody>
          </Table>
            : <Alert variant="info">There is no information to show!</Alert>}
            </Col>
            </Row>
        </Container>
        </>
  )
}

export default Home
