import { Router } from 'express';
import { articuloyprofesorController } from '../controllers/articuloyprofesorController';
class ArticuloYProfesorRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', articuloyprofesorController.list );
        this.router.get('/:idAyP', articuloyprofesorController.listOne );
        this.router.post('/create', articuloyprofesorController.create);
		this.router.put('/actualizar/:idAyP',articuloyprofesorController.actualizar);
		this.router.delete('/eliminar/:idAyP',articuloyprofesorController.eliminar);
    }
}
const articuloyprofesorRoutes= new ArticuloYProfesorRoutes();
export default articuloyprofesorRoutes.router;