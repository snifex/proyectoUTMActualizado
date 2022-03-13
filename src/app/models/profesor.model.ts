export class Profesor{
    idProfesor:number;
    nombresP: string;
    apellidoP: string;
    apellidoM: string;
    correoProfesor: string;
    password: string;
    nivel: number;
    idCarrera: number;
    grado: string;
    idTipoProfesor: number;
    nombreApa:string;
    idInstituto:number;
    constructor() {
        this.idProfesor= 0;
        this.nombresP = '';
        this.apellidoP = '';
        this.apellidoM = '';
        this.correoProfesor = '';
        this.password = '';
        this.nivel = 0;
        this.idCarrera = 0;
        this.grado = '';
        this.idTipoProfesor = 0;
        this.nombreApa = '';
        this.idInstituto = 0;
    }
}