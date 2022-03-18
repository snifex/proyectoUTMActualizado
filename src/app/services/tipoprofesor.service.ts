import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/

@Injectable({
  providedIn: 'root'
})
export class TipoProfesorService {

  constructor(private http: HttpClient) { }

  listarTipoProfesor(){
      console.log('listarTipoProfesor')
      return this.http.get(`${environment.API_URI}/tipoprofesor/`);
  }

}
