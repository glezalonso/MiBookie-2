import axios from '../libs/axios'

export const getSports = async () => {
    const res = await axios.get('/api/sports')
    return res.data
}

export const getSport = async (id) => {
    const { data } = await axios.get(`/api/sports/${id}`)
    return data
}

export const createSport = (body) => axios.post('/api/sports', body)

export const updateSport = ({ id, body }) =>
    axios.put(`/api/sports/${id}`, body)

export const deleteSport = (id) => axios.delete(`/api/sports/${id}`)
