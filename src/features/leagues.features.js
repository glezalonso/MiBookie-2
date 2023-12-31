import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
    createLeague,
    deleteLeague,
    getLeague,
    getLeagues,
    updateLeague,
    getLeaguesBySport,
} from '../services/leagues'

export const useGetLeagues = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Leagues'],
        queryFn: getLeagues,
    })
    return { data, isLoading, isError }
}
export const useGetLeague = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['League', id],
        queryFn: () => getLeague(id),
    })
    return { data, isLoading, isError }
}
export const useDeleteLeague = () => {
    const queryClient = useQueryClient()
    const mutationDelete = useMutation({
        mutationFn: deleteLeague,
        onSuccess: () => {
            toast.success('Liga borrada exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Leagues'] })
        },
    })
    return mutationDelete
}

export const useUpdateLeague = () => {
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: updateLeague,
        onSuccess: () => {
            toast.success('Liga actualizada exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Leagues'] })
        },
    })
    return mutationUpdate
}

export const useCreateLeague = () => {
    const queryClient = useQueryClient()
    const mutationCreate = useMutation({
        mutationFn: createLeague,
        onSuccess: () => {
            toast.success('Liga creada exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Leagues'] })
        },
    })
    return mutationCreate
}

export const useGetLeaguesBySport = (sport) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Leagues'],
        queryFn: () => getLeaguesBySport(sport),
    })
    return { data, isLoading, isError }
}
