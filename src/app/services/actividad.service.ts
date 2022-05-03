import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actividad } from '../models/actividad.model';
@Injectable({
    providedIn: 'root'
})
export class ActividadService {

    constructor(private http: HttpClient) { }

    agregarEvento(actividad: Actividad) {
        return this.http.post(`${environment.API_URI}/actividades/create`, actividad)
    }

    obtenerActividadesProfesor(idProfesor: number, fechaIni: string, fechafin: string) {
        return this.http.get(`${environment.API_URI}/actividades/eventosByProfesor/${idProfesor}/${fechaIni}/${fechafin}`)
    }
}
