import { Component, computed, inject, input, output } from '@angular/core';
import { Notas } from '../../../../core/interfaces/notas';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-notas-card',
  imports: [RouterLink, CardComponent],
  templateUrl: './notas-card.component.html',
  styleUrl: './notas-card.component.scss',
  providers: [DatePipe]
})
export class NotasCardComponent {
  datePipe = inject(DatePipe)
  convertHtml = inject(DomSanitizer)

  nota_delete = output<Notas>()
  view = output<Notas>()

  notas = input<Notas>()
  fechaFormat = computed(() => {
    return this.datePipe.transform(this.notas()?.fecha, 'dd-MM-yyyy')
  })

  contenidoHtml = computed(() => {
    return this.convertHtml.bypassSecurityTrustHtml(this.notas()?.nota.toString() as string)
  })

  deleteNota() {
    this.nota_delete.emit(this.notas() as Notas)
  }

  viewNotas() {
    this.view.emit(this.notas() as Notas)
  }
}
