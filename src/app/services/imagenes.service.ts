import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/

@Injectable({
    providedIn: 'root'
})
export class ImagenesService {

    constructor(private http: HttpClient) { }

    guardarArchivo(src: any, idArticulo: Number){
        return this.http.post(`${environment.API_URL_IMAGENES}/guardarArchivo/`,{"src" : src, "idArticulo" : idArticulo});
    }

}
