import axios from '../libs/axios'

export const getTeams = async () => {
  const { data } = await axios.get('/api/teams')
  return data
}

export const getTeam = async (id) => {
  const { data } = await axios.get(`/api/teams/${id}`)
  return data
}

export const createTeam = (body) => axios.post('/api/teams', body)

export const updateTeam = ({ id, body }) => axios.put(`/api/teams/${id}`, body)

export const deleteTeam = (id) => axios.delete(`/api/teams/${id}`)

export const addPlayer = ({ id, body }) => axios.post(`/api/teams/addplayer/${id}`, body)

export const removePlayer = ({ id, data }) => axios.delete(`/api/teams/removeplayer/${id}`, { data })

export const getTeamsBySport = async (sport) => {
  const { data } = await axios.post('/api/teams/teamsbysport', { sport })
  return data
}
