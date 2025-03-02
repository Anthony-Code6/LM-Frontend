import { Component, inject, signal } from '@angular/core';
import { NotaCreateUpdateComponent } from "../../../../components/usuario/notas/nota-create-update/nota-create-update.component";
import { NotasStore } from '../../../../core/store/notas.store';
import { Notas, NotasCreate, NotasUpdate } from '../../../../core/interfaces/notas';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-update',
  imports: [NotaCreateUpdateComponent],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
  providers: [NotasStore],
})
export class CreateUpdateComponent {
  readonly notas_Store = inject(NotasStore)
  notas!: Notas
  router = inject(Router)
  activeRouter = inject(ActivatedRoute)
  spinner = inject(NgxSpinnerService)
  notaId = signal<string>('')

  constructor() {

    this.spinner.show()
    this.activeRouter.params.subscribe((state) => {
      if (state['id'] != '' && state['id'] != undefined) {
        this.notaId.set(state['id'])
        this.notas_Store.SearchNotas(state['id'])
      }
    })

    setTimeout(() => {
      this.spinner.hide()
    }, 3000);

    // Recibe la informacion por los parametro de la url
  }

  AddNota(event: NotasCreate | NotasUpdate) {
    if ('idNotas' in event) {
      this.notas_Store.UpdateNota(event)
    } else {
      this.notas_Store.AddNota(event)
    }
    setTimeout(() => {
      this.router.navigateByUrl('/user/notas')
    })
  }
}
