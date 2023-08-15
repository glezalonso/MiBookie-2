import axios from '../libs/axios'

export const getMatches = async () => {
    const { data } = await axios.get('/api/matches')
    return data
}

export const getMatch = async (id) => {
    const { data } = await axios.get(`/api/matches/${id}`)
    return data
}

export const createMatch = (body) => axios.post('/api/matches', body)

export const updateMatch = ({ id, body }) =>
    axios.put(`/api/matches/${id}`, body)

export const deleteMatch = (id) => axios.delete(`/api/matches/${id}`)

export const addLineUp = ({ id, body }) =>
    axios.post(`/api/matches/addlineup/${id}`, body)

export const removeLineUp = ({ id, data }) =>
    axios.delete(`/api/matches/removelineup/${id}`, { data })

export const closeMatch = ({ id, body }) =>
    axios.put(`/api/matches/closematch/${id}`, body)

export const getMatchesToday = async (date) => {
    const { data } = await axios.get(`/api/matches/date/${date}`)
    return data
}
export const getMatchesByTeam = async (team, limit, status) => {
    const { data } = await axios.get(
        `/api/matches/team/${team}/${limit}/${status}`
    )
    return data
}

// export const getMatchesByLeague = async (league) => {
//     const { data } = await axios.post('/api/matches/matchesbyleague', {
//         league,
//     })
//     return data
// }

export const getMatchesByRound = async (round) => {
    const { data } = await axios.get(`/api/matches/round/${round}`)
    return data
}

export const getMatchesBySeason = async (season) => {
    const { data } = await axios.get(`/season/:${season}`)
    return data
}
export const getMatchesOpen = async () => {
    const { data } = await axios.get('/api/matches/open')
    return data
}
export const getMatchesClosed = async () => {
    const { data } = await axios.get('/api/matches/closed')
    return data
}
