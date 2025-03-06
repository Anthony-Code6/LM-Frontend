import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Respuestas } from '../interfaces/respuestas';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private https = inject(HttpClient)
  private url = environment.urlLegionMastes + 'administrador/'

  admin_dashboard(): Observable<Respuestas> {
    return this.https.get<Respuestas>(this.url + 'admin-dashboard/')
  }

}
