import {Request,Response} from 'express';
import pool from '../database';
class CarrerasController
{
    public async list(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM Carreras order by idCarrera');
        console.log(respuesta);
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        const {codigoCarrera} = req.params;
        let consulta='SELECT * FROM Carreras WHERE codigoCarrera = '+codigoCarrera;
        const respuesta = await pool.query(consulta);
        console.log(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Carrera no encontrado'});
    }
    public async create(req: Request, res: Response): Promise<void> 
	{
		const resp = await pool.query("INSERT INTO Carreras set ?",
		[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { idCarrera } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Carreras set ? WHERE idCarrera= ?", [req.body, idCarrera]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		const { idCarrera } = req.params;
		const resp = await pool.query(`DELETE FROM Carreras WHERE idCarrera= ${idCarrera}`);
		res.json(resp);
	}
	
	public async getCarrerasByInstituto(req: Request, res: Response): Promise<void> {
		const { idInstituto } = req.params;
		const resp = await pool.query(`SELECT * FROM Carreras WHERE idInstituto= ${idInstituto}`);
		res.json(resp);
	}
}
export const carrerasController = new CarrerasController();