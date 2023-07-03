import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createSeason, deleteSeason, getSeason, getSeasons, updateSeason, addTeam, removeTeam } from '../services/seasons'

export const useGetSeasons = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['seasons'], queryFn: getSeasons })
  return { data, isLoading, isError }
}
export const useGetSeason = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['season', id], queryFn: () => getSeason(id) })
  return { data, isLoading, isError }
}
export const useDeleteSeason = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteSeason,
    onSuccess: () => {
      toast.success('Season deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['seasons'] })
    }
  })
  return mutationDelete
}

export const useUpdateSeason = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updateSeason,
    onSuccess: () => {
      toast.success('Season updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['seasons'] })
    }
  })
  return mutationUpdate
}

export const useCreateSeason = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: createSeason,
    onSuccess: () => {
      toast.success('Season created successfully!')
      queryClient.invalidateQueries({ queryKey: ['seasons'] })
    }
  })
  return mutationCreate
}
export const useAddTeam = () => {
  const queryClient = useQueryClient()
  const mutationAdd = useMutation({
    mutationFn: addTeam,
    onSuccess: () => {
      toast.success('Team added successfully!')
      queryClient.invalidateQueries({ queryKey: ['season'] })
    }
  })
  return mutationAdd
}

export const useRemoveTeam = () => {
  const queryClient = useQueryClient()
  const mutationRemove = useMutation({
    mutationFn: removeTeam,
    onSuccess: () => {
      toast.success('Team removed successfully!')
      queryClient.invalidateQueries({ queryKey: ['season'] })
    }
  })
  return mutationRemove
}
