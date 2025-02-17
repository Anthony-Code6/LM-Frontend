import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Proyectos } from '../../../../core/interfaces/proyectos';

@Component({
  selector: 'app-proyecto-card',
  imports: [RouterLink],
  templateUrl: './proyecto-card.component.html',
  styleUrl: './proyecto-card.component.scss'
})
export class ProyectoCardComponent {
  proyecto = input<Proyectos>()
  delete = output<Proyectos>()
  view = output<Proyectos>()

  estado = computed(() => {
    return this.proyecto()?.estado ? true : false;
  })

  deleteProyecto() {
    this.delete.emit(this.proyecto() as Proyectos)
  }

  viewProyecto() {
    this.view.emit(this.proyecto() as Proyectos)
  }
}
