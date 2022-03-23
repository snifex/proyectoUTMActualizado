export class Articulo {
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
        this.tipCLR= '';
        this.titulo= 'Prueba';
        this.nombreCLR= 'Revista';
        this.estado= '';
        this.fechaEdicion ='';
        this.tipoNI= '';
        this.issnisbn= 'algo211';
        this.volumen= '1';
        this.paginas= '12-23';
        this.anyo= '';
        this.doi= 'algo.com';
        this.comprobante= 'a';
        this.indexa= '';
        this.issue= 'no';
        this.editores= '';
        this.cuidad= 'Huajuapunk';
        this.pais= 'Mexico';
        this.editorial='';
    }
}
