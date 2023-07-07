import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { getNews, getNew, createNew, updateNew, deleteNew } from '../services/news'

export const useGetNews = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['News'], queryFn: getNews })
  return { data, isLoading, isError }
}
export const useGetNew = (id) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ['New', id], queryFn: () => getNew(id) })
  return { data, isLoading, isError }
}
export const useDeleteNew = () => {
  const queryClient = useQueryClient()
  const mutationDelete = useMutation({
    mutationFn: deleteNew,
    onSuccess: () => {
      toast.success('New deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['News'] })
    }
  })
  return mutationDelete
}

export const useUpdateNew = () => {
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: updateNew,
    onSuccess: () => {
      toast.success('New updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['News'] })
    }
  })
  return mutationUpdate
}

export const useCreateNew = () => {
  const queryClient = useQueryClient()
  const mutationCreate = useMutation({
    mutationFn: createNew,
    onSuccess: () => {
      toast.success('New created successfully!')
      queryClient.invalidateQueries({ queryKey: ['News'] })
    }
  })
  return mutationCreate
}
