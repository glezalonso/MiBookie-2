import React from 'react'
import { Table, Col, Row, Alert } from 'react-bootstrap'

const MatchVotes = ({ match }) => {
    const awayVotes = match?.votes?.filter((vote) => vote.option === 'away')
    const localVotes = match?.votes?.filter((vote) => vote.option === 'local')
    const drawVotes = match?.votes?.filter((vote) => vote.option === 'draw')

    return (
        <>
            <Row className="my-4 ">
                <h5>Votos</h5>
                <Col>
                    {localVotes?.length > 0 ? (
                        <div className="data-tables bg-light rounded p-1 my-1">
                            {match?.local?.name}
                            <Table
                                responsive
                                size="sm"
                                borderless
                                variant="light"
                                hover
                            >
                                <tbody>
                                    {localVotes?.map((vote) => (
                                        <tr key={vote?._id}>
                                            <td> {vote?.username?.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <Alert variant="warning" className="p-1 text-center">
                            No hay votos para {match?.local?.name}
                        </Alert>
                    )}
                </Col>
                <Col>
                    {drawVotes?.length > 0 ? (
                        <div className="data-tables bg-light rounded p-1 my-1">
                            Empate
                            <Table
                                responsive
                                size="sm"
                                borderless
                                variant="light"
                                hover
                            >
                                <tbody>
                                    {drawVotes?.map((vote) => (
                                        <tr key={vote?._id}>
                                            <td>{vote?.username?.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <Alert variant="warning" className="p-1 text-center">
                            No hay votos para el empate
                        </Alert>
                    )}
                </Col>
                <Col>
                    {awayVotes?.length > 0 ? (
                        <div className="data-tables bg-light rounded p-1 my-1">
                            {match?.away?.name}
                            <Table
                                responsive
                                size="sm"
                                borderless
                                variant="light"
                                hover
                            >
                                <tbody>
                                    {awayVotes?.map((vote) => (
                                        <tr key={vote?._id}>
                                            <td> {vote?.username?.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <Alert variant="warning" className="p-1 text-center">
                            No hay votos para {match?.away?.name}
                        </Alert>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default MatchVotes
