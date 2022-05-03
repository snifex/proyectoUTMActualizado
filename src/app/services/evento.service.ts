import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evento } from '../models/evento.model';

@Injectable({
    providedIn: 'root'
})
export class EventoService {

    constructor(private http: HttpClient) { }
 
    agregarEvento(evento: Evento) {
        return this.http.post(`${environment.API_URI}/eventos/create`, evento)
    }
    
    obtenerEventosProfesor(idProfesor: number, fechaIni: string, fechafin: string) {
        return this.http.get(`${environment.API_URI}/eventos/eventosByProfesor/${idProfesor}/${fechaIni}/${fechafin}`)
    }
}
