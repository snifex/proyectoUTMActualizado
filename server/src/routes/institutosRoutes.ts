import { Router } from 'express';
import { institutosController } from '../controllers/institutosController';
import { validarToken } from '../middleware/auth';
class InstitutosRoutes
{
	public router: Router=Router();
	constructor()
	{
		this.config();
	}
	config() : void
	{
		this.router.get('/',(req,res) => res.send('probando institutos'));
		this.router.post('/create', institutosController.create);
		this.router.put('/actualizar/:codigo',institutosController.actualizar);
		this.router.delete('/eliminar/:codigo',institutosController.eliminar);
		this.router.get('/all', institutosController.list );
		this.router.get('/:codigo', institutosController.listOne );
	}
}
const institutosRoutes= new InstitutosRoutes();
export default institutosRoutes.router;