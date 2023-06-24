import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createRound, deleteRound, getRound, getRounds, updateRound } from '../services/rounds'

export const useGetRounds = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Rounds'], queryFn: getRounds })
  return { data, isLoading, isError }
}
export const useGetRound = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Round', id], queryFn: () => getRound(id) })
  return { data, isLoading, isError }
}
export const useDeleteRound = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteRound,
    onSuccess: () => {
      toast.success('Round deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['Rounds'] })
    }
  })
  return mutationDelete
}

export const useUpdateRound = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updateRound,
    onSuccess: () => {
      toast.success('Round updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['Rounds'] })
    }
  })
  return mutationUpdate
}

export const useCreateRound = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: createRound,
    onSuccess: () => {
      toast.success('Round created successfully!')
      queryClient.invalidateQueries({ queryKey: ['Rounds'] })
    }
  })
  return mutationCreate
}
