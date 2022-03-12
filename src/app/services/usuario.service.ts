import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) { }
	existe(correo: string, password: any) {
		console.log("Entrando a servicio existe", correo, password);
		return this.http.post(`${environment.API_URI}/profesores/existe/${correo}`, password);
	}
}