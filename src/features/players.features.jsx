import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createPlayer, deletePlayer, getPlayer, getPlayers, updatePlayer } from '../services/players'

export const useGetPlayers = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Players'], queryFn: getPlayers })
  return { data, isLoading, isError }
}
export const useGetPlayer = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Player', id], queryFn: () => getPlayer(id) })
  return { data, isLoading, isError }
}
export const useDeletePlayer = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deletePlayer,
    onSuccess: () => {
      toast.success('Player deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['Players'] })
    }
  })
  return mutationDelete
}

export const useUpdatePlayer = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updatePlayer,
    onSuccess: () => {
      toast.success('Player updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['Players'] })
    }
  })
  return mutationUpdate
}

export const useCreatePlayer = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      toast.success('Player created successfully!')
      queryClient.invalidateQueries({ queryKey: ['Players'] })
    }
  })
  return mutationCreate
}
