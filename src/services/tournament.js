import axios from '../libs/axios'

export const getTournaments = async () => {
    const { data } = await axios.get('/api/tournaments')
    return data
}

export const getTournament = async (id) => {
    const { data } = await axios.get(`/api/tournaments/${id}`)
    return data
}

export const createTournament = (body) => axios.post('/api/tournaments', body)

export const updateTournament = ({ id, body }) =>
    axios.put(`/api/tournaments/${id}`, body)
