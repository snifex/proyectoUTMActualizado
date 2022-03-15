export class Articulo {
    idArticulo:   number;
    tipCLR:       string;
    titulo:       string;
    nombreCLR:    string;
    estado:       string;
    fechaEdicion: string;
    tipoNI:       string;
    issnisbn:     string;
    volumen:      string;
    paginas:      string;
    anyo:         string;
    doi:          string;
    comprobante:  string;
    indexa:       string;
    issue:        string;
    editores:     string;
    cuidad:       string;
    pais:         string;
    editorial:    string;

    constructor(){
        this.idArticulo = 0;
        this.tipCLR= '';
        this.titulo= '';
        this.nombreCLR= '';
        this.estado= '';
        this.fechaEdicion ='';
        this.tipoNI= '';
        this.issnisbn= '';
        this.volumen= '';
        this.paginas= '';
        this.anyo= '';
        this.doi= '';
        this.comprobante= '';
        this.indexa= '';
        this.issue= '';
        this.editores= '';
        this.cuidad= '';
        this.pais= '';
        this.editorial='';
    }
}
