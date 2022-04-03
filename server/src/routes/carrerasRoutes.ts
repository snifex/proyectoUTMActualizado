import { Router } from 'express';
import { carrerasController } from '../controllers/carrerasController';
class CarrerasRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', carrerasController.list );
        this.router.get('/:codigoCarrera', carrerasController.listOne );
        this.router.post('/create', carrerasController.create);
		this.router.post('/actualizar/:idCarrera',carrerasController.actualizar);
		this.router.delete('/eliminar/:idCarrera',carrerasController.eliminar);
        this.router.get('/getCarrerasByInstituto/:idInstituto', carrerasController.getCarrerasByInstituto);
    }
}
const carrerasRoutes= new CarrerasRoutes();
export default carrerasRoutes.router;