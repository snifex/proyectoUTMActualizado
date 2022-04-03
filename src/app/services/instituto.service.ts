import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Instituto } from '../models/instituto.model';

@Injectable({
    providedIn: 'root',
})
export class InstitutoService {
    constructor(private http: HttpClient) { }

    listInstitutos() {
        return this.http.get(`${environment.API_URI}/institutos/all`);
    }

    crearInstituto(nuevoInstituto: Instituto) {
        return this.http.post(`${environment.API_URI}/institutos/create`,nuevoInstituto)
    }

    eliminarInstituto(idInstituto: number){
        return this.http.delete(`${environment.API_URI}/institutos/eliminar/${idInstituto}`);
    }

    modificarInstituto(institutoModificar: Instituto, idInstituto: Number){
        return this.http.post(`${environment.API_URI}/institutos/actualizar/${idInstituto}`,institutoModificar);
    }
}
