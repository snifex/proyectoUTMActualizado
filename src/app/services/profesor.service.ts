import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Profesor } from '../models/profesor.model';

@Injectable({
	providedIn: 'root'
})
export class ProfesorService {

	constructor(private http: HttpClient) { }

	guardarProfesor(profesor: Profesor) {
		return this.http.post(`${environment.API_URI}/profesores/create`, profesor);
	}

	listOne(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/profesores/${idProfesor}`);
	}

	listAutorByArticulo(idArticulo: number) {
		return this.http.get(`${environment.API_URI}/profesores/listAutorByArticulo/${idArticulo}`);
	}

	cambiarContrasena(profesor: Profesor, idProfesor: number) {
		return this.http.post(`${environment.API_URI}/profesores/cambiarContrasena/${idProfesor}`,profesor);
	}

	listProfesoresByCarrera(idCarrera: number) {
		return this.http.get(`${environment.API_URI}/profesores/listProfesoresByCarrera/${idCarrera}`);
	}

	listProfesoresByInstituto(idInstituto: number) {
		return this.http.get(`${environment.API_URI}/profesores/listProfesoresByInstituto/${idInstituto}`);
	}
}
