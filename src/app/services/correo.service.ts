import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/


@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  constructor(private http: HttpClient) { }
  enviarCorreoRecuperarContrasenya(correo:any){
    return this.http.post(`${environment.API_URI_CORREOS}/enviarCorreoRecuperarContrasenya/`,correo
);
  }
  decodificarMail(token:any){
    return this.http.post(`${environment.API_URI_CORREOS}/decodificarMail/`,token);
  }
}
