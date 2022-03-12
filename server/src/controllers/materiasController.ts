import {Request,Response} from 'express';
import pool from '../database';
class MateriasController
{
    public async list(req: Request, res: Response ): Promise<void>
    {
        const respuesta = await pool.query('SELECT * FROM Materia order by idMateria');
        console.log(respuesta);
        res.json( respuesta );
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        let consulta='SELECT * FROM Materia WHERE idMateria = '+id;
        const respuesta = await pool.query(consulta);
        console.log(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Materia no encontrada'});
    }
    public async create(req: Request, res: Response): Promise<void> 
	{
		const resp = await pool.query("INSERT INTO Materias set ?",
		[req.body]);
		res.json(resp);
	}
	public async actualizar(req: Request, res: Response): Promise<void> 
	{
		const { idMateria } = req.params;
		console.log(req.params);
		const resp = await pool.query("UPDATE Materia set ? WHERE idMateria= ?", [req.body, idMateria]);
        res.json(resp);
	}
	public async eliminar(req: Request, res: Response): Promise<void> 
	{
		const { idMateria } = req.params;
		const resp = await pool.query(`DELETE FROM Materia WHERE idMateria= ${idMateria}`);
		res.json(resp);
	}
	public async getMateriasByPlanByCarrera(req: Request, res: Response): Promise<void> {
		const { idCarrera } = req.params;
		const resp = await pool.query(`SELECT nombreMateria FROM Materia WHERE idPlan= ${idCarrera}`);
		res.json(resp);
	}
}
export const materiasController = new MateriasController();