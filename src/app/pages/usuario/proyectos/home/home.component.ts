import { Component, inject } from '@angular/core';
import { ButtonOpenAddComponent } from "../../../../shared/components/button-open-add/button-open-add.component";
import { Router } from '@angular/router';
import { ProyectoCardComponent } from "../../../../components/usuario/proyectos/proyecto-card/proyecto-card.component";
import { ProyectosStore } from '../../../../core/store/productos.store';
import { Proyectos } from '../../../../core/interfaces/proyectos';
import { NgxSpinnerService } from 'ngx-spinner';
import { OffcanvasComponent } from "../../../../shared/components/offcanvas/offcanvas.component";

@Component({
  selector: 'app-home',
  imports: [ButtonOpenAddComponent, ProyectoCardComponent, OffcanvasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [ProyectosStore]
})
export class HomeComponent {

  readonly proyecto_Store = inject(ProyectosStore)
  router = inject(Router)
  spinner = inject(NgxSpinnerService)

  dataOffCanvas!: Proyectos

  constructor() {
    this.proyecto_Store.loadProyectos()
  }

  addProyecto() {
    this.router.navigateByUrl('/user/proyectos/create')
  }

  dltProyecto(event: Proyectos) {
    this.proyecto_Store.DeleteProyecto(event.idProyectos as string)
  }

  filtros($event: Event) {
    this.spinner.show()
    const target = $event.target as HTMLSelectElement
    const value = target.value
    if (value == 'Aa-Zz') {
      this.proyecto_Store.changeFilter('asc')
    } else if (value == 'Zz-Aa') {
      this.proyecto_Store.changeFilter('desc')
    } else {
      this.proyecto_Store.changeFilter('none')
    }

    setTimeout(() => {
      this.spinner.hide()
    }, 1000);

  }
  vwProyecto(event: Proyectos) {
    this.dataOffCanvas = event
  }
}
