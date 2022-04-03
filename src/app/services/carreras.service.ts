import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Carrera } from '../models/carrera.model';

@Injectable({
    providedIn: 'root',
})
export class CarrerasService {
    constructor(private http: HttpClient) { }

    listCarreras() {
        return this.http.get(`${environment.API_URI}/carreras/`);
    }

    listCarrerasByInstituto(idInstituto: number) {
        return this.http.get(
            `${environment.API_URI}/carreras/getCarrerasByInstituto/${idInstituto}`
        );
    }
    
    crearCarrera(nuevaCarrera : Carrera){
        return this.http.post(`${environment.API_URI}/carreras/create`,nuevaCarrera)
    }

    eliminarCarrera(idCarrera: Number){
        return this.http.delete(`${environment.API_URI}/carreras/eliminar/${idCarrera}`);
    }

    modificarCarrera(idCarrera: Number, carreraModificar: Carrera){
        return this.http.post(`${environment.API_URI}/carreras/actualizar/${idCarrera}`,carreraModificar);
    }

}
