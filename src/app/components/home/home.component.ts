import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/models/articulo.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Profesor } from 'src/app/models/profesor.model';
import { ArticuloService } from 'src/app/services/articulo.service';
import { CambioInfoService } from 'src/app/services/cambio-info.service';
import { CarrerasService } from 'src/app/services/carreras.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipoprofesor.service';
import { Packer, Document, Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, VerticalAlign, WidthType, HeightRule, ShadingType } from 'docx';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

declare var $: any;

const margenes = {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100
}

const rellenoVerdeClaro = {
    type: ShadingType.CLEAR,
    color: 'e8f5e9',
    fill: 'e8f5e9'
}

const rellenoVerdeFuerte = {
    type: ShadingType.CLEAR,
    color: 'a5d6a7',
    fill: 'a5d6a7'
}
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    tipoCLR: any[] = ["Revista", "Libro", "Congreso", "Cap. Libro", "Libro"];
    institutos: any;
    institutoActual: any;
    profesoresApa: any;
    carreras: any;
    carrerasProfesor: any;
    numCarrerasByInstituto: any;
    articulito: Articulo;
    carreraActual: any;
    profesores: any[] = []
    profesor: Profesor;
    profesorActual: any;
    tipoProfesorActual: any;
    tipoProfesores: any;
    idProfesor: number;
    indexa: any[] = ["Si", "No"]
    estado: any[] = ["Publicado", "Pendiente"];
    tipoNI: any[] = ["Nacional", "Internacional"];
    location: any;
    institutoModel: Instituto;
    carreraModel: Carrera;
    indexInstitutoArticulosExportar: number = 0;
    carreraEliminar: any;
    carreraModificar: Carrera;

    /* Modal variables*/
    institutoActualModal: any;
    carreraActualModal: any;
    carrerasModal: any;

    constructor(private articuloService: ArticuloService, private profesorService: ProfesorService, private carrerasService: CarrerasService, private tipoProfesorService: TipoProfesorService, private institutoService: InstitutoService, private cambioInfoService: CambioInfoService) {
        this.articulito = new Articulo();
        this.profesor = new Profesor();
        this.idProfesor = Number(localStorage.getItem('idProfesor'));
        this.institutoModel = new Instituto();
        this.carreraModel = new Carrera();
        this.carreraModificar = new Carrera();
    }

    ngOnInit(): void {
        this.location = location.href;
        console.log(this.location);
        $(document).ready(function () {
            $('.fixed-action-btn').floatingActionButton({
                direction: "left",
                hoverEnabled: false
            });
            $('select').formSelect();
            $('.datepicker').datepicker({
                format: "yyyy-mm-dd",
                autoClose: true,
            });
        });

        // //Vamos a arreglar el apa de los profesores
        // this.profesorService.listProfesores().subscribe((resProfesoresTodos:any) => {
        //     this.profesoresApa = resProfesoresTodos;
        //     for (let index = 0; index < this.profesoresApa.length; index++) {
        //         const element = this.profesoresApa[index];
        //         element.nombreApa = element.apellidoP + ", ";
        //         if(element.nombresP.indexOf(" ") != -1){
        //              element.nombreApa += element.nombresP.charAt(0) + "." + element.nombresP.charAt(element.nombresP.indexOf(" ")+1) + ".";
        //         }else{
        //              element.nombreApa += element.nombresP.charAt(0) + ".";
        //         }
        //         //Mandamos a guardar en la base de datos
        //         this.profesorService.modificarProfesor(element.idProfesor,element).subscribe((resProfesores: any) => {
        //         },err => console.error(err));
        //     }

        // })

        this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) => {
            this.profesorActual = resProfesor;
        }, err => console.error(err));

        this.tipoProfesorService.listarTipoProfesor().subscribe((resTipoProfesores: any) => {
            this.tipoProfesores = resTipoProfesores;
        }, err => console.error(err));

        this.carrerasService.listCarreras().subscribe((resCarreras: any) => {
            console.log(resCarreras);
            this.carreras = resCarreras;
            this.carrerasProfesor = resCarreras;
        })

        this.institutoService.listInstitutos().subscribe((resInstitutos: any) => {
            console.log(resInstitutos);
            this.institutos = resInstitutos;
            this.institutoActual = this.institutos[1].idInstituto;
            this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
                console.log(resCarreras);
                this.carreraActual = resCarreras[0].idCarrera;
                this.numCarrerasByInstituto = resCarreras.length;
                this.carreras = resCarreras;
                this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
                    console.log(resProfesores);
                    this.profesores = resProfesores;
                },
                    err => console.error(err)
                );
            },
                err => console.error(err)
            );
        },
            err => console.error(err)
        );
    }

    cambioInstituto(op: any) {
        this.institutoActual = op.value;
        this.carrerasService.listCarrerasByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
            console.log(resCarreras);
            this.numCarrerasByInstituto = resCarreras.length;
            if (this.numCarrerasByInstituto == 0) {
                this.carreraActual = 0
            } else {
                this.carreraActual = resCarreras[0].idCarrera;
                this.carreras = resCarreras;
            }
            let dato = {
                'value': this.carreraActual
            }
            this.cambioCarrera(dato);
        }, err => console.error(err));
    }

    enviarMensajeArticulo(): void {
        this.cambioInfoService.enviar();
    }

    cambioCarrera(op: any): void {
        this.carreraActual = op.value;
        this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
            this.profesores = resProfesores;
        }, err => console.error(err));
    }

    /*Carrera Metodos */
    eliminarCarrera(index: any): void {
        this.carreraEliminar = this.carreras[index];
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: '¿Estas seguro de eliminar esta Carrera?',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3741',
            confirmButtonText: 'Eliminar'
        }).then((respuesta) => {
            if (respuesta.isConfirmed) {
                this.carrerasService.eliminarCarrera(this.carreraEliminar.idCarrera).subscribe((resElimina: any) => {
                    Swal.fire('Carrera eliminado', '', 'error');
                }, err => console.error(err))

                //Listamos a los institutos para que nos salgan con los cambios hechos
                this.cambioCarrera(this.carreraActual);
            }
        })
    }

    /* MODALES */
    agregarArticulo(): void {
        console.log("agregar articulo");
        $('#agregarArticulo').modal();
        $('#agregarArticulo').modal("open");
    }

    agregarProfesor(): void {
        console.log("agregar profesor");
        $('#agregarProfesor').modal();
        $('#agregarProfesor').modal("open");
    }

    darAltaArticulo(): void {
        //dar de alta el articulo
        this.articulito.editores = this.profesorActual.nombresP + " " + this.profesorActual.apellidoP + " " + this.profesorActual.apellidoM;
        //Obtenemos la fecha de Jquery
        this.articulito.fechaEdicion = $('#fecha').val();
        //Obtenemos el año de la fecha 
        this.articulito.anyo = this.articulito.fechaEdicion.substring(0, 4);
        console.log(this.articulito);
        this.articuloService.crearArticulo(this.idProfesor, this.articulito).subscribe((resArticulo: any) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha dado de alta correctamente el articulo'
            });
            this.enviarMensajeArticulo();
        }, err => console.error(err));
        //Redirecciona a articulos despues de agregar el articulo
        // if(this.location == "http://localhost:4200/home/articulosVice/"+this.idProfesor){
        //     document.location.reload();
        // }
    }

    altaInstituto(): void {
        this.institutoService.crearInstituto(this.institutoModel).subscribe(res => {
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha dado de alta correctamente el nuevo Instituto'
            });
            this.enviarMensajeArticulo();
        }, err => console.error(err));
    }

    altaCarrera(): void {
        this.carreraModel.idInstituto = this.institutoActual
        this.carrerasService.crearCarrera(this.carreraModel).subscribe(res => {
            console.log(res);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se ha dado de alta correctamente la nueva Carrera'
            });
            this.enviarMensajeArticulo()
        }, err => console.error(err))
    }

    // Exportar
    arregloALista(elementos: any[]): Paragraph[] {
        let lista: Paragraph[] = [];
        elementos.forEach(elemento => {
            lista.push(
                new Paragraph({
                    text: `${elemento.nombresP} ${elemento.apellidoP} ${elemento.apellidoM}`,
                    bullet: {
                        level: 0
                    },
                    alignment: AlignmentType.LEFT
                })
            )
        })
        return lista;
    }

    arregloAFilas(articulos: any[]): TableRow[] {
        let filas: TableRow[] = [];
        articulos.forEach((articulo, i) => {
            const relleno = (i % 2 == 0 ? rellenoVerdeClaro : rellenoVerdeFuerte);
            let fila = new TableRow({
                children: [
                    new TableCell({
                        shading: relleno,
                        margins: margenes,
                        children: [
                            new Paragraph({
                                text: `${articulo.fechaEdicion}`,
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),

                    new TableCell({
                        shading: relleno,
                        margins: margenes,
                        children: [
                            new Paragraph({
                                text: `${articulo.titulo}`,
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),

                    new TableCell({
                        shading: relleno,
                        margins: margenes,
                        children: [
                            ...this.arregloALista(articulo.profesores)
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                ]
            })
            filas.push(fila);
        })
        return filas;
    }

    exportarArticulosWord() {
        let id = this.institutos[this.indexInstitutoArticulosExportar].idInstituto;
        let nombre = this.institutos[this.indexInstitutoArticulosExportar].nombreInstituto;

        this.articuloService.listByInstitutoOfFirstAutor(id).subscribe((articulosRes: any) => {
            //Crear documento
            const documento = new Document({
                styles: {
                    default: {
                        document: {
                            run: {
                                font: 'Arial'
                            }
                        }
                    }
                },
                sections: [{
                    children: [
                        //titulo
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `Artículos ${nombre}`,
                                    size: 36
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Table({
                            rows: [
                                new TableRow({
                                    tableHeader: true,
                                    height: {
                                        value: 400,
                                        rule: HeightRule.EXACT
                                    },
                                    children: [
                                        new TableCell({
                                            shading: rellenoVerdeFuerte,
                                            children: [
                                                new Paragraph({
                                                    text: 'Fecha',
                                                    alignment: AlignmentType.CENTER
                                                })
                                            ],
                                            verticalAlign: VerticalAlign.CENTER
                                        }),

                                        new TableCell({
                                            shading: rellenoVerdeFuerte,
                                            children: [
                                                new Paragraph({
                                                    text: 'Titulo',
                                                    alignment: AlignmentType.CENTER
                                                })
                                            ],
                                            verticalAlign: VerticalAlign.CENTER
                                        }),

                                        new TableCell({
                                            shading: rellenoVerdeFuerte,
                                            children: [
                                                new Paragraph({
                                                    text: 'Autores',
                                                    alignment: AlignmentType.CENTER
                                                })
                                            ],
                                            verticalAlign: VerticalAlign.CENTER
                                        })
                                    ]
                                }),
                                ...this.arregloAFilas(articulosRes)
                            ],
                            width: {
                                size: 100,
                                type: WidthType.PERCENTAGE
                            }
                        })
                    ]
                }]
            })

            //Descargar Word
            Packer.toBlob(documento).then((blob : any) => {
                saveAs(blob, 'Articulos.docx')
            })
        }, err => console.error(err));
    }
}
