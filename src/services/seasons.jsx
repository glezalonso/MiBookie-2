import axios from '../libs/axios'

export const getSeasons = async () => {
  const { data } = await axios.get('/api/seasons')
  return data
}

export const getSeason = async (id) => {
  const { data } = await axios.get(`/api/seasons/${id}`)
  return data
}

export const createSeason = (body) => axios.post('/api/seasons', body)

export const updateSeason = ({ id, body }) => axios.put(`/api/seasons/${id}`, body)

export const deleteSeason = (id) => axios.delete(`/api/seasons/${id}`)
