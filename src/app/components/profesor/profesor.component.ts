import { Component, OnInit } from '@angular/core';
import { Profesor} from './../../models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
	selector: 'app-profesor',
	templateUrl: './profesor.component.html',
	styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
	profesor:Profesor;

	constructor(private profesorService: ProfesorService) { 
		this.profesor = new Profesor();
	}

	ngOnInit(): void {	
	}
	altaProfesor():void{
		console.log("Profesor",this.profesor);
		this.profesorService.guardarProfesor(this.profesor).subscribe(
			res => {
				console.log(res);
			 }, err => console.error(err) );
	}

}
