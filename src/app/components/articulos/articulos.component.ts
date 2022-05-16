import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
	articulosFinal: any[] = [];
	numeroHojas: any;
	contadorHojas: number = 1;
	contador: number = 0;

	constructor(private articuloService: ArticuloService, private profesorService: ProfesorService, private cambioInfoService: CambioInfoService, private imagenesService: ImagenesService, private translate : TranslateService) {
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
		this.numeroHojas = Array.from(Array(this.contadorHojas).keys());
		console.log(this.numeroHojas);
	}

	ngOnInit(): void {

		//Inicializamos los profesores
		this.profesorService.listProfesores().subscribe((resProfesores: any) => {
			this.profesores = resProfesores;
		}, err => console.error(err))


		this.articuloService.listByProfesor(this.idProfesor).subscribe((resArticulos: any) => {
			let resultado: boolean[] = [];
			this.articulos = resArticulos;
			this.articulosFinal.push(resArticulos);
			//Creamos un arreglo donde nos ayudar a saber si se modifico en el menu y cortar
			for (let index = 0; index < resArticulos.length; index++) {
				resultado[index] = false;
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
		var extension : String;
		for (let index = 0; index < archivo.length; index++) {
			console.log(archivo.item(index));
			//Mandamos los archivos 1 x 1 de los n archivos
			this.fileToUpload = archivo.item(index);
			//Si se necesita mas de un archivo con un For se recorreria el fileToUpload
			let imgPromise = this.getFileBlob(this.fileToUpload);
			imgPromise.then(blob => {
				this.imagenesService.guardarArchivo(blob, idArticulo, index, this.fileToUpload.type).subscribe((resSubir: any) => {
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
			//Aumentamos el contador de hojas que es el que lleva el control de los div
			this.contadorHojas++;
			this.contador++;
			if(this.contador == 1){
				//Popeamos lo que teniamos en articulosFinal y dividimos para poder imprimir en 2 hojas
				this.articulosFinal.pop();
				
				//Ahora partimos el arreglo (1era parte desde el inicio hasta el index)
				this.articulosFinal.push(this.articulos.slice(0,index+1));

				//Segunda parte desde el index hasta el final
				this.articulosFinal.push(this.articulos.slice(index+1,this.articulos.length));
			}else{
				//Si el contador es mayor entonces partimos desde el index hasta el final 
				this.articulosFinal.push(this.articulos.slice(index+1,this.articulos.length))

			}
		}else{
			this.arregloNumeros[index] = false;
			this.contadorHojas--;
			this.contador--;
			if(this.contador == 0){
				//Popeamos dos veces ya que como es la primera partición se encuentran 2 
				this.articulosFinal.pop()
				this.articulosFinal.pop()
				
				//rellenamos articulos final con los articulos totales
				this.articulosFinal.push(this.articulos)
			}else{
				//Si no solo popeamos el ultimo que tenia
				this.articulosFinal.pop()
			}
		}
		//Desde el contador hacemos un array para que pueda iterar en el HTML
		this.numeroHojas = Array.from(Array(this.contadorHojas).keys());
  	}

}
