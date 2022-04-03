import {Request,Response} from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
class ArticuloController
{
	public async list(req: Request, res: Response ): Promise<void>
	{
		console.log("list")
		const respuesta = await pool.query('SELECT * FROM Articulo');
		res.json( respuesta );
	}
	public async listOne(req: Request, res: Response): Promise <void>
	{
		console.log("listOne")
		const {idArticulo} = req.params;
		const respuesta = await pool.query('SELECT * FROM Articulo WHERE idArticulo = ?', [idArticulo]);
		if(respuesta.length>0)
		{
			res.json(respuesta[0]);
			return ;
		}
		res.status(404).json({'mensaje': 'Articulo no encontrado'});
	}	
	public async create(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		const resp = await pool.query("INSERT INTO Articulo set ?",[req.body]);
		//Sacamos el id del articulo creado con el await
		let dato = {
			'idProfesor': idProfesor,
			'idArticulo': resp.insertId,
			'pos':1,
			'valido':'Si'
		};
		const respArticulo = await pool.query("INSERT INTO ArticuloYProfesor set ?",[dato]);
		res.json(respArticulo);
	}

	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		console.log("actualizar")
		const { idArticulo } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Articulo set ? WHERE idArticulo= ?", [req.body, idArticulo]);
		res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		console.log("eliminar")
		const { idArticulo } = req.params;
		const resp = await pool.query(`DELETE FROM Articulo WHERE idArticulo= ${idArticulo}`);
		res.json(resp);
	}
    public async articulosByCarrera(req: Request, res: Response): Promise<void> 
	{
		console.log("articulosByCarrera")
		const { idCarrera } = req.params;
		const resp = await pool.query("SELECT nombre FROM Articulo WHERE idCarrera=?",[req.body,idCarrera]);
		res.json(resp);
	}

	public async listByProfesor(req: Request, res: Response): Promise <void>{
		console.log("listByProfesor")
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM Articulo A INNER JOIN ArticuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
			res.json(respuesta);
	}
		
	public async listByPeriodo(req: Request, res: Response ): Promise<void>
	{
		const { ini,fin } = req.params;
		console.log("listByPeriodo")
		let consulta=`SELECT * FROM Articulo WHERE fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
		console.log(consulta)
		const respuesta = await pool.query('SELECT * FROM Articulo WHERE fechaEdicion>=? AND fechaEdicion<=?',[ini,fin]);
		res.json( respuesta );
	}

	public async getArticulosByInstituto(req: Request, res: Response): Promise<void> {
		const { idInstituto } = req.params
		let respuesta = await pool.query('SELECT * FROM Articulo as A INNER JOIN ArticuloYProfesor AP ON AP.idArticulo=A.idArticulo INNER JOIN Profesores P ON P.idProfesor=AP.idProfesor WHERE P.idInstituto=?', idInstituto)
		
		// Obtener los profesores participantes
		for (let i = 0; i < respuesta.length; i++) {
			const respuesta2 = await pool.query('SELECT * FROM Profesores as P INNER JOIN ArticuloYProfesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=?', respuesta[i].idArticulo)
			respuesta[i].profesores = respuesta2
		}

		res.json(respuesta)
	}
}
export const articuloController = new ArticuloController();