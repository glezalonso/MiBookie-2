import axios from '../libs/axios'

export const getTeams = async () => {
    const { data } = await axios.get('/api/teams')
    return data
}

export const getTeam = async (id) => {
    const { data } = await axios.get(`/api/teams/${id}`)
    return data
}

export const createTeam = (body) => {
    const form = new FormData()

    for (const key in body) {
        form.append(key, body[key])
    }
    axios.post('/api/teams', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateTeam = ({ id, body }) => {
    const form = new FormData()

    for (const key in body) {
        form.append(key, body[key])
    }
    axios.put(`/api/teams/${id}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const deleteTeam = (id) => axios.delete(`/api/teams/${id}`)

export const addPlayer = ({ id, body }) =>
    axios.post(`/api/teams/addplayer/${id}`, body)

export const removePlayer = ({ id, data }) =>
    axios.delete(`/api/teams/removeplayer/${id}`, { data })

export const getTeamsBySport = async (sport) => {
    const { data } = await axios.get(`/api/teams/sport/${sport}`)
    return data
}
