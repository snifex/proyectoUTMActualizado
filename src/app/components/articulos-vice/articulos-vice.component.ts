import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $:any;
@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {
	articulos: any;
	autores:any =[];
	ini:any;
	fin:any;
	profesores: any;
	profesorActual: any;
	idProfesor: number= 0;
	
	constructor(private articuloService: ArticuloService, private profesorService:ProfesorService, private cambioInfoService: CambioInfoService) { 
		let hoy=new Date();
		console.log(hoy);
		this.ini=(hoy.getFullYear()-3)+'-01-01';
		this.fin=hoy.getFullYear()+'-'+(((hoy.getMonth()+1)<10)?'0'+(hoy.getMonth()+1):(hoy.getMonth()+1))+'-'+(((hoy.getDate())<10)?'0'+(hoy.getDate()):(hoy.getDate()));
		console.log(this.ini);
		this.idProfesor = Number(localStorage.getItem('idProfesor'));
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
		  });

		//Inicializamos los profesores
		this.profesorService.listProfesores().subscribe((resProfesores:any) => {
			this.profesores = resProfesores;
		},err => console.error(err))
		
		
		this.articuloService.listByProfesor(this.idProfesor).subscribe((resArticulos: any) =>{
			this.articulos = resArticulos;
			this.articulos.forEach((element:any)=>{
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) =>{
					this.autores.push(resAutores);
				},err => console.error(err));
			})
		},err => console.error(err));
		
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

	modificarProfesor(index: any): void {
		$('#modificarProfesor').modal({dismissible: false});
		$('#modificarProfesor').modal("open")
		console.log(this.profesores[index])
		this.profesorActual = this.profesores[index];
	}

}
