import React from 'react'
import { Table } from 'react-bootstrap'

const MatchDetail = ({ match }) => {
    return (
        <>
            <div className="bg-light rounded p-1">
                <Table responsive size="sm" borderless variant="light" hover>
                    <tbody>
                        <tr>
                            <td>Fecha</td>
                            <td>
                                {match?.date?.split('T', 3).reverse().join(' ')}
                            </td>
                        </tr>
                        <tr>
                            <td>Estatus</td>
                            <td>
                                {match?.status ? (
                                    <span className="text-success">Activo</span>
                                ) : (
                                    <span className="text-danger ">
                                        Inactivo
                                    </span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Estadio</td>
                            <td>{match?.local?.stadium}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Local </strong>
                                {match?.local?.name}
                            </td>
                            <td>
                                <strong>
                                    {match?.score?.map((score) => score?.local)}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Visitante </strong>
                                {match?.away?.name}
                            </td>
                            <td>
                                <strong>
                                    {match?.score?.map((score) => score?.away)}
                                </strong>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}
export default MatchDetail
