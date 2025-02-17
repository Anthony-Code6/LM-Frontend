import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuestas } from '../interfaces/respuestas';
import { NotasCreate, NotasUpdate } from '../interfaces/notas';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private endPoint: string = environment.urlLegionMastes + 'notas/'
  private http = inject(HttpClient)

  notas_sellst_usuario(): Observable<Respuestas> {
    return this.http.get<Respuestas>(this.endPoint + 'notas-sellst')
  }

  notas_inst_usuario(datos: NotasCreate): Observable<Respuestas> {
    return this.http.post<Respuestas>(this.endPoint + 'notas-create', datos)
  }

  notas_dlt_usuario(id: string): Observable<Respuestas> {
    return this.http.delete<Respuestas>(this.endPoint + 'notas-delete/' + id)
  }

  notas_upd_usuario(datos: NotasUpdate): Observable<Respuestas> {
    return this.http.put<Respuestas>(this.endPoint + 'notas-update', datos)
  }

  notas_get_usuario(id: string): Observable<Respuestas> {
    return this.http.get<Respuestas>(this.endPoint + 'notas-search/' + id)
  }
}
