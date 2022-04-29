import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { ArticuloService } from 'src/app/services/articulo.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';


declare var $: any;

@Component({
  selector: 'app-articulos-imprimir',
  templateUrl: './articulos-imprimir.component.html',
  styleUrls: ['./articulos-imprimir.component.css']
})
export class ArticulosImprimirComponent implements OnInit {

    articulos: any = [];
	autores: any = [];
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
	arregloCanvas: boolean[] = [];
	institutoActual: any;
	institutos: any;
	public style: object = {};

    constructor(private articuloService: ArticuloService, private profesorService: ProfesorService, private institutoService: InstitutoService) { 
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.numeroHojas = Array.from(Array(this.contadorHojas).keys());
	
    }

    ngOnInit(): void {
        //Inicializamos los institutos 
		this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
			this.institutos = resInstitutos;
			this.institutoActual = resInstitutos[1].idInstituto;
			this.profesorService.listProfesoresByInstituto(this.institutoActual).subscribe((resProfesores: any) => {
				this.profesores = resProfesores;
				this.profesorActual = resProfesores[1].idProfesor;
		
			},err => console.error(err));
		
		}, err => console.error(err));
		
	
		this.articuloService.listByProfesor(this.idProfesor).subscribe((resArticulos: any) => {
			this.articulos = resArticulos;
            console.log(this.articulos)
			this.articulosFinal.push(resArticulos);
			//Inicializamos los arreglos de boolean con el tamaño total de resArticulos
			for (let index = 0; index < resArticulos.length; index++) {
				this.arregloNumeros[index] = false;
				this.arregloCanvas[index] = false
			}
			console.log(this.articulos)
			this.articulos.forEach((element: any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => {
					this.autores.push(resAutores);
				}, err => console.error(err));
			})
		}, err => console.error(err));
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
		console.log(this.articulosFinal)
		//Desde el contador hacemos un array para que pueda iterar en el HTML
		this.numeroHojas = Array.from(Array(this.contadorHojas).keys());
  	}
	
	agregarCanvas(check:any, checkboxCanvas:any, index:any) {
		/*Verificamos si se marca o se desmarca para despues checar en nuestro if */
    	checkboxCanvas.checked = check.currentTarget.checked; 
		if(checkboxCanvas.checked){
			//Si esta seleccionado en el arreglo de booleans marcaremos que esta seleccionado
			this.arregloCanvas[index] = true;
		}else{
			this.arregloCanvas[index] = false;
		}
	}

	onResizeEnd(event: ResizeEvent): void {
		this.style = {
		  position: 'fixed',
		  left: `${event.rectangle.left}px`,
		  top: `${event.rectangle.top}px`,
		  width: `${event.rectangle.width}px`,
		  height: `${event.rectangle.height}px`,
		};
	}

	validate(event: ResizeEvent): boolean {
		const MIN_DIMENSIONS_PX: number = 50;
		if (
		  event.rectangle.width &&
		  event.rectangle.height &&
		  (event.rectangle.width < MIN_DIMENSIONS_PX ||
			event.rectangle.height < MIN_DIMENSIONS_PX)
		) {
		  return false;
		}
		return true;
	}

	cambioInstituto(op: any) {
		this.institutoActual = op.value;
	}
}
