import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
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
    profesoresApa: any;
    carreras: any;
    carrerasProfesor: any;
    numCarrerasByInstituto: any;
    articulito: Articulo;
    carreraActual: any;
    profesores: any[] = []
    profesor: Profesor;
    profesorActual: any;
    tipoProfesorActual: any;
    tipoProfesores: any;
    idProfesor: number;
    indexa: any[] = ["Si","No"]
    estado: any[] = ["Publicado","Pendiente"];
    tipoNI: any[] = ["Nacional","Internacional"];
    location: any;

    constructor(private articuloService: ArticuloService,private profesorService: ProfesorService, private carrerasService: CarrerasService, private tipoProfesorService: TipoProfesorService, private institutoService : InstitutoService, private cambioInfoService: CambioInfoService) {
        this.articulito = new Articulo();
        this.profesor = new Profesor();
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
    }

    ngOnInit(): void {
        this.location = location.href;
        console.log(this.location);
        $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton({
                direction: "left",
                hoverEnabled: false
            });
            $('select').formSelect();
            $('.datepicker').datepicker({
                format:"yyyy-mm-dd",
                autoClose:true,
            });
        });

        // //Vamos a arreglar el apa de los profesores
        // this.profesorService.listProfesores().subscribe((resProfesoresTodos:any) => {
        //     this.profesoresApa = resProfesoresTodos;
        //     for (let index = 0; index < this.profesoresApa.length; index++) {
        //         const element = this.profesoresApa[index];
        //         element.nombreApa = element.apellidoP + ", ";
        //         if(element.nombresP.indexOf(" ") != -1){
        //             element.nombreApa += element.nombresP.charAt(0) + "." + element.nombresP.charAt(element.nombresP.indexOf(" ")+1) + ".";
        //         }else{
        //             element.nombreApa += element.nombresP.charAt(0) + ".";
        //         }
        //         //Mandamos a guardar en la base de datos
        //         this.profesorService.modificarProfesor(element.idProfesor,element).subscribe((resProfesores: any) => {
        //         },err => console.error(err));
        //     }
            
        // })
        
        this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) =>{
            this.profesorActual = resProfesor;
        },err => console.error(err));

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

    enviarMensajeArticulo(): void {
        this.cambioInfoService.enviar();
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
        this.articulito.editores = this.profesorActual.nombresP + " " + this.profesorActual.apellidoP + " " + this.profesorActual.apellidoM;
        //Obtenemos la fecha de Jquery
        this.articulito.fechaEdicion = $('#fecha').val();
        //Obtenemos el año de la fecha
        this.articulito.anyo = this.articulito.fechaEdicion.substring(0,4);
        console.log(this.articulito);
        this.articuloService.crearArticulo(this.idProfesor,this.articulito).subscribe((resArticulo: any) =>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha dado de alta correctamente el articulo'
            });
            this.enviarMensajeArticulo();
        }, err => console.error(err));
        //Redirecciona a articulos despues de agregar el articulo
        if(this.location == "http://localhost:4200/home/articulosVice/"+this.idProfesor){
            document.location.reload();
        }
    }

    altaProfesor(): void {
        this.profesor.idInstituto = this.institutoActual;
        this.profesor.idCarrera = this.carreraActual;
        this.profesorService.guardarProfesor(this.profesor).subscribe(res => {
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha dado de alta correctamente al profesor'
            })
        },err => console.error(err) );
    }

}
