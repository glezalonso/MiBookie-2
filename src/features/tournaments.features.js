import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
    getTournaments,
    getTournament,
    createTournament,
    updateTournament,
} from '../services/tournament'

export const useGetTournaments = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['tournaments'],
        queryFn: getTournaments,
    })
    return { data, isLoading, isError }
}

export const useGetTournament = (id) => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['tournament', id],
        queryFn: () => getTournament(id),
    })
    return { data, isLoading, isError }
}

export const useCreateTournament = () => {
    const queryClient = useQueryClient()
    const mutationCreate = useMutation({
        mutationFn: createTournament,
        onSuccess: () => {
            toast.success('Torneo creado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['tournaments'] })
        },
    })
    return mutationCreate
}

export const useUpdateTournament = () => {
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: updateTournament,
        onSuccess: () => {
            toast.success('Torneo actualizado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['tournaments'] })
        },
    })
    return mutationUpdate
}
