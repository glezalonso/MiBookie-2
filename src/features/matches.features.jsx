import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { addLineUp, closeMatch, createMatch, deleteMatch, getMatch, getMatches, removeLineUp, updateMatch } from '../services/matches'

export const useGetMatches = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['matches'], queryFn: getMatches })
  return { data, isLoading, isError }
}
export const useGetMatch = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['match', id], queryFn: () => getMatch(id) })
  return { data, isLoading, isError }
}
export const useDeleteMatch = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      toast.success('Match deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    }
  })
  return mutationDelete
}

export const useUpdateMatch = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updateMatch,
    onSuccess: () => {
      toast.success('Match updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    }
  })
  return mutationUpdate
}

export const useCreateMatch = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      toast.success('Match created successfully!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    }
  })
  return mutationCreate
}

export const useCloseMatch = () => {
  const queryClient = useQueryClient()
  const mutationClose = useMutation({
    mutationFn: closeMatch,
    onSuccess: () => {
      toast.success('Score placed successfully!')
      queryClient.invalidateQueries({ queryKey: ['matches'] })
    }
  })
  return mutationClose
}

export const useAddLineUp = () => {
  const queryClient = useQueryClient()
  const mutationAddLineUp = useMutation({
    mutationFn: addLineUp,
    onSuccess: () => {
      toast.success('player added successfully!')
      queryClient.invalidateQueries({ queryKey: ['match'] })
    }
  })
  return mutationAddLineUp
}

export const useRemoveLineUp = () => {
  const queryClient = useQueryClient()
  const mutationRemoveLineUp = useMutation({
    mutationFn: removeLineUp,
    onSuccess: () => {
      toast.success('Player removed successfully!')
      queryClient.invalidateQueries({ queryKey: ['match'] })
    }
  })
  return mutationRemoveLineUp
}
