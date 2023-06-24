import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { createSeason, deleteSeason, getSeason, getSeasons, updateSeason } from '../services/seasons'

export const useGetSeasons = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Seasons'], queryFn: getSeasons })
  return { data, isLoading, isError }
}
export const useGetSeason = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['Season', id], queryFn: () => getSeason(id) })
  return { data, isLoading, isError }
}
export const useDeleteSeason = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteSeason,
    onSuccess: () => {
      toast.success('Season deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['Seasons'] })
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
      queryClient.invalidateQueries({ queryKey: ['Seasons'] })
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
      queryClient.invalidateQueries({ queryKey: ['Seasons'] })
    }
  })
  return mutationCreate
}
