import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	idProfesor: number = 0;
	nivelProfesor: number = 0;
	constructor(private router: Router) { }

	ngOnInit(): void {
		this.idProfesor=Number(localStorage.getItem('idProfesor'));
		this.nivelProfesor = Number(localStorage.getItem('nivel'));
		console.log("nivel ",this.nivelProfesor)
		console.log(this.idProfesor);
		$(document).ready(function () {
			$('.sidenav').sidenav();
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});
	}
	logout(){
		console.log('logout');
		localStorage.removeItem('token');
		localStorage.removeItem('correo');
		localStorage.removeItem('idProfesor');
		localStorage.removeItem('nivel')
		this.router.navigateByUrl('/');

	}
	
	agregarProfesor(): void {
        $('#agregarProfesor').modal();
        $('#agregarProfesor').modal("open");
    }

	agregarArticulo(): void {
        $('#agregarArticulo').modal();
        $('#agregarArticulo').modal("open");
    }
	datosGenerales():void{
		this.router.navigateByUrl('/home/generales-vice/'+ this.idProfesor);
	}

	redirArticulos(): void {
		this.router.navigateByUrl('/home/articulosVice/'+ this.idProfesor);
	}
}
