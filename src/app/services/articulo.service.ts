import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Articulo } from '../models/articulo.model';


@Injectable({
	providedIn: 'root'
})
export class ArticuloService {

	constructor(private http: HttpClient) { }
	listByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/articulo/listByProfesor/${idProfesor}`);
	}
	
	listByPeriodo(ini:any, fin:any){
		console.log(ini,fin)
		return this.http.get(`${environment.API_URI}/articulo/listByPeriodo/${ini}/${fin}`);
	}

	crearArticulo(idProfesor: number, articulito: Articulo) {
		return this.http.post(`${environment.API_URI}/articulo/create/${idProfesor}`,articulito);
	}

	listByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URI}/articulo/listByInstituto/${idInstituto}`);
	}

	listArticulos(){
		return this.http.get(`${environment.API_URI}/articulo/`);
	}
}
