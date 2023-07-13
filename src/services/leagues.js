import axios from '../libs/axios'

export const getLeagues = async () => {
    const { data } = await axios.get('/api/leagues')
    return data
}

export const getLeague = async (id) => {
    const { data } = await axios.get(`/api/leagues/${id}`)
    return data
}

export const createLeague = (body) => axios.post('/api/leagues', body)

export const updateLeague = ({ id, body }) =>
    axios.put(`/api/leagues/${id}`, body)

export const deleteLeague = (id) => axios.delete(`/api/leagues/${id}`)
