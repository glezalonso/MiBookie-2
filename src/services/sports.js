import axios from '../libs/axios'

export const getSports = async () => {
    const res = await axios.get('/api/sports')
    return res.data
}

export const getSport = async (id) => {
    const { data } = await axios.get(`/api/sports/${id}`)
    return data
}

export const createSport = (body) => {
    const form = new FormData()

    for (const key in body) {
        form.append(key, body[key])
    }

    axios.post('/api/sports', form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const updateSport = ({ id, body }) => {
    const form = new FormData()

    for (const key in body) {
        form.append(key, body[key])
    }

    axios.put(`/api/sports/${id}`, form, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const deleteSport = (id) => axios.delete(`/api/sports/${id}`)
