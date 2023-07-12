import React from 'react'
import { Alert, Table } from 'react-bootstrap'

const SectionStandings = ({ season }) => {
  // counter
  let i = 1

  // SoccerID
  const ID_SOCCER = '648f71dea4ba8860dfe3830f'

  const sort = season?.standings?.sort((a, b) => {
    if (b.wins !== a.wins) { return b.wins - a.wins } else { return b.draws - a.draws }
  })

  return (
        <>
        <section>
        <h5 className="h7 ">Posiciones</h5>
        {sort?.length > 0
          ? <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <Table responsive variant="dark table-sm table-borderless my-1" hover >
                <thead className='border-bottom'>
                    <tr>
                      <th>No.</th>
                        <th>Equipo </th>
                        <th>Victorias</th>
                        <th>Empates</th>
                        <th>Derrotas</th>
                        {season?.sport?._id === ID_SOCCER
                          ? <th>Puntos</th>
                          : null}
                    </tr>
               </thead>
                <tbody>
                    {sort?.map(team => (
                        <tr key={team?.team?._id}>
                         <td>{i++}</td>
                        <td>{team?.team?.name}</td>
                        <td>{team?.wins}</td>
                        <td>{team?.draws}</td>
                        <td>{team?.loses}</td>
                        {season?.sport?._id === ID_SOCCER
                          ? <td>{season?.sport?._id === ID_SOCCER ? team?.wins * 3 + team?.draws : null }</td>
                          : null}

                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
          : <Alert variant='warning'>No hay participantes!</Alert>}
          </section>
    </>
  )
}

export default SectionStandings
