import {Request,Response} from 'express';
import pool from '../database';
class InstitutosController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		const respuesta = await pool.query('SELECT * FROM Institutos');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		const {codigo} = req.params;
		const respuesta = await pool.query('SELECT * FROM Institutos WHERE codigo = ?', [codigo]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Instituto no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> 
	{
		const resp = await pool.query("INSERT INTO Institutos set ?",
		[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { codigo } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Institutos set ? WHERE codigo= ?", [req.body, codigo]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		const { codigo } = req.params;
		const resp = await pool.query(`DELETE FROM Institutos WHERE codigo= ${codigo}`);
		res.json(resp);
	}
	
}
export const institutosController = new InstitutosController();