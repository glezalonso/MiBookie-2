import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getUsers, getUser, deleteUser, register, updateUser } from '../services/users'

export const useGetUsers = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['users'], queryFn: getUsers })
  return { data, isLoading, isError }
}
export const useGetUser = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['user', id], queryFn: () => getUser(id) })
  return { data, isLoading, isError }
}
export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully!')
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
      toast.success('User updated successfully!')
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
      toast.success('User created successfully!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  return mutationCreate
}
