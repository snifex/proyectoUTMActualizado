export class Evento{
    idProfesor: number;
    idEvento: number;
    tipoEvento: string;
    participacion: string;
    afectaLinea: string;
    tipoParticipacion: string;
    titulo: string;
    inicio: Date;
    fin: Date;
    comprobante: string;

    constructor() {
        this.idProfesor = 0;
        this.idEvento = 0;
        this.tipoEvento = "";
        this.participacion = "";
        this.afectaLinea = "";
        this.tipoParticipacion = "";
        this.titulo = "";
        this.inicio = new Date();
        this.fin = new Date();
        this.comprobante = "";
    }
}