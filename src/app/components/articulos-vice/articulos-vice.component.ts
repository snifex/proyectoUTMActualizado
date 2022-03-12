import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
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
	constructor(private articuloService: ArticuloService, private profesorService:ProfesorService) { 
		let hoy=new Date();
		console.log(hoy);
		this.ini=(hoy.getFullYear()-3)+'-01-01';
		this.fin=hoy.getFullYear()+'-'+(((hoy.getMonth()+1)<10)?'0'+(hoy.getMonth()+1):(hoy.getMonth()+1))+'-'+(((hoy.getDate())<10)?'0'+(hoy.getDate()):(hoy.getDate()));
		console.log(this.ini);
	}

	ngOnInit(): void {
		$(document).ready(function(){
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
		  });
		console.log("Iniciado componente")
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
			
		);console.log("Probando tiempo")
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

}
