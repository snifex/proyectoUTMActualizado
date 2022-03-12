import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/


@Injectable({
	providedIn: 'root'
})
export class ArticuloService {

	constructor(private http: HttpClient) { }
	listByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/Articulo/listByProfesor/${idProfesor}`);
	}
	listByPeriodo(ini:any, fin:any){
		console.log(ini,fin)
		return this.http.get(`${environment.API_URI}/Articulo/listByPeriodo/${ini}/${fin}`);
	}
}
