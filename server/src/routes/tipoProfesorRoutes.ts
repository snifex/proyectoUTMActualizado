import { Router } from 'express';
import { tipoProfesorController } from '../controllers/tipoProfesorController';

class TipoProfesorRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void{
        this.router.get('/',tipoProfesorController.list);
    }
}
const tipoProfesorRoutes = new TipoProfesorRoutes();
export default tipoProfesorRoutes.router;