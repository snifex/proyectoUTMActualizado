import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tipoCLR: any [] = ["revista","libro","congreso"];
  institutos: any;
  institutoActual: any;
  carreras:any;
  constructor(private articuloService: ArticuloService) { 

  }

  ngOnInit(): void {
    /*this.articuloService.listarInstitutos().subscribe((resInstitutos: any) => {
        console.log(resInstitutos);
        this.institutos = resInstitutos;
        this.institutoActual = this.institutos[1].idInstituto;
        
        this.articuloService.listarCarrerasPorInstituto(this.institutoActual).subscribe((resCarreras: any) => {
            console.log(resCarreras);
            this.carreras = resCarreras;
        }, err => console.error(err));
        
      }, err => console.error(err));
    });*/
    //Hacer institutosServices para los servicios de los institutosS
  }

  cambioInstituto(op:any): void{
      console.log("Entro",op);
  }

}
