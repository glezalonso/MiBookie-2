import { toast } from 'react-hot-toast'
export const verifyLogin = (values) => {
    if (!values.username) return toast.error('El usuario es equerido')
    if (values.username.length < 4)
        return toast.error('El usuario debe contener al menos 5 caractéres')
    if (values.username.includes(' '))
        return toast.error('El usuario no debe incluir espacios')
    if (!values.password) return toast.error('El password es requerido')
    if (values.password.length < 8)
        return toast.error('El password debe contener al menos 8 caractéres')
    if (values.username.includes(' '))
        return toast.error('El password no debe incluir espacios')
}

export const validateTeam = (values) => {
    if (!values.name) return toast.error('El equipo es requerido')
    if (!values.sport)
        return toast.error('El equipo debe pertenecer a un deporte')
    if (!values.status) return toast.error('El estatus es requerido')
}

export const validateSport = (values) => {
    if (!values.sport) return toast.error('El deporte es requerido')
}

export const validateSeason = (values) => {
    if (!values.season) return toast.error('La temporada es requerida')
    if (!values.league)
        return toast.error('La temporada debe pertenecera una liga')
    if (!values.status) return toast.error('El estatus es requerido')
}

export const validateRound = (values) => {
    if (!values.round) return toast.error('La jornada es requerida')
    if (!values.season)
        return toast.error('La jornada debe pertenecer a una tmporada')
    if (!values.status) return toast.error('El estatus es requerido')
}

export const validatePlayer = (values) => {
    if (!values.fullName)
        return toast.error('El nombre del jugador es requerido')
    if (!values.sport)
        return toast.error('El jugador debe pertenecer a un deporte')
    if (!values.status) return toast.error('El estatus es requerido')
}

export const validateMatch = (values) => {
    if (!values.date) return toast.error('El partido debe tener fecha')
    if (!values.teamHome)
        return toast.error('El partido debe tener equipo local')
    if (!values.teamAway)
        return toast.error('El partido debe tener equipo visitante')
    if (!values.round)
        return toast.error('El partido debe pertenecer a una jornada')
    if (!values.status) return toast.error('El estatus es requerido')
}

export const validateLeague = (values) => {
    if (!values.league) return toast.error('La liga es requerida')
    if (!values.sport)
        return toast.error('La liga debe pertenecer a un deporte')
}

export const validateEmail = (values) => {
    if (!values.email) return toast.error('Email is required')
}

export const validateOTP = (values) => {
    if (!values.OTP) return toast.error('OTP is required')
    if (values.OTP.length !== 6)
        return toast.error('OTP must have 6 characters')
    if (values.OTP.includes(' '))
        return toast.error('OTP must not include spaces')
}

export const validateResetPassword = (values) => {
    if (!values.password) return toast.error('Password is required')
    if (!values.confirmPassword) return toast.error('Password is required')
    if (values.password.length < 8)
        return toast.error('Password must contain at least 8 characters')
    if (values.confirmPassword.length < 8)
        return toast.error(
            'confirm password must contain at least 8 characters'
        )
    if (values.password.includes(' '))
        return toast.error('Password must not include spaces')
    if (values.confirmPassword.includes(' '))
        toast.error('Password must not include spaces')
    if (values.password !== values.confirmPassword)
        toast.error('Passwods must be equals')
}
