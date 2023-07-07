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

export const updateMatch = ({ id, body }) => axios.put(`/api/matches/${id}`, body)

export const deleteMatch = (id) => axios.delete(`/api/matches/${id}`)

export const addLineUp = ({ id, body }) => axios.post(`/api/matches/addlineup/${id}`, body)

export const removeLineUp = ({ id, data }) => axios.delete(`/api/matches/removelineup/${id}`, { data })

export const closeMatch = ({ id, body }) => axios.put(`/api/matches/closematch/${id}`, body)
