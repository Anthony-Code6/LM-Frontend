import { Component, inject, signal } from '@angular/core';
import { TrabajosCardComponent } from "../../../../components/usuario/trabajos/trabajos-card/trabajos-card.component";
import { TrabajoStore } from '../../../../core/store/trabajos.store';
import { OffcanvasComponent } from "../../../../shared/components/offcanvas/offcanvas.component";
import { TareaUpdStatus, Trabajos } from '../../../../core/interfaces/trabajos';
import { Router } from '@angular/router';
import { ButtonLinksComponent } from "../../../../shared/components/button-links/button-links.component";

@Component({
  selector: 'app-trabajos-home',
  imports: [TrabajosCardComponent, OffcanvasComponent, ButtonLinksComponent],
  templateUrl: './trabajos-home.component.html',
  styleUrl: './trabajos-home.component.scss',
  providers: [TrabajoStore]
})
export class TrabajosHomeComponent {

  readonly trabajoStore = inject(TrabajoStore)
  trabajo_view!: Trabajos
  router = inject(Router)

  constructor() {
    this.trabajoStore.loadTrabajo()
  }

  viewTrabajo(event: Trabajos) {
    this.trabajoStore.GetTrabajos(event.idTrabajos)
  }

  updateEstado(event: TareaUpdStatus) {
    this.trabajoStore.UpdateTareaEstado(event)
  }
}
