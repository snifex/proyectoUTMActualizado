import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { ProfesoresViceComponent } from './components/profesores-vice/profesores-vice.component';
import { GeneralesViceComponent } from './components/generales-vice/generales-vice.component';

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
    GeneralesViceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
