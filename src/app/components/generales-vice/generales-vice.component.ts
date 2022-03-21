import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

declare var $:any;

@Component({
  selector: 'app-generales-vice',
  templateUrl: './generales-vice.component.html',
  styleUrls: ['./generales-vice.component.css']
})
export class GeneralesViceComponent implements OnInit {
    idProfesor : number = 0; /* any para cuando no sabemos el tipo de dato */
    profesor: Profesor;
  
    constructor(private route: ActivatedRoute, private router: Router, private profesorService: ProfesorService) {
        this.profesor = new Profesor();
    }
    
    ngOnInit(): void {
        this.route.paramMap.subscribe(params =>{
            //obtenemos el idProfesor del URL
            this.idProfesor = Number(params.get('idProfesor'));
            //Obtenemos los datos del profesor para listar
            this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) =>{
                console.log(resProfesor)
                this.profesor=resProfesor;
                localStorage.setItem('nivel', resProfesor.nivel);
            },
            err => console.error(err)
            );
        })
    }

}
