import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { Notas, NotasCreate, NotasUpdate } from "../interfaces/notas"
import { computed, inject } from "@angular/core"
import { NotasService } from "../services/notas.service"
import { Respuestas } from "../interfaces/respuestas"
import { ToastService } from "../services/toast.service"
import { Router } from "@angular/router"

type Filter = 'asc' | 'desc' | 'none'

type NotasStates = {
    notas: Notas[] | Notas;
    isLoading: boolean;
    filter: Filter;
}

const initialState: NotasStates = {
    notas: [],
    isLoading: false,
    filter: 'none'
}

export const NotasStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        list_notas: computed(() => {
            const notas = state.notas() as Notas[]
            const filtro = state.filter()
            if (filtro === 'asc') {
                return notas.sort((a, b) => a.titulo.localeCompare(b.titulo))
            }
            if (filtro === 'desc') {
                return notas.sort((a, b) => b.titulo.localeCompare(a.titulo));
            }
            return notas
        }),
        get_nota: computed(() => {
            const nota = state.notas() as Notas
            return nota
        })
    })),
    withMethods((store, notasServices = inject(NotasService), router = inject(Router), toast = inject(ToastService)) => ({
        changeFilter: (filter: Filter) => {
            patchState(store, { filter })
        },
        loadNotas: async () => {
            patchState(store, { isLoading: true })
            notasServices.notas_sellst_usuario().subscribe((event: Respuestas) => {
                if (event.exito) {
                    patchState(store, { notas: event._notas as Notas[], isLoading: false })
                } else {
                    toast.showError(event.mensajeError, 'Error')
                }
            })
        },

        AddNota: (datos: NotasCreate) => {
            patchState(store, { isLoading: true })
            const notas = store.notas() as Notas[];
            notasServices.notas_inst_usuario(datos).subscribe((event: Respuestas) => {
                if (event.exito) {
                    notas.push(event._notas as Notas);
                    patchState(store, { notas });
                } else {
                    toast.showError(event.mensajeError, 'Error')
                }
            })
        },

        UpdateNota: (datos: NotasUpdate) => {
            patchState(store, { isLoading: true })
            const notas = store.notas() as Notas[];
            notasServices.notas_upd_usuario(datos).subscribe((event: Respuestas) => {
                if (event.exito) {
                    const index = notas.findIndex(nota => nota.idNotas == datos.idNotas);
                    if (index !== -1) {
                        notas[index] = { ...notas[index], ...event._notas as Notas };
                        patchState(store, { notas, isLoading: false });
                    } else {
                        console.error("Nota no encontrada.");
                    }
                } else {
                    toast.showError(event.mensajeError, 'Error')
                }
            })

        },

        // Método para buscar notas por un criterio (ejemplo, por título)
        SearchNotas: (notaId: string) => {
            patchState(store, { isLoading: true })
            notasServices.notas_get_usuario(notaId).subscribe(
                {
                    next(event: Respuestas) {
                        if (event.exito) {
                            patchState(store, { notas: event._notas as Notas, isLoading: false });
                        } else {
                            toast.showError(event.mensajeError, 'Error')
                        }
                    }, error(err) {
                        router.navigateByUrl('/user/notas')
                    },
                }
            )
        },

        // Método para eliminar una nota por su id
        DeleteNota: (notaId: string) => {
            patchState(store, { isLoading: true })
            const notas = store.notas() as Notas[];
            notasServices.notas_dlt_usuario(notaId).subscribe((event: Respuestas) => {
                if (event.exito) {
                    const notas_update = notas.filter(nota => nota.idNotas !== notaId)

                    patchState(store, { notas: notas_update, isLoading: false, filter: 'none' });
                } else {
                    toast.showError(event.mensajeError, 'Error')
                }
            })
        }

    }))
)


