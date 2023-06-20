import { toast } from 'react-hot-toast'
export const verifyLogin = (values) => {
  const err = validateUser({}, values)
  const err2 = validatePassword({}, values)
  if (err) {
    return err
  } else {
    return err2
  }
}
const validateUser = (err = {}, values) => {
  if (!values.username) {
    err.username = toast.error('Username is required')
  } else if (values.username.length < 4) {
    err.username = toast.error('Username must contain at least 4 characters')
  } else if (values.username.includes(' ')) {
    err.username = toast.error('Username must not include spaces')
  }
  return err
}

const validatePassword = (err = {}, values) => {
  if (!values.password) {
    err.password = toast.error('Password is required')
  } else if (values.password.length < 8) {
    err.password = toast.error('Password must contain at least 8 characters')
  } else if (values.password.includes(' ')) {
    err.password = toast.error('Password must not include spaces')
  }
  return err
}

export const validateTeam = (values) => {
  if (!values.name) {
    return toast.error('Team is required')
  } else if (!values.sport) {
    return toast.error('the team must belong to a sport')
  }
}

export const validateSport = (values) => {
  if (!values.sport) return toast.error('Sport is required')
}

export const validateSeason = (values) => {
  if (!values.season) {
    return toast.error('Season is required')
  } else if (!values.league) return toast.error(' the season must belong to a league')
}

export const validateRound = (values) => {
  if (!values.round) {
    return toast.error('Round is require')
  } else if (!values.season) return toast.error('the round must belog to a season')
}

export const validatePlayer = (values) => {
  if (!values.fullName) {
    return toast.error('Player fullname is require')
  } else if (!values.sport) return toast.error('the player must belog to a sport')
}

export const validateMatch = (values) => {
  if (!values.date) return toast.error('the match must have a date')
  if (!values.teamHome) return toast.error('the match must have a local team')
  if (!values.teamAway) return toast.error('the match must have a away team')
  if (!values.round) return toast.error('the match must belong to a round')
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
