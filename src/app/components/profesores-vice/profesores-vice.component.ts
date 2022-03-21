import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipoprofesor.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-profesores-vice',
  templateUrl: './profesores-vice.component.html',
  styleUrls: ['./profesores-vice.component.css'],
})
export class ProfesoresViceComponent implements OnInit {
    institutos:any;
    institutoActual:any;
    numCarrerasByInstituto: number;
    carreraActual: any;
    carreras : any;
    profesores : any;
    profesorActual: any
    profesor : Profesor;
    tipoProfesores: any;
    tipoProfesoresActual: any;

    //Variables modal
    institutoActualModal:any;
    carreraActualModal:any;
    carrerasModal:any;

    constructor(private institutoService: InstitutoService, private carrerasService: CarrerasService, private profesorService: ProfesorService, private tipoProfesorService:TipoProfesorService){
        this.numCarrerasByInstituto = 0;
        this.profesor = new Profesor();
    }
    
    ngOnInit(): void {
        //Obtenemos los institutos
        this.institutoService.listInstitutos().subscribe((resInstitutos:any) =>{
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
				this.carreras = resCarreras;
                this.carrerasModal = resCarreras
                this.carreraActualModal = resCarreras[0].idCarrera;
                this.carreraActual = resCarreras[0].idCarrera;
                this.numCarrerasByInstituto = resCarreras.length;
				this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
					this.profesores = resProfesores;
                    this.profesorActual = this.profesores[0].idProfesor;
				},
					err => console.error(err)
				);
			},
				err => console.error(err)
			);
        },err => console.error(err));

        //Obtenemos el tipoProfesor
        this.tipoProfesorService.listarTipoProfesor().subscribe((resTipoProfesores: any) =>{
            this.tipoProfesores = resTipoProfesores;
        },err => console.error(err));
    }

    cambioInstituto(op:any): void {
        this.institutoActual = op.value;
        this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) =>{
            this.numCarrerasByInstituto = resCarreras.length;
            if(this.numCarrerasByInstituto === 0){
                this.carreraActual = 0;
            }else{
                console.log(this.carreraActual)
                this.carreraActual = resCarreras[0].idCarrera;
                this.carreras = resCarreras
                let dato = {
                    'value' : this.carreraActual
                }
                this.cambioCarrera(dato);
            }
        }, err => console.error(err));
    }

    cambioInstitutoModal(op:any): void {
        this.institutoActualModal = op.value;
        this.carrerasService.listCarrerasByInstituto(this.institutoActualModal).subscribe((resCarreras: any) =>{
            this.numCarrerasByInstituto = resCarreras.length;
            if(this.numCarrerasByInstituto === 0){
                this.carreraActualModal = 0;
            }else{
                this.carreraActualModal = resCarreras[0].idCarrera;
                this.carrerasModal = resCarreras;
            }
        }, err => console.error(err));
    }

    cambioCarrera(op:any):void{
        this.carreraActual = op.value;
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) =>{
            this.profesores = resProfesores;
        },err => console.error(err))

    }

    modificarProfesorModal(index:any): void {
        $('#modificarProfesorModal').modal();
        $('#modificarProfesorModal').modal("open");
        this.profesorActual = this.profesores[index];
        this.profesor.nombresP = this.profesorActual.nombresP;
        this.profesor.apellidoP = this.profesorActual.apellidoP;
        this.profesor.apellidoM = this.profesorActual.apellidoM;
        this.profesor.grado = this.profesorActual.grado;
    }

    altaProfesor(): void {
        this.profesorActual.password = this.profesor.password;
        this.profesorActual.nombresP = this.profesor.nombresP;
        this.profesorActual.apellidoP = this.profesor.apellidoP;
        this.profesorActual.apellidoM = this.profesor.apellidoM;
        this.profesorActual.grado = this.profesor.grado;
        this.profesorActual.idInstituto = this.institutoActualModal;
        this.profesorActual.idCarrera = this.carreraActualModal;

        //mandamos a actualizar al server
        console.log("Profesor a enviar"+this.profesorActual);
        this.profesorService.modificarProfesor(this.profesorActual.idProfesor,this.profesorActual).subscribe((resProfesorModificar: any) =>{
            console.log(resProfesorModificar);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se han hecho los cambios correctamente'
            })
        },err => console.error(err));
    }
}
