import { Router } from 'express';
import { profesoresController } from '../controllers/profesoresController';
import { validarToken } from '../middleware/auth';
class ProfesoresRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',validarToken, profesoresController.list);
        this.router.get('/:idProfesor', profesoresController.listOne );
        this.router.post('/create', profesoresController.create);
		this.router.put('/actualizar/:idProfesor',profesoresController.actualizar);
		this.router.delete('/eliminar/:idProfesor',profesoresController.eliminar);
        this.router.get('/listAutorByArticulo/:idArticulo', profesoresController.listAutorByArticulo);
        this.router.post('/existe/:correoProfesor', profesoresController.existe);
        this.router.post('/cambiarContrasena/:idProfesor',profesoresController.cambiarContrasena);
        this.router.get('/listProfesoresByCarrera/:idCarrera', profesoresController.listProfesoresByCarrera);
        this.router.get('/listProfesoresByInstituto/:idInstituto', profesoresController.listProfesoresByInstituto);
    }
}
const profesoresRoutes= new ProfesoresRoutes();
export default profesoresRoutes.router;