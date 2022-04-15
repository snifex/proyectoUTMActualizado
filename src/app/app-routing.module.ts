import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { GeneralesViceComponent } from './components/generales-vice/generales-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { ArticulosImprimirComponent } from './components/articulos-imprimir/articulos-imprimir.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'recuperar/:token',
		component: RecuperarComponent,
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: 'generales/:idProfesor',
				component: GeneralesComponent,
			},
			{
				path: 'articulos/:idProfesor', /*dos puntos es para un atributo*/ 
				component: ArticulosComponent,
			},
			{
				path: 'articulosVice/:idProfesor',
				component: ArticulosViceComponent,
			},
			{
				path: 'profesores-vice/:idProfesor',
				component: ProfesoresViceComponent
			},
			{
				path: 'generales-vice/:idProfesor',
				component: GeneralesViceComponent
			},
			{
				path: 'carreras-vice/:idProfesor',
				component: CarrerasViceComponent
			},
			{
				path: 'institutos-vice/:idProfesor',
				component: InstitutosViceComponent
			},
			{
				path: 'articulos-imprimir/:idProfesor',
				component: ArticulosImprimirComponent
			}
		]
	},
	{
		path: 'profesor',
		component: ProfesorComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
