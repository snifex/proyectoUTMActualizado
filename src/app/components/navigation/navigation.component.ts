import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	idProfesor: number = 0;
	nivelProfesor: number = 0;
	file: any;
	uploadEvent: any;
	arrayBuffer: any;
	exceljsondata: any;
	constructor(private router: Router) { }

	ngOnInit(): void {
		this.idProfesor=Number(localStorage.getItem('idProfesor'));
		this.nivelProfesor = Number(localStorage.getItem('nivel'));
		console.log(this.nivelProfesor);
		console.log("nivel ",this.nivelProfesor)
		console.log(this.idProfesor);
		$(document).ready(function () {
			$('.sidenav').sidenav();
			$(".dropdown-trigger").dropdown({ coverTrigger: false, constrainWidth:false });
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

	/* MODALES*/
	
	agregarProfesor(): void {
        $('#agregarProfesor').modal();
        $('#agregarProfesor').modal("open");
    }

	agregarCarrera(): void {
        $('#agregarCarrera').modal();
        $('#agregarCarrera').modal("open");
    }

	agregarInstituto(): void {
		$('#agregarInstituto').modal();
		$('#agregarInstituto').modal("open");
	}

	migrarProfesor(): void {
		$('#migrarProfesor').modal();
		$('#migrarProfesor').modal("open");
	}

	cargarExcel(event: any): void {
		if (event.target.files.length > 0) {
			this.file = event.target.files[0];
			this.uploadEvent = event;
		}
		this.file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsArrayBuffer(this.file);
		fileReader.onload = (e) => {
			this.arrayBuffer = fileReader.result;
			var data = new Uint8Array(this.arrayBuffer);
			var arr = new Array();
			for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, { type: "binary" });
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			this.exceljsondata = XLSX.utils.sheet_to_json(worksheet, { raw: true })
		}
	}
	
	migrarProfesorDB(): void {
		this.exceljsondata.map((profesor: any) => {
			console.log(profesor);
			// this.profesorService.guardarProfesor(profesor).subscribe((resProfesor) =>{},err =>{console.log(err);})
			})
		$('#migrarProfesor').modal({ dismissible: false });
		$('#migrarProfesor').modal('close');
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Profesores Migrados',
			confirmButtonAriaLabel: 'Thumbs up, great!'
		})
	}

	listarProfesores(): void {
		this.router.navigateByUrl('/home/profesores-vice/'+ this.idProfesor);          
    }

    listarCarreras(): void {
		this.router.navigateByUrl('/home/carreras-vice/'+ this.idProfesor);       
    }

    listarInstitutos(): void {
        this.router.navigateByUrl('/home/institutos-vice/'+ this.idProfesor);       
    }

    listarArticulos(): void { 
		this.router.navigateByUrl('/home/articulosVice/'+ this.idProfesor);
    }

	datosGenerales():void{
		this.router.navigateByUrl('/home/generales-vice/'+ this.idProfesor);
	}

	redirArticulos(): void {
		this.router.navigateByUrl('/home/articulos/'+ this.idProfesor);
	}

	redirArticulosImprimir(): void {
		this.router.navigateByUrl('/home/articulos-imprimir/' + this.idProfesor);
	}
}
