import React from 'react'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import Navigate from '../../ui/Navigate'
import MatchContent from './components/MatchContent'
import Loading from '../../ui/Loading'
import { useGetMatch } from '../../features/matches.features'

const Matches = () => {
    const { id } = useParams()
    const { data: match, isLoading, isError } = useGetMatch(id)

    if (isLoading) return <Loading />

    if (isError) return toast.error('Hubo un error al cargar el partido!')

    return (
        <>
            <Navigate />
            <Container fluid>
                <Row className="my-2 mx-auto">
                    <Col xs={12} lg={8} className="mx-auto">
                        <Breadcrumb className=" p-2">
                            <div className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none"
                                    to={`../leagues/${match?.league?._id}`}
                                >
                                    {match?.league?.league}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none"
                                    to={`../seasons/${match?.season?._id}`}
                                >
                                    {match?.season?.season}
                                </Link>
                            </div>
                            <div className="breadcrumb-item">
                                <Link
                                    className="text-decoration-none"
                                    to={`../rounds/${match?.round?._id}`}
                                >
                                    {match?.round?.round}
                                </Link>
                            </div>
                            <Breadcrumb.Item active>
                                {match?.local?.name} vs {match?.away?.name}
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="my-2 mx-auto">
                    <Col xs={12} lg={10} className=" mx-auto my-1">
                        <MatchContent match={match} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Matches
