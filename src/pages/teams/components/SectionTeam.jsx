import React from 'react'
import { Card } from 'react-bootstrap'

const SectionTeam = ({ team }) => {
    return (
        <>
            <section>
                <Card bg="dark" text="white">
                    <div className="d-flex justify-content-center">
                        <Card.Img
                            style={{ width: '100px', height: '100px' }}
                            src={team?.poster}
                            alt={team?.name}
                        />
                        <Card.Body>
                            <Card.Title>Equipo: {team?.name}</Card.Title>
                            <Card.Subtitle>
                                Estadio: {team?.stadium}{' '}
                            </Card.Subtitle>
                            <Card.Text>Deporte: {team?.sport?.sport}</Card.Text>
                        </Card.Body>
                    </div>
                </Card>
            </section>
        </>
    )
}
export default SectionTeam
