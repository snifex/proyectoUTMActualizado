import {Request,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
class ArticuloYProfesorController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		const respuesta = await pool.query('SELECT * FROM ArticuloYProfesor');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		const {idAyP} = req.params;
		const respuesta = await pool.query('SELECT * FROM ArticuloYProfesor WHERE idAyP = ?', [idAyP]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}	

	public async create(req: Request, res: Response): Promise<void> {
		const resp = pool.query("INSERT INTO ArticuloYProfesor set ?",[req.body]);
		res.json(resp);
	}
	
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { idAyP } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE ArticuloYProfesor set ? WHERE idAyP= ?", [req.body, idAyP]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		const { idAyP } = req.params;
		const resp = await pool.query("DELETE FROM ArticuloYProfesor WHERE idAyP= ${idAyP}");
		res.json(resp);
	}
	public async ProfesoresArticulo(req:Request,res:Response):Promise<void>{
        const{idArticulo}=req.params;
        console.log(req.params);
        const resp = await pool.query("SELECT nombresP FROM Profesores WHERE idArticulo=?",[req.body,idArticulo]);
        res.json(resp);
    }
	public async listByInstitutoOfFirstAutor(req: Request, res: Response): Promise<void> {
        const {idInstituto} = req.params;
        let respuesta = await pool.query("SELECT A.* FROM profesores P JOIN articuloyprofesor AyP ON P.idProfesor = AyP.idProfesor JOIN articulo A ON A.idArticulo = AyP.idArticulo WHERE AyP.pos = 1 AND ? = P.idInstituto",[idInstituto]);
		res.json(respuesta);
    }

	public async listByInstitutoAndDate(req: Request, res: Response): Promise<void>{
		const {idInstituto,fechaInicio,fechaFin} = req.params;
		let respuesta = await pool.query("SELECT A.* FROM profesores P JOIN articuloyprofesor AyP ON P.idProfesor = AyP.idProfesor JOIN articulo A ON A.idArticulo = AyP.idArticulo WHERE AyP.pos = 1 AND P.idInstituto = ? AND A.fechaEdicion >= ? AND A.fechaEdicion <= ?",[idInstituto,fechaInicio,fechaFin])
		res.json(respuesta);
	}

	public async listByFirstAutorAndDate(req: Request, res: Response): Promise<void>{
		const{idProfesor,fechaInicio,fechaFin} = req.params;
		let respuesta = await pool.query("SELECT A.* FROM profesores P JOIN articuloyprofesor AyP ON P.idProfesor = AyP.idProfesor JOIN articulo A ON A.idArticulo = AyP.idArticulo WHERE AyP.pos = 1 AND P.idProfesor = ? AND A.fechaEdicion >= ? AND A.fechaEdicion <= ?",[idProfesor,fechaInicio,fechaFin]);
		res.json(respuesta);
	}
	
	public async listByAllFilters(req: Request, res: Response): Promise<void>{
		const{idInstituto, idProfesor, fechaInicio, fechaFin} = req.params;
		let respuesta = await pool.query("SELECT A.* FROM profesores P JOIN articuloyprofesor AyP ON P.idProfesor = AyP.idProfesor JOIN articulo A ON A.idArticulo = AyP.idArticulo WHERE AyP.pos = 1 AND P.idInstituto = ? AND P.idProfesor = ? AND A.fechaEdicion >= ? AND A.fechaEdicion <= ?",[idInstituto,idProfesor,fechaInicio,fechaFin])
		res.json(respuesta);
	}
	
}
export const articuloyprofesorController = new ArticuloYProfesorController();