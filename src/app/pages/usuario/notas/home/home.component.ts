import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotasCardComponent } from "../../../../components/usuario/notas/notas-card/notas-card.component";
import { NotasService } from '../../../../core/services/notas.service';
import { NotasStore } from '../../../../core/store/notas.store';
import { Notas } from '../../../../core/interfaces/notas';
import { OffcanvasComponent } from "../../../../shared/components/offcanvas/offcanvas.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonLinksComponent } from "../../../../shared/components/button-links/button-links.component";
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [NotasCardComponent, OffcanvasComponent, ButtonLinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [NotasStore]
})
export class HomeComponent {

  services = inject(AuthService)
  router = inject(Router)
  notasServices = inject(NotasService)
  dataOffCanvas!: Notas
  readonly notas_Store = inject(NotasStore)
  spinner = inject(NgxSpinnerService)

  constructor() {
    this.notas_Store.loadNotas()
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 700);
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
