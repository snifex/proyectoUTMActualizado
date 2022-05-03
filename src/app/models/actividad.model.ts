export class Actividad{
    idActividad : number;
    idProfesor : number;
    actividad : string;
    inicio : Date;
    fin : Date;
    descripcion : string;
    validado: number;
    comprobante : string;

    constructor() {
        this.idActividad = 0;
        this.idProfesor = 0;
        this.actividad = "";
        this.inicio = new Date();
        this.fin = new Date();
        this.descripcion = "";
        this.validado = 0;
        this.comprobante = "";
    }
}