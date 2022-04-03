import { Router } from 'express';
import { articuloController } from '../controllers/articuloController';
class ArticuloRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', articuloController.list);
		this.router.get('/:idArticulo', articuloController.listOne);
		this.router.get('/listByProfesor/:idProfesor', articuloController.listByProfesor);
		this.router.post('/create/:idProfesor', articuloController.create);
		this.router.put('/actualizar/:idArticulo', articuloController.actualizar);
		this.router.delete('/eliminar/:idArticulo', articuloController.eliminar);
		this.router.get('/listByPeriodo/:ini/:fin', articuloController.listByPeriodo);
		this.router.get('/listByInstituto/:idInstituto', articuloController.getArticulosByInstituto)
	}
}
const articuloyprofesorRoutes = new ArticuloRoutes();
export default articuloyprofesorRoutes.router;