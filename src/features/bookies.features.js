import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
    getBookie,
    getBookies,
    updateBookie,
    deleteBookie,
} from '../services/bookies'

export const useGetBookies = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['bookies'],
        queryFn: getBookies,
    })
    return { data, isLoading, isError }
}
export const useGetBookie = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['bookie', id],
        queryFn: () => getBookie(id),
    })
    return { data, isLoading, isError }
}
export const useDeleteBookie = () => {
    const queryClient = useQueryClient()
    const mutationDelete = useMutation({
        mutationFn: deleteBookie,
        onSuccess: () => {
            toast.success('Bookie borrado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['bookies'] })
        },
    })
    return mutationDelete
}

export const useUpdateBookie = () => {
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: updateBookie,
        onSuccess: () => {
            toast.success('Bookie actualizado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['bookie'] })
        },
    })
    return mutationUpdate
}
