import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { AypService } from 'src/app/services/ayp.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { CarrerasService } from 'src/app/services/carreras.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $:any;
@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {
	articulos: any = [];
	autores:any =[];
	ini:any;
	fin:any;
	profesores: any;
	profesorActual: any;
	idProfesor: number= 0;
	institutoActual: any
	numCarrerasByInstituto: any;
	institutos: any;
	carreraActual: any;
	carreras: any;
	institutoActualProfesores:any
	pages: number = 1;

	constructor(private articuloService: ArticuloService, private profesorService:ProfesorService, private cambioInfoService: CambioInfoService, private carrerasService: CarrerasService, private institutoService: InstitutoService, private aypService: AypService) { 
		//Ponemos a escuchar el cambio
		this.cambioInfoService.currentMsg$.subscribe((msg) =>{
			console.log("msg",msg);
		});
	}

	ngOnInit(): void {
		$(document).ready(function(){
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});

			$('.collapsible').collapsible();
		});

		//Prueba
		


		this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
			console.log(resInstitutos);
			this.institutos = resInstitutos;
			resInstitutos.forEach((element: any) => {
				this.aypService.listByInstitutoOfFirstAutor(element.idInstituto).subscribe((resArticulosSR: any) =>{
					this.articulos.push(resArticulosSR);
				},err => console.error(err))
			});
			console.log(this.articulos)
			console.log(this.autores)

			// this.institutoActual = this.institutos[1].idInstituto;
			// //Inicializamos los profesores
			// this.articuloService.listByInstituto(this.institutoActual).subscribe((resArticulos: any) =>{
			// 	this.articulos = resArticulos;
			// 	this.autores = resArticulos.profesores;
			// })
			
			// this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
			// 	console.log(resCarreras);
			// 	this.carreraActual = resCarreras[0].idCarrera;
			// 	this.numCarrerasByInstituto = resCarreras.length;
			// 	this.carreras = resCarreras;
			// 	this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
			// 		console.log(resProfesores);
			// 		this.profesores = resProfesores;
			// 	},
			// 		err => console.error(err)
			// 	);
			// },
			// 	err => console.error(err)
			// );
		},
			err => console.error(err)
		);

		
		
	}
	CambioFechaIni(){
		console.log("Probando cambio ini")
		this.ini=$('#fechaIni').val();
		console.log(this.ini)
		this.articuloService.listByPeriodo(this.ini,this.fin).subscribe((resArticulos: any) => 
		{
			console.log("Saliendo a servicio");
			
			this.articulos = resArticulos;
			this.articulos.forEach((element:any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => 
				{
					this.autores.push(resAutores);
				},
				err => console.error(err));
			});
			
		},
			err => console.error(err)
			
		);
	}
	CambioFechaFin(){
		console.log("Probando cambio fin")
		this.fin=$('#fechaFin').val();
		console.log(this.fin)
		this.articuloService.listByPeriodo(this.ini,this.fin).subscribe((resArticulos: any) => 
		{
			console.log("Saliendo a servicio");
			
			this.articulos = resArticulos;
			this.articulos.forEach((element:any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => 
				{
					this.autores.push(resAutores);
				},
				err => console.error(err));
			});
			
		},
			err => console.error(err)
			
		);
	}

	cambioInstitutoProfesores(op: any){
		this.institutoActualProfesores = op.value;
		console.log(this.institutoActualProfesores);
		//Inicializamos los profesores
		this.articuloService.listByInstituto(this.institutoActual).subscribe((resArticulos: any) =>{
			this.articulos = resArticulos;
		})

	}

	modificarProfesor(index: any): void {
		$('#modificarProfesor').modal({dismissible: false});
		$('#modificarProfesor').modal("open")
		console.log(this.profesores[index])
		this.profesorActual = this.profesores[index];
	}

	cambioInstituto(op: any) {
        this.institutoActual = op.value;
        this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
            console.log(resCarreras);
            this.numCarrerasByInstituto = resCarreras.length;
            if (this.numCarrerasByInstituto == 0) {
                this.carreraActual = 0
            } else {
                this.carreraActual = resCarreras[0].idCarrera;
                this.carreras = resCarreras;
            }
            let dato = {
                'value': this.carreraActual
            }
            this.cambioCarrera(dato);
			this.cambioInstitutoProfesores(this.institutoActual);
        }, err => console.error(err));
    }

	cambioCarrera(op:any): void {
        this.carreraActual = op.value;
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) =>{
            this.profesores = resProfesores;
        },err => console.error(err));
    }

}
