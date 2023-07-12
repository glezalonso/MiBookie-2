import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getUsers, getUser, deleteUser, register, updateUser, login } from '../services/users'
import { useAuthStore } from '../store/auth'

export const useGetUsers = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['users'], queryFn: getUsers })
  return { data, isLoading, isError }
}
export const useGetUser = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) })
  return { data, isLoading, isError }
}
export const useLogin = () => {
  const auth = useAuthStore(state => state.setAuth)
  const profile = useAuthStore(state => state.setProfile)
  const isAdmin = useAuthStore(state => state.setIsAdmin)

  const mutationLogin = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success('Inicio de sesión exitoso! ')
      auth(data.data.token)
      profile(data.data.username)
      isAdmin(data.data.isAdmin)
    },
    onError: () => toast.error('Error al iniciar sesión!')
  })
  return mutationLogin
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('Usuario borrado exitosamnete!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  return mutationDelete
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('Usuario actualizado exitosamente!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  return mutationUpdate
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success('Usuario creado exitosamente!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  return mutationCreate
}
