import axios from '../libs/axios'

export const getNews = async () => {
  const { data } = await axios.get('/api/news')
  return data
}

export const getNew = async (id) => {
  const { data } = await axios.get(`/api/news/${id}`)
  return data
}

export const createNew = async (values) => axios.post('/api/news', values)

export const updateNew = ({ id, body }) => axios.put(`/api/news/${id}`, body)

export const deleteNew = (id) => axios.delete(`/api/news/${id}`)
