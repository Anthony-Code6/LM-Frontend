import { Component, computed, inject, input, output } from '@angular/core';
import { Trabajos } from '../../../../core/interfaces/trabajos';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-trabajos-card',
  imports: [RouterLink, CardComponent],
  templateUrl: './trabajos-card.component.html',
  styleUrl: './trabajos-card.component.scss',
  providers: [DatePipe]
})
export class TrabajosCardComponent {
  trabajos = input<Trabajos>()
  datePipe = inject(DatePipe)

  sendTrabajo = output<Trabajos>()

  formatDate = computed(() => {
    return this.datePipe.transform(this.trabajos()?.fecha, 'dd-MM-yyyy') as string
  })

  totalTareas = computed(() => {
    const total = this.trabajos()?.Tareas.length as number
    return total > 0 ? total : 0
  })

  enviarTrabajo(){
    this.sendTrabajo.emit(this.trabajos() as Trabajos)
  }
}
