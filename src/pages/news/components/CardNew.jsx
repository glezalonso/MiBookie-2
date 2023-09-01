import React from 'react'
import { Card, Button, ButtonGroup } from 'react-bootstrap'

const CardNew = ({ content, handleDelete, handleUpdate }) => {
    return (
        <>
            <section>
                <Card key={content?._id} bg="light" className="my-2">
                    <Card.Header>
                        <Card.Title>{content?.title}</Card.Title>

                        <Card.Subtitle className="my-1">
                            {content?.league?.league}
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text style={{ whiteSpace: 'pre-line' }}>
                            {content?.content}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <p>
                            {content?.date?.split('T', 3).reverse().join(' ')}
                            <span>
                                <strong> Escrito por: </strong>{' '}
                                {content?.author}
                            </span>
                        </p>
                        <ButtonGroup>
                            <Button
                                className="btn btn-warning btn-sm mx-1"
                                onClick={() => handleUpdate(content)}
                            >
                                Editar
                            </Button>
                            <Button
                                className="btn btn-danger btn-sm mx-1"
                                onClick={() => handleDelete(content?._id)}
                            >
                                Borrar
                            </Button>
                        </ButtonGroup>
                    </Card.Footer>
                </Card>
            </section>
        </>
    )
}

export default CardNew
