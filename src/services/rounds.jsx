import axios from '../libs/axios'

export const getRounds = async () => {
  const { data } = await axios.get('/api/rounds')
  return data
}

export const getRound = async (id) => {
  const { data } = await axios.get(`/api/rounds/${id}`)
  return data
}

export const createRound = (body) => axios.post('/api/rounds', body)

export const updateRound = ({ id, body }) => axios.put(`/api/rounds/${id}`, body)

export const deleteRound = (id) => axios.delete(`/api/rounds/${id}`)
