import { computed, inject } from "@angular/core"
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { ToastService } from "../services/toast.service"
import { DashboardService } from "../services/dashboard.service"
import { Grafica, TotalTareasTrabajo } from "../interfaces/dashboard"
import { Respuestas } from "../interfaces/respuestas"

type DashboardState = {
    isLoading: boolean;
    graficas: Grafica;
    cantidadTrabajos: TotalTareasTrabajo[];
}

const initialState: DashboardState = {
    isLoading: false,
    graficas: {} as Grafica,
    cantidadTrabajos: []
}

export const DashboardStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state) => ({
        list_grafica: computed(() => {
            const grafica = state.graficas() as Grafica
            return grafica
        }),
        list_tareas_trabajo: computed(() => {
            const trabajos_tareas = state.cantidadTrabajos()
            return trabajos_tareas
        })
    })),
    withMethods((store, toast = inject(ToastService), dashboardServices = inject(DashboardService)) => ({
        loadDashboard() {
            patchState(store, { isLoading: true })
            dashboardServices.admin_dashboard().subscribe(
                {
                    next(event: Respuestas) {
                        if (event.exito) {
                            patchState(store, {
                                isLoading: false,
                                graficas: event._cantidad_registros as Grafica,
                                cantidadTrabajos: event._tareas_trabajo as TotalTareasTrabajo[]
                            })
                        } else {
                            toast.showError(event.mensajeError, 'Error')
                        }
                    },
                    error(err) {
                        toast.showError(err, 'Error')
                    },
                }
            )
        }
    }))
)