import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { Navbar } from '../../../core/interfaces/navbar';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, SidebarComponent,NgxSpinnerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  spinner = inject(NgxSpinnerService)

  collapsed = signal(false)
  navbar = signal<Navbar[]>(
    [
      {
        idRutas: '',
        ruta: 'inicio',
        icon: 'home'
      },
      {
        idRutas: '',
        ruta: 'notas',
        icon: 'book_4'
      },
      {
        idRutas: '',
        ruta: 'tareas',
        icon: 'keep'
      }, {
        idRutas: '',
        ruta: 'proyectos',
        icon: 'memory'
      }
    ]
  )

  constructor() {
    this.spinner.show()
    setTimeout(() => {
        this.spinner.hide()
    }, 2000);
  }

  closeSidebar(event: boolean) {
    this.collapsed.set(event)
  }
}
