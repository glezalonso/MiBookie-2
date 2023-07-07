import axios from '../libs/axios'

export const getBookies = async () => {
  const { data } = await axios.get('/api/bookies')
  return data
}

export const getBookie = async (id) => {
  const { data } = await axios.get(`/api/bookies/${id}`)
  return data
}

export const updateBookie = ({ id, body }) => axios.put(`/api/bookies/${id}`, body)

export const deleteBookie = (id) => axios.delete(`/api/bookies/${id}`)
