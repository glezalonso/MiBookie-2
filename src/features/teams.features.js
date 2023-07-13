import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
    getTeams,
    getTeam,
    createTeam,
    updateTeam,
    removePlayer,
    deleteTeam,
    addPlayer,
    getTeamsBySport,
} from '../services/teams'

export const useGetTeams = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Teams'],
        queryFn: getTeams,
    })
    return { data, isLoading, isError }
}
export const useGetTeam = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['Team', id],
        queryFn: () => getTeam(id),
    })
    return { data, isLoading, isError }
}
export const useDeleteTeam = () => {
    const queryClient = useQueryClient()
    const mutationDelete = useMutation({
        mutationFn: deleteTeam,
        onSuccess: () => {
            toast.success('Equipo borrado exitosamnente!')
            queryClient.invalidateQueries({ queryKey: ['Teams'] })
        },
    })
    return mutationDelete
}

export const useUpdateTeam = () => {
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: updateTeam,
        onSuccess: () => {
            toast.success('Equipo actualizado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Teams'] })
        },
    })
    return mutationUpdate
}

export const useCreateTeam = () => {
    const queryClient = useQueryClient()
    const mutationCreate = useMutation({
        mutationFn: createTeam,
        onSuccess: () => {
            toast.success('Equipo creado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['Teams'] })
        },
    })
    return mutationCreate
}

export const useAddPlayer = (id) => {
    const queryClient = useQueryClient()
    const mutationAdd = useMutation({
        mutationFn: addPlayer,
        onSuccess: () => {
            toast.success('Jugador agregado!')
            queryClient.invalidateQueries({ queryKey: ['Team', id] })
            queryClient.invalidateQueries({ queryKey: ['Players'] })
        },
    })
    return mutationAdd
}

export const useRemovePlayer = (id) => {
    const queryClient = useQueryClient()
    const mutationRemove = useMutation({
        mutationFn: removePlayer,
        onSuccess: () => {
            toast.success('Jugador removido!')
            queryClient.invalidateQueries({ queryKey: ['Team', id] })
            queryClient.invalidateQueries({ queryKey: ['Players'] })
        },
    })
    return mutationRemove
}

export const useGetTeamsBySport = (sport) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['teams', sport],
        queryFn: () => getTeamsBySport(sport),
    })
    return { data, isLoading, isError }
}
