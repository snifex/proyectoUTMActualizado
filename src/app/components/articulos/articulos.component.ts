import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ProfesorService } from 'src/app/services/profesor.service';
declare var $: any;
@Component({
	selector: 'app-articulos',
	templateUrl: './articulos.component.html',
	styleUrls: ['./articulos.component.css', '../../../styles.css']
})
export class ArticulosComponent implements OnInit {

	articulos: any = [];
	autores: any = [];
	ini: any;
	fin: any;
	profesores: any;
	profesorActual: any;
	idProfesor: number = 0;
	fileToUpload: any;
	arregloNumeros: boolean[] = [];
	comprobado: any = true;
	numeroDiv: any = [];

	constructor(private articuloService: ArticuloService, private profesorService: ProfesorService, private cambioInfoService: CambioInfoService, private imagenesService: ImagenesService) {
		let hoy = new Date();
		console.log(hoy);
		this.ini = (hoy.getFullYear() - 3) + '-01-01';
		this.fin = hoy.getFullYear() + '-' + (((hoy.getMonth() + 1) < 10) ? '0' + (hoy.getMonth() + 1) : (hoy.getMonth() + 1)) + '-' + (((hoy.getDate()) < 10) ? '0' + (hoy.getDate()) : (hoy.getDate()));
		console.log(this.ini);
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
		//Ponemos a escuchar el cambio
		this.cambioInfoService.currentMsg$.subscribe((msg) => {
			console.log("msg", msg);
		});
		this.fileToUpload = null;
	}

	ngOnInit(): void {
		$(document).ready(function () {
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
		});

		//Inicializamos los profesores
		this.profesorService.listProfesores().subscribe((resProfesores: any) => {
			this.profesores = resProfesores;
		}, err => console.error(err))


		this.articuloService.listByProfesor(this.idProfesor).subscribe((resArticulos: any) => {
			let resultado: boolean[] = [];
			this.articulos = resArticulos;
			console.log(this.articulos);
			//Creamos un arreglo donde nos ayudar a saber si se modifico en el menu y cortar
			for (let index = 0; index < resArticulos.length; index++) {
				resultado[index] = false;
			}
			//Obtenemos el numero de seccion a imprimir en el div
			var numDiv = Math.floor(resArticulos.length / 4);
			for(var i = 0; i < numDiv; i++) {
				this.numeroDiv.push(i);
			}

			
			
			console.log(this.articulos)
			this.arregloNumeros = resultado;
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				}, err => console.error(err));
			})
		}, err => console.error(err));

		

	}
	CambioFechaIni() {
		console.log("Probando cambio ini")
		this.ini = $('#fechaIni').val();
		console.log(this.ini)
		this.articuloService.listByPeriodo(this.ini, this.fin).subscribe((resArticulos: any) => {
			console.log("Saliendo a servicio");

			this.articulos = resArticulos;
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				},
					err => console.error(err));
			});

		},
			err => console.error(err)

		);
	}
	CambioFechaFin() {
		console.log("Probando cambio fin")
		this.fin = $('#fechaFin').val();
		console.log(this.fin)
		this.articuloService.listByPeriodo(this.ini, this.fin).subscribe((resArticulos: any) => {
			console.log("Saliendo a servicio");

			this.articulos = resArticulos;
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				},
					err => console.error(err));
			});

		},
			err => console.error(err)

		);
	}

	modificarProfesor(index: any): void {
		$('#modificarProfesor').modal({ dismissible: false });
		$('#modificarProfesor').modal("open")
		console.log(this.profesores[index])
		this.profesorActual = this.profesores[index];
	}

	cargarArticulo(file: any, idArticulo: any): void {
		console.log("Entra carga Archivo")
		let archivo = file.files;
		for (let index = 0; index < archivo.length; index++) {
			console.log(archivo.item(index));
			//Mandamos los archivos 1 x 1 de los n archivos
			this.fileToUpload = archivo.item(index);

			//Si se necesita mas de un archivo con un For se recorreria el fileToUpload
			let imgPromise = this.getFileBlob(this.fileToUpload);
			imgPromise.then(blob => {
				this.imagenesService.guardarArchivo(blob, idArticulo, index).subscribe((resSubir: any) => {
					console.log(resSubir);
				}, err => console.error(err));
			});
		}
		
	}

	getFileBlob(file: any) {
		var reader = new FileReader();
		return new Promise(function (resolve, reject) {
			reader.onload = (function (thefile) {
				return function (e: any) {
					resolve(e.target.result);
				};
			})(file);
			reader.readAsDataURL(file);
		});
	}

	seleccionarCheckbox(check:any, articulo:any, index:any) {
		/*Verificamos si se marca o se desmarca para despues checar en nuestro if */
    	articulo.checked = check.currentTarget.checked; 
		if(articulo.checked){
			this.arregloNumeros[index] = true;
		}else{
			this.arregloNumeros[index] = false;
		}
  	}

	comprobarImprimirArticulos(index: any){
		console.log("index = " + index + "Comprobado = " + this.comprobado);
		if(index === 0 || index % 4 ==0){
			this.comprobado = true;
		}
		this.comprobado = false;
		
	}
}
