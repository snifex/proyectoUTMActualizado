import { Request, Response } from 'express';
import pool from '../database';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
class ProfesoresController {
	public async list(req: Request, res: Response): Promise<void> {
		const respuesta = await pool.query('SELECT * FROM Profesores');
		res.json(respuesta);
	}
	public async listOne(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		const respuesta = await pool.query('SELECT * FROM Profesores WHERE idProfesor = ?', [idProfesor]);
		if (respuesta.length > 0) {
			res.json(respuesta[0]);
			return;
		}
		res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
	}
	public async create(req: Request, res: Response): Promise<void> {
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10);
		bcrypt.compare('prueba', "xyz", (err, res) => {
			console.log('Compared result', res);
		})
		bcrypt.hash(password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			const resp = pool.query("INSERT INTO Profesores set ?", [req.body]);
			res.json(resp);
		})
	}
	public async actualizar(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Profesores set ? WHERE idProfesor= ?", [req.body, idProfesor]);
		res.json(resp);
	}

	public async eliminar(req: Request, res: Response): Promise<void> {
		const { idProfesor } = req.params;
		const resp = await pool.query(`DELETE FROM Profesores WHERE idProfesor= ${idProfesor}`);
		res.json(resp);
	}
	
	public async existe(req: Request, res: Response): Promise<void> {
		console.log("existe")
		const { correoProfesor } = req.params;
		let password = req.body.password; 
		let token: string;
		let consulta = "SELECT idProfesor,password FROM Profesores WHERE correoProfesor = '" + correoProfesor + "'";
		const respuesta = await pool.query(consulta);
		console.log(respuesta)
		if (respuesta.length > 0) {
			bcrypt.compare(password, respuesta[0].password, (err, resEncriptar) => {
				if (resEncriptar == true) {
					token = jwt.sign(correoProfesor, process.env.TOKEN_SECRET || 'prueba');
					console.log(token);
					res.json({'token': token, 'idProfesor': respuesta[0].idProfesor});
				}
				else
					res.json(-1);
				return;
			})
		}
		else
			res.json(-1);
	}

	public async listAutorByArticulo(req: Request, res: Response): Promise<void> {
		//console.log("listAutorByArticulo")
		const { idArticulo } = req.params;
		let consulta = 'SELECT P.nombresP, P.idProfesor, P.apellidoP, P.apellidoM FROM Profesores P INNER JOIN ArticuloYProfesor AYP ON AYP.idProfesor=P.idProfesor WHERE idArticulo = ' + idArticulo;
		const respuesta = await pool.query(consulta);

		res.json(respuesta);
	}

	public async cambiarContrasena(req: Request, res: Response): Promise<void> {
		const {idProfesor} = req.params;
		let password = req.body.password as any;
		var salt = bcrypt.genSaltSync(10)
		bcrypt.hash(req.body.password, salt).then(function (nuevoPassword) {
			req.body.password = nuevoPassword;
			const resp = pool.query('UPDATE profesores set ? WHERE idProfesor = ?',[req.body,idProfesor]);
			res.json(resp);
		})
	}

	public async listProfesoresByCarrera(req: Request, res: Response): Promise<void> {
		const {idCarrera} = req.params;
		let consulta = 'SELECT * FROM Profesores WHERE idCarrera =' + idCarrera;
		const respuesta = await pool.query(consulta);

		res.json(respuesta)
	}

	public async listProfesoresByInstituto(req: Request, res: Response): Promise<void> {
		const {idInstituto} = req.params;
		let consulta = 'SELECT * FROM Profesores WHERE idInstituto = ' + idInstituto;
		const respuesta = await pool.query(consulta);

		res.json(respuesta)
	}
	

	constructor() {
		dotenv.config();
		console.log(process.env.TOKEN_SECRET)
	}

}
export const profesoresController = new ProfesoresController();