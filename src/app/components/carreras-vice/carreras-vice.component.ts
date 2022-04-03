import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';

declare var $:any;


@Component({
    selector: 'app-carreras-vice',
    templateUrl: './carreras-vice.component.html',
    styleUrls: ['./carreras-vice.component.css']
})
export class CarrerasViceComponent implements OnInit {
    institutoActual: any;
    numCarrerasByInstituto: any;
    carreraActual: any;
    carreras: any[]= [];
    profesores: any[] = []
    profesoresListar: any;
    institutos: any;
    carreraEliminar: any;
    carreraModificar: Carrera;

    constructor(private carrerasService: CarrerasService, private institutoService: InstitutoService, private profesorService: ProfesorService) {
        this.carreraModificar = new Carrera();
    }

    ngOnInit(): void {
        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            this.institutos = resInstitutos;

        },err => console.error(err));
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
        }, err => console.error(err));
    }

    cambioCarrera(op:any): void {
        this.carreraActual = op.value;
        this.cambioProfesores(this.carreraActual);
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) =>{
            this.profesores = resProfesores;
        },err => console.error(err));
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

    eliminarCarrera(index:any): void {
        this.carreraEliminar = this.carreras[index];
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¿Estas seguro de eliminar esta Carrera?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3741',
            confirmButtonText: 'Eliminar'
        }).then((respuesta) =>{
            if(respuesta.isConfirmed){
                this.carrerasService.eliminarCarrera(this.carreraEliminar.idCarrera).subscribe((resElimina : any) =>{
                    Swal.fire('Carrera eliminado','','error');
                },err => console.error(err))
                
                //Listamos a los institutos para que nos salgan con los cambios hechos
                this.cambioCarrera(this.carreraActual);
            }
        })
    }

    modificarCarreraModal(index:any):void{
        $('#modificarCarreraModal').modal();
        $('#modificarCarreraModal').modal("open");
        this.carreraActual = this.carreras[index];
        this.carreraModificar = this.carreraActual;
    }

    altaModificarCarrera():void{
        this.carreraModificar.idInstituto = this.institutoActual;
        this.carrerasService.modificarCarrera(this.carreraActual.idCarrera,this.carreraModificar).subscribe((resCarreraModificar: any) =>{
            console.log(resCarreraModificar);
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
                    this.cambioCarrera(dato);
                }
            })
        },err => console.error(err))
        $('#modificarCarreraModal').modal("close");
    }
}
