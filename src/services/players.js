import axios from '../libs/axios'

export const getPlayers = async () => {
    const { data } = await axios.get('/api/players')
    return data
}

export const getPlayer = async (id) => {
    const { data } = await axios.get(`/api/players/${id}`)
    return data
}

export const createPlayer = (body) => axios.post('/api/players', body)

export const updatePlayer = ({ id, body }) =>
    axios.put(`/api/players/${id}`, body)

export const deletePlayer = (id) => axios.delete(`/api/players/${id}`)

export const getPlayersBySport = async (sport) => {
    const { data } = await axios.post('/api/players/playersbysport', { sport })
    return data
}
