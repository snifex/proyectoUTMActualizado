import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';
declare var $:any;
@Component({
	selector: 'app-generales',
	templateUrl: './generales.component.html',
	styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
	
	idProfesor : number = 0; /* any para cuando no sabemos el tipo de dato */
	profesor: Profesor;

	constructor(private route:ActivatedRoute,
		private profesorService:ProfesorService) { 
			this.profesor=new Profesor();
		}

	ngOnInit(): void {
		
		this.route.paramMap.subscribe(params =>
			{
				this.idProfesor = Number(params.get('idProfesor'));
				this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) =>
				{
					console.log(resProfesor);
					this.profesor=resProfesor;
				},
				err => console.error(err)
				);
				console.log(this.idProfesor);
			});
	}
	
}
