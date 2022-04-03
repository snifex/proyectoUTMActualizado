import { Component, OnInit } from '@angular/core';
import { Instituto } from 'src/app/models/instituto.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
    selector: 'app-institutos-vice',
    templateUrl: './institutos-vice.component.html',
    styleUrls: ['./institutos-vice.component.css']
})
export class InstitutosViceComponent implements OnInit {
    institutos: any;
    institutoEliminar: any;
    institutoModificar: Instituto;
    carreraActual: any;
    institutoActual: any;
    profesoresListar: any;
    numCarrerasByInstituto: any;
    carreras: any;
    profesores: any;

    constructor(private institutoService: InstitutoService, private carrerasService: CarrerasService, private profesorService: ProfesorService) { 
        this.institutoModificar = new Instituto();
    }

    ngOnInit(): void {
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


    //Instituto metodos
    eliminarInstituto(index:any):void{
        this.institutoEliminar = this.institutos[index];
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¿Estas seguro de eliminar este instituto?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3741',
            confirmButtonText: 'Eliminar'
        }).then((respuesta) =>{
            if(respuesta.isConfirmed){
                this.institutoService.eliminarInstituto(this.institutoEliminar.idInstituto).subscribe((resElimina : any) =>{
                    Swal.fire('Instituto eliminado','','error')
                },err => console.error(err)) 
                
                //Listamos a los institutos para que nos salgan con los cambios hechos
                this.cambioProfesores(this.carreraActual);
            }
        })
    }

    cambioProfesores(carrera:Number): void {
        if(carrera != 0){
            this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) =>{
                this.profesoresListar = resProfesores;
            },err => console.error(err));
        }else{
            this.profesorService.listProfesoresByInstituto(this.institutoActual).subscribe((resProfesores: any) =>{
                this.profesoresListar = resProfesores;
            },err => console.error(err));
        }
    }

    modificarInstitutoModal(index:any):void{
        $('#modificarInstitutoModal').modal();
        $('#modificarInstitutoModal').modal("open");
        this.institutoActual = this.institutos[index];
        this.institutoModificar = this.institutoActual;
        console.log(this.institutoActual)
    }

    altaModificarInstituto(): void {
        console.log(this.institutoModificar);
        this.institutoService.modificarInstituto(this.institutoModificar,this.institutoActual.idInstituto).subscribe((resInstitutoModificar:any) =>{
            console.log(resInstitutoModificar);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se han hecho los cambios correctamente'    
            })
            .then(respuesta =>{
                //Volvemos a obtener los profesores para que los muestre modificados
                if(respuesta.isConfirmed){
                    let dato = {
                        'value': this.institutoActual
                    }
                    this.cambioInstituto(dato);
                }
            })

        },err => console.error(err));
        $('#modificarInstitutoModal').modal("close");
    }

    cambioInstituto(op: any) {
		this.institutoActual = op.value;
		this.carrerasService.listCarrerasByInstituto(this.institutoActual.idInstituto).subscribe((resCarreras: any) => {
			console.log(resCarreras);
			this.numCarrerasByInstituto = resCarreras.length;
			if (this.numCarrerasByInstituto == 0){
				this.carreraActual = 0
			} else {
				this.carreraActual = resCarreras[0].idCarrera;
				this.carreras = resCarreras;
			}
            let dato = {
                'value': this.carreraActual
            }
            this.cambioCarrera(dato);
		},err => console.error(err));
	}

    cambioCarrera(op:any): void {
        this.carreraActual = op.value;
        this.cambioProfesores(this.carreraActual);
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) =>{
            this.profesores = resProfesores;
        },err => console.error(err));
    }
}
