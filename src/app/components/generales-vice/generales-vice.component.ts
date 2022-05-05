import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';
declare var $: any;

@Component({
    selector: 'app-generales-vice',
    templateUrl: './generales-vice.component.html',
    styleUrls: ['./generales-vice.component.css']
})
export class GeneralesViceComponent implements OnInit {
    idProfesor: number = 0; /* any para cuando no sabemos el tipo de dato */
    profesor: Profesor;
    canvas: any;
    ctx: any;
    mouse = { x: 0, y: 0, overPath: null };
    dTimer: ReturnType<typeof setTimeout> = setTimeout(()  =>{},1000);

    constructor(private route: ActivatedRoute, private router: Router, private profesorService: ProfesorService, private translate: TranslateService) {
        this.profesor = new Profesor();
        this.translate.addLangs(["es", "en"]);
        this.translate.setDefaultLang("en");
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            //obtenemos el idProfesor del URL
            this.idProfesor = Number(params.get('idProfesor'));
            //Obtenemos los datos del profesor para listar
            this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) => {
                console.log(resProfesor)
                this.profesor = resProfesor;
                localStorage.setItem('nivel', resProfesor.nivel);
            },
                err => console.error(err)
            );
        })

        /*Inicializamos el canvas */
        const canvas = document.getElementById('miCanvas') as HTMLCanvasElement;
        this.canvas = canvas;
        this.canvas?.addEventListener("mueveMouse", this.checarMouse);
        const context = canvas?.getContext('2d');
        this.ctx = context;
        this.ctx?.fillRect(0, 0, 100, 100);
    }

    checarMouse(){
        
    }
}
