import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  constructor(private http: HttpClient) { }

  listInstitutos(){
      return this.http.get(`${environment.API_URI}/institutos/all`)
  }
}
