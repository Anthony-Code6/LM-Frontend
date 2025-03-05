import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { TareaUpdStatus, TrabajoCreate, Trabajos, TrabajoUpdate } from "../interfaces/trabajos"
import { computed, inject } from "@angular/core"
import { TrabajosService } from "../services/trabajos.service"
import { Router } from "@angular/router"
import { Respuestas } from "../interfaces/respuestas"
import { ToastService } from "../services/toast.service"

type Filter = 'asc' | 'desc' | 'none'

type TrabajosState = {
    trabajos: Trabajos[]
    trabajo: Trabajos
    filter: Filter
    isLoading: boolean
}

const initialState: TrabajosState = {
    trabajos: [],
    trabajo: {} as Trabajos,
    filter: 'none',
    isLoading: false
}

export const TrabajoStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        trabajos_lenght: computed(() => {
            const trabajo = state.trabajos() as Trabajos[]
            return trabajo.length
        }),
        trabajos_list: computed(() => {
            const trabajo = state.trabajos() as Trabajos[]
            return trabajo
        }),
        trabajo_get: computed(() => {
            const trabajo = state.trabajo() as Trabajos
            return trabajo
        })
    })),
    withMethods((store, toast = inject(ToastService), trabajoServices = inject(TrabajosService), router = inject(Router)) => ({
        loadTrabajo() {
            patchState(store, { isLoading: true })
            trabajoServices.trabajos_usuario_sellst().subscribe({
                next(event: Respuestas) {
                    if (event.exito) {
                        patchState(store, {
                            trabajos: event._trabajo as Trabajos[],
                            isLoading: false
                        })
                    }
                }, error(err) {
                    // Error => err
                },
            })
        },

        AddTrabajo(datos: TrabajoCreate) {
            patchState(store, { isLoading: true })
            const trabajos = store.trabajos() as Trabajos[]
            trabajoServices.trabajos_usurio_inst(datos).subscribe({
                next(event: Respuestas) {
                    if (event.exito) {
                        trabajos.push(event._trabajo as Trabajos)
                        patchState(store, { isLoading: false, trabajos: trabajos })
                        toast.showSuccess('Registrado Correctamente', 'Success')
                        router.navigateByUrl('/user/trabajos')
                    } else {
                        toast.showError(event.mensajeError, 'Error')
                    }

                }, error(err) {
                    toast.showError(err, 'Error')
                },
            })
        },

        GetTrabajos(idtrabajo: string) {
            patchState(store, { isLoading: true })
            trabajoServices.trabajo_usuario_getTrabajo(idtrabajo).subscribe(
                {
                    next(event: Respuestas) {
                        if (event.exito) {
                            patchState(store, { trabajo: event._trabajo as Trabajos })
                        } else {
                            //toast.showError(event.mensajeError, 'Error v1')
                        }
                    }, error(err) {
                        toast.showError(err, 'Error')
                    },
                }
            )

        },
        UpdateTareaEstado(datos: TareaUpdStatus) {
            patchState(store, { isLoading: true })
            const trabajos = store.trabajo() as Trabajos
            trabajoServices.trabajo_tarea_usuario_upd_estado(datos).subscribe({
                next(event: Respuestas) {
                    if (event.exito) {
                        patchState(store, {
                            trabajo: { ...trabajos, ...event._trabajo as Trabajos },
                            isLoading: false
                        })
                    } else {
                        toast.showError(event.mensajeError, 'Error')
                    }

                }, error(err) {
                    toast.showError(err, 'Error')
                },
            })
        },
        DeleteTrabajo(trabajoId: string) {
            patchState(store, { isLoading: true })
            const trabajo = store.trabajos()

            trabajoServices.trabajo_usuario_dlt(trabajoId).subscribe({
                next(event: Respuestas) {
                    if (event.exito) {
                        const trabajos = trabajo.filter(element => element.idTrabajos !== trabajoId)
                        patchState(store, { isLoading: false, trabajos: trabajos })
                    } else {
                        toast.showError(event.mensajeError, 'Error')
                    }
                }, error(err) {
                    toast.showError(err, 'Error')
                },
            })

        },
        UpdateTrabajo(datos: TrabajoUpdate) {
            patchState(store, { isLoading: true })
            const trabajos_list = store.trabajos()
            trabajoServices.trabajo_usuario_upd(datos).subscribe({
                next(event: Respuestas) {
                    if (event.exito) {
                        const index = trabajos_list.findIndex((filter) => filter.idTrabajos === datos.idTrabajos)
                        console.log('index',index);
                        
                        if (index !== -1) {
                            trabajos_list[index] = { ...trabajos_list[index], ...event._trabajo }
                            patchState(store, { isLoading: false, trabajos: trabajos_list })
                        }

                        toast.showSuccess('Actualizado Correctamente', 'Success')
                        router.navigateByUrl('/user/trabajos')
                    } else {
                        toast.showError(event.mensajeError, "Error")
                    }
                }, error(err) {
                    toast.showError(err, "Error")
                },
            })
        }
    }))
)