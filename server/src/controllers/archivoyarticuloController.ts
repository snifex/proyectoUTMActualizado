import {Request,Response} from 'express';
import pool from '../database';


class ArchivoYArticuloController{
    public async listByArticulo(req: Request, res: Response): Promise<void> {
        const {idArticulo} = req.params;
        const respuesta = await pool.query("SELECT * FROM ArchivoYArticulo WHERE idArticulo = ?",[idArticulo]);
        res.json(respuesta);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query("SELECT * FROM ArchivoYArticulo");
        res.json(respuesta);
    }
}

export const archivoyarticuloController = new ArchivoYArticuloController();