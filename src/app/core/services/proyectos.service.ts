import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProyectosCreate, ProyectosUpdate } from '../interfaces/proyectos';
import { Observable } from 'rxjs';
import { Respuestas } from '../interfaces/respuestas';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private url: string = environment.urlLegionMastes + 'proyectos/'
  private https = inject(HttpClient)

  proyectos_usuario_sellst(): Observable<Respuestas> {
    return this.https.get<Respuestas>(this.url + 'proyectos-sellst')
  }

  proyectos_usuario_getProyecto(id: string): Observable<Respuestas> {
    return this.https.get<Respuestas>(this.url + 'proyectos-search/' + id)
  }

  proyectos_usuario_create(datos: ProyectosCreate): Observable<Respuestas> {
    return this.https.post<Respuestas>(this.url + 'proyectos-create', datos)
  }

  proyectos_usuario_delete(proyecto: string): Observable<Respuestas> {
    return this.https.delete<Respuestas>(this.url + 'proyectos-delete/' + proyecto)
  }

  proyectos_usuario_update(datos: ProyectosUpdate): Observable<Respuestas> {
    return this.https.put<Respuestas>(this.url + 'proyectos-update', datos)
  }
}
