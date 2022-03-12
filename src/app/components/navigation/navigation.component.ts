import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	idProfesor: number = 0;
	constructor(private router: Router) { }

	ngOnInit(): void {
		this.idProfesor=Number(localStorage.getItem('idProfesor'));
		console.log(this.idProfesor);
		$(document).ready(function () {
			$('.sidenav').sidenav();
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});
	}
	logout(){
		console.log('logout');
		localStorage.removeItem('token');
		localStorage.removeItem('correo');
		localStorage.removeItem('idProfesor');
		this.router.navigateByUrl('/');

	}

}
