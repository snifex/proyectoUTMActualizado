import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { GeneralesViceComponent } from './components/generales-vice/generales-vice.component';
import { CambioInfoService } from './services/cambio-info.service';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { ArticulosImprimirComponent } from './components/articulos-imprimir/articulos-imprimir.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResizableModule } from 'angular-resizable-element';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}	
@NgModule({ /* para hacer la relacion entre formulario con el modelo */
	declarations: [
		AppComponent,
		LoginComponent,
		ProfesorComponent,
		NavigationComponent,
		GeneralesComponent,
		HomeComponent,
		ArticulosComponent,
		ArticulosViceComponent,
		RecuperarComponent,
		ProfesoresViceComponent,
		GeneralesViceComponent,
		CarrerasViceComponent,
		InstitutosViceComponent,
		ArticulosImprimirComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		FormsModule,
		NgxPaginationModule,
		ResizableModule,
		TranslateModule.forRoot({
			loader: {
			provide: TranslateLoader,
			useFactory: HttpLoaderFactory,
			deps: [HttpClient],
			},
		}),
	],
	providers: [CambioInfoService],
	bootstrap: [AppComponent]
})
export class AppModule { }
