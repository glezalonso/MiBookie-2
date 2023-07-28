import axios from '../libs/axios'

export const getLeagues = async () => {
    const { data } = await axios.get('/api/leagues')
    return data
}

export const getLeague = async (id) => {
    const { data } = await axios.get(`/api/leagues/${id}`)
    return data
}

export const createLeague = (body) => {
    const form = new FormData()

    for (const key in body) {
        form.append(key, body[key])
    }

    axios.post('/api/leagues', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateLeague = ({ id, body }) => {
    const form = new FormData()

    for (const key in body) {
        form.append(key, body[key])
    }
    axios.put(`/api/leagues/${id}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const deleteLeague = (id) => axios.delete(`/api/leagues/${id}`)

export const getLeaguesBySport = async (sport) => {
    const { data } = await axios.post('/api/leagues/leaguesbysport', { sport })
    return data
}
