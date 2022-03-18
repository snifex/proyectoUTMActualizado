import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CarrerasService } from 'src/app/services/carreras.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipoprofesor.service';

declare var $:any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    tipoCLR: any[] = ["revista", "libro", "congreso"];
    institutos: any;
    institutoActual: any;
    carreras: any;
    numCarrerasByInstituto: any;
    articulito: Articulo;
    carreraActual: any;
    profesores: any[] = []
    profesor: Profesor;
    tipoProfesorActual: any;
    tipoProfesores: any;

    constructor(private articuloService: ArticuloService,private profesorService: ProfesorService, private carrerasService: CarrerasService, private tipoProfesorService: TipoProfesorService) {
        this.articulito = new Articulo();
        this.profesor = new Profesor();
    }

    ngOnInit(): void {
        $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton({
                direction: "left",
                hoverEnabled: false
            });
        });

        this.carrerasService.listCarreras().subscribe((resCarreras: any) =>{
            console.log(resCarreras);
            this.carreras = resCarreras;
        })
        /*
        this.articuloService.listarInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            
            this.articuloService.listarCarrerasPorInstituto(this.institutoActual).subscribe((resCarreras: any) => {
                console.log(resCarreras);
                this.numCarrerasByInstituto = resCarreras.length;
                if(numCarrerasByInstituto == 0) {
                    this.carreraActual = 0
                }else{
                    this.carreraActual = resCarreras[0].idCarrera
                    this.carreras = resCarreras;
                    let datoCarreraActual = {
                        "value":this.carreraActual
                    }
                    this.cambioCarrera(datoCarreraActual)
                }
                
            }, err => console.error(err));
            
          }, err => console.error(err));
        });
        */
        //Hacer institutosServices para los servicios de los institutosS
    }

    cambioInstituto(op: any): void {
        console.log("Entro", op);
        this.institutoActual = op;
        /*
        this.articuloService.listarCarrerasPorInstituto(this.institutoActual).subscribe((resCarreras: any) => {
            console.log(resCarreras);
            this.carreraActual = resCarreras[0].idCarrera
            this.numCarrerasByInstituto = resCarreras.length;
            this.carreras = resCarreras;
            this.cambioCarrera()
            
            }, err => console.error(err));
        */
    }

    cambioCarrera(op:any): void {
        this.carreraActual = op.value;
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resCarrera: any) =>{
            this.carreras = resCarrera;
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

    altaProfesor(): void {
        this.profesor.idInstituto = this.institutoActual;
        this.profesor.idCarrera = this.carreraActual;
    }

    cambioTipoProfesor(op: any): void {
        this.tipoProfesorActual = op.value;
        this.tipoProfesorService.listarTipoProfesor().subscribe((resTipoProfesores: any) =>{
            this.tipoProfesores = resTipoProfesores;
        },err => console.error(err));
        
    }

}
