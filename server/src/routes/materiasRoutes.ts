import { Router } from 'express';
import { materiasController } from '../controllers/materiasController';
class MateriasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', materiasController.list );
        this.router.get('/:idMateria', materiasController.listOne );
        this.router.post('/create', materiasController.create);
		this.router.put('/actualizar/:codigo',materiasController.actualizar);
		this.router.delete('/eliminar/:codigo',materiasController.eliminar);
        this.router.get('/:getMateriasByPlanByCarrera/:idCarrera', materiasController.getMateriasByPlanByCarrera);
    }
}
const materiasRoutes= new MateriasRoutes();
export default materiasRoutes.router;