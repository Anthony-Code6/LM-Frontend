import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Proyectos, ProyectosCreate, ProyectosUpdate } from "../interfaces/proyectos"
import { computed, inject } from "@angular/core";
import { ProyectosService } from "../services/proyectos.service";
import { Respuestas } from "../interfaces/respuestas";
import { ToastService } from "../services/toast.service";
import { routes } from "../../app.routes";
import { Router } from "@angular/router";

type Filter = 'asc' | 'desc' | 'none'

type ProyectosState = {
    proyectos: Proyectos[] | Proyectos;
    filter: Filter;
    isLoading: boolean;
}

const initialState: ProyectosState = {
    proyectos: [],
    isLoading: false,
    filter: 'none'
}

export const ProyectosStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        proyectos_length: computed(() => {
            const proyectos = state.proyectos() as Proyectos[]
            return proyectos.length
        }),
        list_proyectos: computed(() => {
            const proyectos = state.proyectos() as Proyectos[]
            const filter = state.filter()

            if(filter == 'asc'){
                return proyectos.sort((a,b)=>a.titulo.localeCompare(b.titulo))
            }

            if(filter == 'desc'){
                return proyectos.sort((a,b)=>b.titulo.localeCompare(a.titulo))
            }

            return proyectos;
        }),
        get_Proyecto: computed(() => {
            const proyecto = state.proyectos() as Proyectos
            return proyecto
        })
    })),
    withMethods((store, proyectoService = inject(ProyectosService), toast = inject(ToastService), router = inject(Router)) => ({
        changeFilter(filter: Filter) {
            patchState(store, { filter })
        },
        loadProyectos() {
            patchState(store, { isLoading: true })
            proyectoService.proyectos_usuario_sellst().subscribe((event: Respuestas) => {
                if (event.exito) {
                    patchState(store, { proyectos: event._proyectos as Proyectos[], isLoading: false })
                } else {
                    toast.showError(event.mensajeError, 'Error')
                }
            })
        },
        AddProyecto(datos: ProyectosCreate) {
            patchState(store, { isLoading: true })
            const proyectos = store.proyectos() as Proyectos[]
            proyectoService.proyectos_usuario_create(datos).subscribe((event: Respuestas) => {
                if (event.exito) {
                    proyectos.push(event._proyectos as Proyectos)
                    patchState(store, { proyectos: proyectos, isLoading: false })
                } else {
                    toast.showError(event.mensajeError, 'Error')
                }
            })
        },
        DeleteProyecto(id: string) {
            patchState(store, { isLoading: true })
            const proyectos = store.proyectos() as Proyectos[]
            proyectoService.proyectos_usuario_delete(id).subscribe(
                {
                    next(event: Respuestas) {
                        if (event.exito) {
                            const reload_proyectos = proyectos.filter(proyecto => proyecto.idProyectos !== id)
                            patchState(store, { proyectos: reload_proyectos, isLoading: false })
                        } else {
                            toast.showError(event.mensajeError, 'Error')
                        }
                    }, error(err) {
                        router.navigateByUrl('/user/proyectos')
                    },
                }
            )
        },
        GetProyectos(id: string) {
            proyectoService.proyectos_usuario_getProyecto(id).subscribe(
                {
                    next(event: Respuestas) {
                        if (event.exito) {
                            patchState(store, { proyectos: event._proyectos as Proyectos, isLoading: false })
                        } else {
                            //toast.showError(event.mensajeError, 'Error v1')
                        }
                    }, error(err) {
                        router.navigateByUrl('/user/proyectos')
                    },
                }
            )
        },
        UpdateProyecto(datos: ProyectosUpdate) {
            this.loadProyectos()
            patchState(store, { isLoading: true })
            const proyecto_listar = store.proyectos() as Proyectos[]
            proyectoService.proyectos_usuario_update(datos).subscribe(
                {
                    next(event: Respuestas) {
                        if (event.exito) {
                            const index = proyecto_listar.findIndex((filter) => filter.idProyectos === datos.idProyectos)
                            console.log('index edit',index);
                            
                            
                            if (index !== -1) {
                                proyecto_listar[index] = { ...proyecto_listar[index], ...event._proyectos as Proyectos }
                                patchState(store, { proyectos: proyecto_listar, isLoading: false })
                            }
                        } else {
                            //toast.showError(event.mensajeError, 'Error v1')
                        }
                    }, error(err) {
                        router.navigateByUrl('/user/proyectos')
                    },
                }
            )
        }
    }))
)