import { Component, inject, signal } from '@angular/core';
import { ProyectoCreateUpdateComponent } from "../../../../components/usuario/proyectos/proyecto-create-update/proyecto-create-update.component";
import { ProyectosStore } from '../../../../core/store/productos.store';
import { ProyectosCreate, ProyectosUpdate } from '../../../../core/interfaces/proyectos';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-update',
  imports: [ProyectoCreateUpdateComponent],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
  providers: [ProyectosStore]
})
export class CreateUpdateComponent {
  readonly proyecto_Store = inject(ProyectosStore)
  router = inject(Router)
  activedRouter = inject(ActivatedRoute)
  spinner = inject(NgxSpinnerService)
  proyectoId: string = ''

  constructor() {
    this.spinner.show()
    this.proyecto_Store.loadProyectos()
    this.activedRouter.params.subscribe(params => {
      const parametro = params['id']
      if (parametro) {
        this.proyectoId = params['id'] as string
        this.proyecto_Store.GetProyectos(params['id'])
      }
    })
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)


  }

  AddEditProyecto(event: ProyectosCreate | ProyectosUpdate) {
    if ('idProyectos' in event) {
      this.proyecto_Store.UpdateProyecto(event)
    } else {
      this.proyecto_Store.AddProyecto(event)
    }

    setTimeout(() => {
      this.router.navigateByUrl('/user/proyectos')
    }, 400)
  }

}
