import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarrerasService } from 'src/app/services/carreras.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipoprofesor.service';
import Swal from 'sweetalert2';


declare var $:any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    tipoCLR: any[] = ["Revista", "Libro", "Congreso", "Cap. Libro", "Libro"];
    institutos: any;
    institutoActual: any;
    carreras: any;
    carrerasProfesor: any;
    numCarrerasByInstituto: any;
    articulito: Articulo;
    carreraActual: any;
    profesores: any[] = []
    profesor: Profesor;
    tipoProfesorActual: any;
    tipoProfesores: any;
    idProfesor: number;
    indexa: any[] = ["Si","No"]
    estado: any[] = ["Publicado","Pendiente"];
    tipoNI: any[] = ["Nacional","Internacional"];

    constructor(private articuloService: ArticuloService,private profesorService: ProfesorService, private carrerasService: CarrerasService, private tipoProfesorService: TipoProfesorService, private institutoService : InstitutoService) {
        this.articulito = new Articulo();
        this.profesor = new Profesor();
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
    }

    ngOnInit(): void {
        $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton({
                direction: "left",
                hoverEnabled: false
            });
            $('select').formSelect();
            $('.datepicker').datepicker({
                format:"yyyy-mm-dd",
                autoClose:true
            });
        });

        this.tipoProfesorService.listarTipoProfesor().subscribe((resTipoProfesores: any) =>{
            this.tipoProfesores = resTipoProfesores;
        },err => console.error(err));

        this.carrerasService.listCarreras().subscribe((resCarreras: any) =>{
            console.log(resCarreras);
            this.carreras = resCarreras;
            this.carrerasProfesor = resCarreras;
        })
        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
			console.log(resInstitutos);
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
				console.log(resCarreras);
				this.carreraActual = resCarreras[0].idCarrera;
				this.numCarrerasByInstituto = resCarreras.length;
				this.carreras = resCarreras;
				this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
					console.log(resProfesores);
					this.profesores = resProfesores;
				},
					err => console.error(err)
				);
			},
				err => console.error(err)
			);
		},
			err => console.error(err)
		);
    }

    cambioInstituto(op: any) {
		console.log('Entro ', op.value)
		this.institutoActual = op.value;
		this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
			console.log(resCarreras);
			this.numCarrerasByInstituto = resCarreras.length;
			if (this.numCarrerasByInstituto == 0)
				this.carreraActual = 0
			else {
				this.carreraActual = resCarreras[0].idCarrera;
				this.carreras = resCarreras;
				let dato = {
					'value': this.carreraActual
				}
				this.cambioCarrera(dato);
			}

		},err => console.error(err));
	}
    cambioCarrera(op:any): void {
        this.carreraActual = op.value;
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) =>{
            this.profesores = resProfesores;
        },err => console.error(err));
    }

    agregarArticulo(): void {
        console.log("agregar articulo");
        $('#agregarArticulo').modal();
        $('#agregarArticulo').modal("open");
    }
    
    agregarProfesor(): void {
        console.log("agregar profesor");
        $('#agregarProfesor').modal();
        $('#agregarProfesor').modal("open");
    }

    darAltaArticulo():void{
        //dar de alta el articulo
    }

    altaProfesor(): void {
        this.profesor.idInstituto = this.institutoActual;
        this.profesor.idCarrera = this.carreraActual;
        this.profesorService.guardarProfesor(this.profesor).subscribe(res => {
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha dado de alta correctamente'
            })
        },err => console.error(err) );
    }

}
