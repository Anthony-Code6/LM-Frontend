import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { Proyectos } from '../../../core/interfaces/proyectos';
import { DatePipe } from '@angular/common';
import { Notas } from '../../../core/interfaces/notas';
import { DomSanitizer } from '@angular/platform-browser';
import { TareaUpdStatus, Trabajos } from '../../../core/interfaces/trabajos';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-offcanvas',
  imports: [MatCheckboxModule],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffcanvasComponent {
  tareaStatus = output<TareaUpdStatus>()

  // Interface de Informacion
  proyecto = input<Proyectos>()
  nota = input<Notas>()
  trabajo = input<Trabajos>()
  // Pipe
  pipeDate = inject(DatePipe)
  convertHtml = inject(DomSanitizer)

  estado = computed(() => {
    return this.proyecto()?.estado ? true : false;
  })

  fechaFormat = computed(() => {
    let fecha_formateada = ''
    if (this.proyecto()) {
      fecha_formateada = this.pipeDate.transform(this.proyecto()?.fecha, 'dd-MM-yyyy') as string
    } else if (this.nota()) {
      fecha_formateada = this.pipeDate.transform(this.nota()?.fecha, 'dd-MM-yyyy') as string
    } else if (this.trabajo()) {
      fecha_formateada = this.pipeDate.transform(this.trabajo()?.fecha, 'dd-MM-yyyy') as string
    }
    return fecha_formateada
  })

  contenidoHtml = computed(() => {
    return this.convertHtml.bypassSecurityTrustHtml(this.nota()?.nota.toString() as string)
  })

  sendEstado(event: Event) {
    const target = event.target as HTMLInputElement
    let estadoUpdate: TareaUpdStatus = {
      idTareas: target.value,
      idTrabajo: this.trabajo()?.idTrabajos as string, // target.getAttribute('trabajo')
      estado: target.checked
    }
    this.tareaStatus.emit(estadoUpdate)
  }
}
