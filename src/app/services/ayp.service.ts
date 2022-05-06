import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Articulo } from '../models/articulo.model';

@Injectable({
    providedIn: 'root'
})
export class AypService {

    constructor(private http: HttpClient) { }

    listByInstitutoOfFirstAutor(idInstituto: number) {
        return this.http.get(`${environment.API_URI}/articuloyprofesor/listbyinstitutooffirstautor/${idInstituto}`);
    }

    listByFirstAutorAndDate(idProfesor: number, fechaInicio:any, fechaFin:any){
        return this.http.get(`${environment.API_URI}/articuloyprofesor/listbyfirstautoranddate/${idProfesor}/${fechaInicio}/${fechaFin}`);
    }

    listByInstitutoAndDate(idInstituto: number, fechaInicio: any, fechaFin:any){
        return this.http.get(`${environment.API_URI}/articuloyprofesor/listbyinstitutoanddate/${idInstituto}/${fechaInicio}/${fechaFin}`);
    }

    listByAllFilters(idInstituto: number, idProfesor:number, fechaInicio: any, fechaFin:any){
        return this.http.get(`${environment.API_URI}/articuloyprofesor/listbyallfilters/${idInstituto}/${idProfesor}/${fechaInicio}/${fechaFin}`);
    }
}
