import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getTeams, getTeam, createTeam, updateTeam, removePlayer, deleteTeam, addPlayer } from '../services/teams'

export const useGetTeams = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Teams'], queryFn: getTeams })
  return { data, isLoading, isError }
}
export const useGetTeam = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Team', id], queryFn: () => getTeam(id) })
  return { data, isLoading, isError }
}
export const useDeleteTeam = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      toast.success('Team deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['Teams'] })
    }
  })
  return mutationDelete
}

export const useUpdateTeam = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      toast.success('Team updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['Teams'] })
    }
  })
  return mutationUpdate
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      toast.success('Team created successfully!')
      queryClient.invalidateQueries({ queryKey: ['Teams'] })
    }
  })
  return mutationCreate
}

export const useAddPlayer = (id) => {
  const queryClient = useQueryClient()
  const mutationAdd = useMutation({
    mutationFn: addPlayer,
    onSuccess: () => {
      toast.success('Player added successfully!')
      queryClient.invalidateQueries({ queryKey: ['Team', id] })
      queryClient.invalidateQueries({ queryKey: ['Players'] })
    }
  })
  return mutationAdd
}

export const useRemovePlayer = (id) => {
  const queryClient = useQueryClient()
  const mutationRemove = useMutation({
    mutationFn: removePlayer,
    onSuccess: () => {
      toast.success('Player removed successfully!')
      queryClient.invalidateQueries({ queryKey: ['Team', id] })
      queryClient.invalidateQueries({ queryKey: ['Players'] })
    }
  })
  return mutationRemove
}
