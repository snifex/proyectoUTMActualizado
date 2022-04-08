import { Router } from 'express';
import { archivoyarticuloController } from '../controllers/archivoyarticuloController';
class ArchivoYArticuloRoutes{
	public router: Router=Router();

    constructor(){
		this.config();
	}

    config(): void {
        this.router.get('/listByArticulo/:idArticulo', archivoyarticuloController.listByArticulo);
        this.router.get('/list/',archivoyarticuloController.list);
    }
}

const archivoyarticuloRoutes = new ArchivoYArticuloRoutes();
export default archivoyarticuloRoutes.router;