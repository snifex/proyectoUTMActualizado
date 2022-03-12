import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-recuperar',
    templateUrl: './recuperar.component.html',
    styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
    token: any;
    respuestaMail:number = 0;
    pass1: string = '';
    pass2: string = '';
    

    constructor(private route: ActivatedRoute, private correoService: CorreoService, private profesorService: ProfesorService, private router: Router) {
        this.token = '';
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.token = params.get('token');
            let dato = {
                'token': this.token
            }
            this.correoService.decodificarMail(dato).subscribe((resCorreo: any) => {
                console.log(resCorreo);
                this.respuestaMail = resCorreo.idProfesor;
                //Si no tiene nada respuestaMail significa que no esta en la base de datos entonces redirecciona a login
                if(!this.respuestaMail) {
                    this.router.navigateByUrl("/login")
                }
                    
            }, err => console.error(err));
        });

        console.log(this.respuestaMail);
        
    }

    contrasenaCambio(): void {
        if(this.pass1 == this.pass2) {
            //Pasamos el json de la peticion para cambiar la contra 
            let contraUsuario: any;    
            contraUsuario = {
                'password' : this.pass1
            }
            this.profesorService.cambiarContrasena(contraUsuario,this.respuestaMail).subscribe((respuesta:any) =>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Has cambiado tu contraseña correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.router.navigateByUrl("/login")
            })
        }else{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Las contraseñas ingresadas no son iguales, intente de nuevo',
            })
        }
        
    }


}
