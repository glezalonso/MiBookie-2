import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import {
    addLineUp,
    closeMatch,
    createMatch,
    deleteMatch,
    getMatch,
    getMatches,
    removeLineUp,
    updateMatch,
    // getMatchesByLeague,
    getMatchesByRound,
    getMatchesBySeason,
    getMatchesByTeam,
    getMatchesClosed,
    getMatchesOpen,
    getMatchesToday,
} from '../services/matches'

export const useGetMatches = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matches'],
        queryFn: getMatches,
    })
    return { data, isLoading, isError }
}
export const useGetMatch = (id) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['match', id],
        queryFn: () => getMatch(id),
    })
    return { data, isLoading, isError }
}
export const useDeleteMatch = () => {
    const queryClient = useQueryClient()
    const mutationDelete = useMutation({
        mutationFn: deleteMatch,
        onSuccess: () => {
            toast.success('Partido Borrado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['matches'] })
        },
    })
    return mutationDelete
}

export const useUpdateMatch = () => {
    const queryClient = useQueryClient()
    const mutationUpdate = useMutation({
        mutationFn: updateMatch,
        onSuccess: () => {
            toast.success('Partido actualizado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['matches'] })
        },
    })
    return mutationUpdate
}

export const useCreateMatch = () => {
    const queryClient = useQueryClient()
    const mutationCreate = useMutation({
        mutationFn: createMatch,
        onSuccess: () => {
            toast.success('Partido creado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['matches'] })
        },
    })
    return mutationCreate
}

export const useCloseMatch = () => {
    const queryClient = useQueryClient()
    const mutationClose = useMutation({
        mutationFn: closeMatch,
        onSuccess: () => {
            toast.success('Marcador colocado exitosamente!')
            queryClient.invalidateQueries({ queryKey: ['matches'] })
        },
    })
    return mutationClose
}

export const useAddLineUp = () => {
    const queryClient = useQueryClient()
    const mutationAddLineUp = useMutation({
        mutationFn: addLineUp,
        onSuccess: () => {
            toast.success('Jugador agregado a la alineación!')
            queryClient.invalidateQueries({ queryKey: ['match'] })
        },
    })
    return mutationAddLineUp
}

export const useRemoveLineUp = () => {
    const queryClient = useQueryClient()
    const mutationRemoveLineUp = useMutation({
        mutationFn: removeLineUp,
        onSuccess: () => {
            toast.success('Jugador removido de la alineación!')
            queryClient.invalidateQueries({ queryKey: ['match'] })
        },
    })
    return mutationRemoveLineUp
}

export const useGetMatchesToday = (date) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matchestoday', date],
        queryFn: () => getMatchesToday(date),
    })
    return { data, isLoading, isError }
}
export const useGetMatchesByTeam = (team, limit, status) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matches', team],
        queryFn: () => getMatchesByTeam(team, limit, status),
    })
    return { data, isLoading, isError }
}
// export const useGetMatchesByLeague = (league) => {
//     const { data, isLoading, isError } = useQuery({
//         queryKey: ['matches', league],
//         queryFn: () => getMatchesByLeague(league),
//     })
//     return { data, isLoading, isError }
// }
export const useGetMatchesByRound = (round) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matches', round],
        queryFn: () => getMatchesByRound(round),
    })
    return { data, isLoading, isError }
}
export const useGetMatchesBySeason = (season) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matches', season],
        queryFn: () => getMatchesBySeason(season),
    })
    return { data, isLoading, isError }
}
export const useGetMatchesOpen = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matches'],
        queryFn: getMatchesOpen,
    })
    return { data, isLoading, isError }
}
export const useGetMatchesClosed = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['matches'],
        queryFn: getMatchesClosed,
    })
    return { data, isLoading, isError }
}
