import { create } from 'zustand'
export const useRecovery = create((set) => ({
  email: '',
  OTP: false,
  setEmail: (email) => set(status => ({ ...status, email })),
  setOTP: (OTP) => set(status => ({ ...status, OTP })),
  setEmpty: () => set(status => ({ email: '', OTP: '' }))
}))
