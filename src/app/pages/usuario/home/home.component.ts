import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardStore } from '../../../core/store/home.store';
import { GraficasComponent } from '../../../components/usuario/home/graficas/graficas.component';
import { CardComponent } from "../../../shared/components/card/card.component";
import { MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-home',
  imports: [GraficasComponent, CardComponent, MatExpansionModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DashboardStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  dashboardStore = inject(DashboardStore)

  constructor() {
    this.dashboardStore.loadDashboard()
  }
}
