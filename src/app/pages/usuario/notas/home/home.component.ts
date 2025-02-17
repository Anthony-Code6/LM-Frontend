import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonOpenAddComponent } from '../../../../shared/components/button-open-add/button-open-add.component';
import { NotasCardComponent } from "../../../../components/usuario/notas/notas-card/notas-card.component";
import { NotasService } from '../../../../core/services/notas.service';
import { NotasStore } from '../../../../core/store/notas.store';
import { Notas } from '../../../../core/interfaces/notas';
import { OffcanvasComponent } from "../../../../shared/components/offcanvas/offcanvas.component";

@Component({
  selector: 'app-home',
  imports: [ButtonOpenAddComponent, NotasCardComponent, OffcanvasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NotasStore]
})
export class HomeComponent {

  router = inject(Router)
  notasServices = inject(NotasService)
  dataOffCanvas!: Notas
  readonly notas_Store = inject(NotasStore)

  constructor() {
    this.notas_Store.loadNotas()
  }

  addNota() {
    this.router.navigateByUrl('/user/notas/create')
  }

  delete_nota(event: Notas) {
    this.notas_Store.DeleteNota(event.idNotas)
  }

  filtros($event: Event) {
    const target = $event.target as HTMLSelectElement
    const value = target.value

    if (value == 'Aa-Zz') {
      this.notas_Store.changeFilter('asc')
    } else if (value == 'Zz-Aa') {
      this.notas_Store.changeFilter('desc')
    } else {
      this.notas_Store.changeFilter('none')
    }
  }

  view_Nota(event: Notas) {
    this.dataOffCanvas = event
  }

}
