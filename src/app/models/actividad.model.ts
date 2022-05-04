export class Actividad{
    idActividad : number;
    idProfesor : number;
    actividad : string;
    inicio : string;
    fin : string;
    descripcion : string;
    validado: number;
    comprobante : string;

    constructor() {
        this.idActividad = 0;
        this.idProfesor = 0;
        this.actividad = "";
        this.inicio = "";
        this.fin = "";
        this.descripcion = "";
        this.validado = 0;
        this.comprobante = "";
    }
}