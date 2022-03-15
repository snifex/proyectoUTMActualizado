import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { ArticuloService } from 'src/app/services/articulo.service';
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
    constructor(private articuloService: ArticuloService) {
        this.articulito = new Articulo();
    }

    ngOnInit(): void {
        $(document).ready(function(){
            $('.fixed-action-btn').floatingActionButton({
                direction: "left",
                hoverEnabled: false
            });
            
        });

        /*this.articuloService.listarInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            
            this.articuloService.listarCarrerasPorInstituto(this.institutoActual).subscribe((resCarreras: any) => {
                console.log(resCarreras);
                this.numCarrerasByInstituto = resCarreras.length;
                this.carreras = resCarreras;

                this.profesorService.listProfesoresByInstituto(institutoActual).subscribe((resProfesores: any) =>{
                    console.log(" resProfesores: " + resProfesores);
                    this.profesores = resProfesores;

                }, err => console.error(err));
            }, err => console.error(err));
            
          }, err => console.error(err));
        });*/
        //Hacer institutosServices para los servicios de los institutosS
    }

    cambioInstituto(op: any): void {
        console.log("Entro", op);
        this.institutoActual = op.value;
        /*
        this.articuloService.listarCarrerasPorInstituto(this.institutoActual).subscribe((resCarreras: any) => {
          console.log(resCarreras);
          this.numCarrerasByInstituto = resCarreras.length;
          this.carreras = resCarreras;
        }, err => console.error(err));
        */
    }

    agregarArticulo(): void {
        console.log("agregar articulo");
        $('#agregarArticulo').modal();
        $('#agregarArticulo').modal("open");
    }

}
