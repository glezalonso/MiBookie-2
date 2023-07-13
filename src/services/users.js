import axios from '../libs/axios'

export const login = (values) => axios.post('/api/login', values)

export const generateOTP = (values) => axios.post('/api/generateOTP', values)

export const verifyOTP = (values) => axios.post('/api/verifyOTP', values)

export const resetPassword = (values) => axios.put('/api/resetPassword', values)

export const register = (values) => axios.post('/api/users/register', values)

export const getUsers = async () => {
    const { data } = await axios.get('/api/users')
    return data
}

export const getUser = async (id) => {
    const { data } = await axios.get(`/api/users/${id}`)
    return data
}

export const updateUser = ({ id, body }) => axios.put(`/api/users/${id}`, body)

export const deleteUser = (id) => axios.delete(`/api/users/${id}`)
