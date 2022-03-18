import {Request,Response} from 'express';
import pool from '../database';

class TipoProfesorController{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM tipoprofesor ');
        res.json(respuesta);
    }
}

export const tipoProfesorController = new TipoProfesorController();