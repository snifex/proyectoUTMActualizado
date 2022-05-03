import { Router } from 'express';
class IndexRoutes
{
	public router: Router=Router();
	constructor()
	{
		this.config();
	}
	config() : void
	{
		this.router.get('/', (req,res) => res.send('probando ruta'));
		this.router.get('/Institutos', (req,res) => res.send('probando instituto'));
		this.router.get('/Carreras', (req,res) => res.send('probando carrera'));
		this.router.get('/Profesores', (req,res) => res.send('probando profesor'));
		this.router.get('/Materias', (req,res) => res.send('probando materia'));
		this.router.get('/articuloYprofesor', (req,res) => res.send('probando materia'));
		this.router.get('/articulo', (req,res) => res.send('probando articulo'));
		this.router.get('/tipoprofesor', (req,res) => res.send('probando tipo profesor'));
		this.router.get('/archivoYArticulo', (req,res) => res.send('probando archivo y articulo'));
		this.router.get('/eventos', (req,res) => res.send('probando eventos'));
		this.router.get('/actividades', (req,res) => res.send('probando actividades'));
	}
}
const indexRoutes= new IndexRoutes();
export default indexRoutes.router;