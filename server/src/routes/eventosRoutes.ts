import { Router } from 'express'
import { eventosController } from '../controllers/eventosController'

class EventosRoutes {

	public router: Router = Router()

	constructor() {
		this.config()
	}

	config() : void {
		this.router.get('/', eventosController.list)
		this.router.get('/:id', eventosController.listOne)
		this.router.post('/create', eventosController.create)
		this.router.delete('/delete/:idArticulo', eventosController.delete) 
		this.router.put('/update/:idArticulo', eventosController.update)
		this.router.get('/eventosByProfesor/:idProfesor/:fechaIni/:fechaFin', eventosController.getEventosByProfesor)
	}

}

const eventosRoutes = new EventosRoutes()
export default eventosRoutes.router