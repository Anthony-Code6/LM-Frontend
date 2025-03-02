import { Component, inject, signal } from '@angular/core';
import { TrabajosCreateUpdateComponent } from "../../../../components/usuario/trabajos/trabajos-create-update/trabajos-create-update.component";
import { TrabajoStore } from '../../../../core/store/trabajos.store';
import { TrabajoCreate } from '../../../../core/interfaces/trabajos';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-update',
  imports: [TrabajosCreateUpdateComponent],
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.scss',
  providers: [TrabajoStore]
})
export class CreateUpdateComponent {

  readonly trabajoStore = inject(TrabajoStore)
  private routerAdtived = inject(ActivatedRoute)
  private spinner = inject(NgxSpinnerService)
  trabajoId = signal<string>('')

  constructor() {
    this.spinner.show()
    this.routerAdtived.params.subscribe((param) => {
      const parametro = param['id']

      if (parametro) {
        this.trabajoId.set(param['id'])

      }

    })

    setTimeout(() => {
      this.spinner.hide()
    }, 2000);
  }

  GuardarTrabajo(event: TrabajoCreate) {
    this.trabajoStore.AddTrabajo(event)
  }
}
