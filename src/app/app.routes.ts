import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { HomeComponent } from './pages/usuario/home/home.component';
import { HomeComponent as HomeNotasComponent } from './pages/usuario/notas/home/home.component';
import { CreateUpdateComponent as NotasCreateUpdateComponent } from './pages/usuario/notas/create-update/create-update.component';
import { notAuthenticationGuard } from './core/guards/not-authentication.guard';
import { authenticationGuard } from './core/guards/authentication.guard';
import { rolesGuard } from './core/guards/roles.guard';
import { HomeComponent as HomeProyectosComponent } from './pages/usuario/proyectos/home/home.component';
import { CreateUpdateComponent as ProyectoCreateUpdateComponent } from './pages/usuario/proyectos/create-update/create-update.component';
import { TrabajosHomeComponent } from './pages/usuario/trabajos/trabajos-home/trabajos-home.component';
import { CreateUpdateComponent as TrabajosCreateUpdate } from './pages/usuario/trabajos/create-update/create-update.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'auth' },

    // Autenticacion y Registro
    {
        path: 'auth', children: [
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ], canActivate: [notAuthenticationGuard]
    },

    // Rol de Usuario
    {
        path: 'user', component: NavbarComponent, children: [
            {
                path: '', component: HomeComponent
            },
            {
                path: 'inicio', redirectTo: ''
            },
            {
                path: 'notas', component: HomeNotasComponent
            },
            {
                path: 'notas/create', component: NotasCreateUpdateComponent
            },
            {
                path: 'notas/:id/edit', component: NotasCreateUpdateComponent
            },
            {
                path: 'trabajos', component: TrabajosHomeComponent
            },
            {
                path: 'trabajos/create', component: TrabajosCreateUpdate
            },
            {
                path: 'trabajos/:id/edit', component: TrabajosCreateUpdate
            },
            {
                path: 'proyectos', component: HomeProyectosComponent
            },
            {
                path: 'proyectos/create', component: ProyectoCreateUpdateComponent
            },
            {
                path: 'proyectos/:id/edit', component: ProyectoCreateUpdateComponent
            }
        ], canActivate: [authenticationGuard, rolesGuard], data: { roles: ['Usuario'] }
    }


];
