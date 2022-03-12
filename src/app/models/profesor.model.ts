export class Profesor{
    idProfesor:number;
    nombresP: string;
    apellidoP: string;
    apellidoM: string;
    correoP: string;
    passwordP: string;
    nivelP: number;
    idCarreraP: number;
    gradoP: string;
    tipoP: number;
    constructor() {
        this.idProfesor= 0;
        this.nombresP = '';
        this.apellidoP = '';
        this.apellidoM = '';
        this.correoP = '';
        this.passwordP = '';
        this.nivelP = 0;
        this.idCarreraP = 0;
        this.gradoP = '';
        this.tipoP = 0;
    }
}