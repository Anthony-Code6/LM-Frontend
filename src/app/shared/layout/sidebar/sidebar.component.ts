import { Component, ElementRef, HostListener, inject, Input, input, output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../../core/interfaces/navbar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navbar = input<Navbar[]>()
  sideNavCollapsed = signal(false);
  closeSidebar = output<boolean>()
  authServices = inject(AuthService)
  router = inject(Router)
  sidebarRef = inject(ElementRef)

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }

  sidebarClose() {
    if (this.sideNavCollapsed()) {
      this.closeSidebar.emit(false)
    }
  }

  logout() {
    this.authServices.logout()
    this.router.navigate(['/'])
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const sidebarElement = this.sidebarRef.nativeElement;
    if (!sidebarElement.contains(event.target)) {
      this.sidebarClose(); // Si el clic no es dentro del sidebar, cerramos el sidebar
    }
  }


}
