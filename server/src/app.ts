import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from "./database";
import fs from "fs";
import { Router } from 'express';
import {Request,Response} from 'express';
const correoAcceso = require('./correoAcceso');
class Server {
    public app: Application;
    public router: Router=Router();

    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.use(express.urlencoded({
            limit: '50mb', parameterLimit: 100000, extended:
                false
        }));
        this.app.use(express.json({ limit: '50mb' })); this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: false }));
    }
    routes(): void {
        this.app.post('/enviarCorreoRecuperarContrasenya', (req, res) => {
            console.log('xx', req.body)
            correoAcceso(req.body);
        });

        this.app.post('/guardarArchivo', async (req, res) =>{
            console.log(__dirname);
            const file = req.body.src;
            const name = req.body.idArticulo;
            const index = req.body.indice;
            const tipo = req.body.tipoArchivo;
            //En la primera posición esta lo que esta antes de la diagonal, en la segunda lo que esta despues de la diagonal
            var extension = tipo.split("/",3)[1];
            let icono = "";
            if(extension == "pdf"){
                icono = "las la-file-pdf";
            }else if(extension == "docx"){
                icono = "las la-file-word"
            }else{
                icono = "las la-file-img";
            }
            let dato = {
                'idArticulo' : req.body.idArticulo,
                'extension' : extension,
                'icono': icono
            }
            await pool.query("INSERT INTO ArchivoYArticulo SET ?", dato);
            const binaryData = Buffer.from(file.replace(/^data:.*,/, ""), 'base64');
            fs.writeFile(`${__dirname}/img/pdf/${name}_${[index]}.${extension}`, binaryData, "base64", (err) =>{
                console.log("Respuesta: "+ err);
            });
            res.json({ fileName: name + '.pdf' });
        });

        this.app.post('/decodificarMail', async (req, res) => {
            console.log(req.body)
            let decodificado;
            try {
                decodificado = jwt.verify(req.body.token, process.env.TOKEN_SECRET ||'prueba');
                console.log('**',decodificado,'**')
                const result1 = await this.queryProfesor(decodificado) as any;
                console.log(result1)
                if (result1.length == 0)
                    res.json(0);
                else
                    res.json(result1[0]);
            }
            catch (err) {
                res.json(0);
            }
        });
    }
    queryProfesor = (decodificado: any) => {
        return new Promise((resolve, reject) => {
            let consulta = 'SELECT * FROM Profesores WHERE correoProfesor="' + decodificado + '"';
            console.log(consulta)
            pool.query(consulta, (error: any, results: any) => {
                if (error)
                    return reject(error);
                return resolve(results);
            });
        });
    };
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening on port ${this.app.get('port')}`);
        });
    }

    
}
const server = new Server();
server.start();