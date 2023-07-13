import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
    getSport,
    createSport,
    deleteSport,
    getSports,
    updateSport,
} from '../services/sports'

export const useGetSports = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Sports'],
        queryFn: getSports,
    })
    return { data, isLoading, isError }
}
export const useGetSport = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Sport', id],
        queryFn: () => getSport(id),
    })
    return { data, isLoading, isError }
}
export const useDeleteSport = () => {
    const queryClient = useQueryClient()
    const mutationDelete = useMutation({
        mutationFn: deleteSport,
        onSuccess: () => {
            toast.success('Deporte borrado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Sports'] })
        },
    })
    return mutationDelete
}

export const useUpdateSport = () => {
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: updateSport,
        onSuccess: () => {
            toast.success('Deporte actualizado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Sports'] })
        },
    })
    return mutationUpdate
}

export const useCreateSport = () => {
    const queryClient = useQueryClient()
    const mutationCreate = useMutation({
        mutationFn: createSport,
        onSuccess: () => {
            toast.success('Deporte creado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Sports'] })
        },
    })
    return mutationCreate
}
