import { toast } from 'react-hot-toast'
export const verifyLogin = (values) => {
  if (!values.username) return toast.error('Username is required')
  if (values.username.length < 4) return toast.error('Username must contain at least 4 characters')
  if (values.username.includes(' ')) return toast.error('Username must not include spaces')
  if (!values.password) return toast.error('Passowrd is required')
  if (values.password.length < 8) return toast.error('Password must contain at least 8 characters')
  if (values.username.includes(' ')) return toast.error('Password must not include spaces')
}

export const validateTeam = (values) => {
  if (!values.name) return toast.error('Team is required')
  if (!values.sport) return toast.error('the team must belong to a sport')
  if (!values.status) return toast.error('the team status is required')
}

export const validateSport = (values) => {
  if (!values.sport) return toast.error('Sport is required')
}

export const validateSeason = (values) => {
  if (!values.season) return toast.error('Season is required')
  if (!values.league) return toast.error('The season must belong to a league')
  if (!values.status) return toast.error('the season status is required')
}

export const validateRound = (values) => {
  if (!values.round) return toast.error('Round is require')
  if (!values.season) return toast.error('The round must belog to a season')
  if (!values.status) return toast.error('The round status is required')
}

export const validatePlayer = (values) => {
  if (!values.fullName) return toast.error('Player fullname is require')
  if (!values.sport) return toast.error('the player must belog to a sport')
  if (!values.status) return toast.error('the player status is required')
}

export const validateMatch = (values) => {
  if (!values.date) return toast.error('the match must have a date')
  if (!values.teamHome) return toast.error('the match must have a local team')
  if (!values.teamAway) return toast.error('the match must have a away team')
  if (!values.round) return toast.error('the match must belong to a round')
  if (!values.status) return toast.error('the match status is required')
}

export const validateLeague = (values) => {
  if (!values.league) return toast.error('League is required')
  if (!values.sport) return toast.error('the league must belong to a sport')
}

export const validateEmail = (values) => {
  if (!values.email) return toast.error('Email is required')
}

export const validateOTP = (values) => {
  if (!values.OTP) return toast.error('OTP is required')
  if (values.OTP.length !== 6) return toast.error('OTP must have 6 characters')
  if (values.OTP.includes(' ')) return toast.error('OTP must not include spaces')
}

export const validateResetPassword = (values) => {
  if (!values.password) return toast.error('Password is required')
  if (!values.confirmPassword) return toast.error('Password is required')
  if (values.password.length < 8) return toast.error('Password must contain at least 8 characters')
  if (values.confirmPassword.length < 8) return toast.error('confirm password must contain at least 8 characters')
  if (values.password.includes(' ')) return toast.error('Password must not include spaces')
  if (values.confirmPassword.includes(' '))toast.error('Password must not include spaces')
  if (values.password === values.confirmPassword) toast.error('Passwods must be equals')
}
