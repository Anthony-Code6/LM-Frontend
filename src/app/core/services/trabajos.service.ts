import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuestas } from '../interfaces/respuestas';
import { TareaUpdStatus, TrabajoCreate } from '../interfaces/trabajos';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  private https = inject(HttpClient)
  private url = environment.urlLegionMastes + 'tareas/'

  trabajos_usuario_sellst(): Observable<Respuestas> {
    return this.https.get<Respuestas>(this.url + 'trabajo-list')
  }

  trabajos_usurio_inst(datos: TrabajoCreate): Observable<Respuestas> {
    return this.https.post<Respuestas>(this.url + 'trabajo-create', datos)
  }

  trabajo_tarea_usuario_upd_estado(datos: TareaUpdStatus): Observable<Respuestas> {
    return this.https.put<Respuestas>(this.url + 'tarea-status-update', datos)
  }

  trabajo_usuario_getTrabajo(id: string): Observable<Respuestas> {
    return this.https.get<Respuestas>(this.url + 'trabajo-search/' + id)
  }
}
