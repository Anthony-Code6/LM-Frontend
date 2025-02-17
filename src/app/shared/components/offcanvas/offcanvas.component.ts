import { Component, computed, inject, input } from '@angular/core';
import { Proyectos } from '../../../core/interfaces/proyectos';
import { DatePipe } from '@angular/common';
import { Notas } from '../../../core/interfaces/notas';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-offcanvas',
  imports: [],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.scss',
  providers: [DatePipe]
})
export class OffcanvasComponent {
  proyecto = input<Proyectos>()
  nota = input<Notas>()
  pipeDate = inject(DatePipe)
  convertHtml = inject(DomSanitizer)

  estado = computed(() => {
    return this.proyecto()?.estado ? true : false;
  })
  fechaFormat = computed(() => {
    let fecha_formateada = ''
    if (this.proyecto()) {
      fecha_formateada = this.pipeDate.transform(this.proyecto()?.fecha, 'dd-MM-yyyy') as string
    }
    if (this.nota()) {
      fecha_formateada = this.pipeDate.transform(this.nota()?.fecha, 'dd-MM-yyyy') as string
    }
    return fecha_formateada
  })

  contenidoHtml = computed(() => {
    return this.convertHtml.bypassSecurityTrustHtml(this.nota()?.nota.toString() as string)
  })
}
