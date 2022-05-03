"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventosController_1 = require("../controllers/eventosController");
class EventosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', eventosController_1.eventosController.list);
        this.router.get('/:id', eventosController_1.eventosController.listOne);
        this.router.post('/create', eventosController_1.eventosController.create);
        this.router.delete('/delete/:idArticulo', eventosController_1.eventosController.delete);
        this.router.put('/update/:idArticulo', eventosController_1.eventosController.update);
        this.router.get('/eventosByProfesor/:idProfesor/:fechaIni/:fechaFin', eventosController_1.eventosController.getEventosByProfesor);
    }
}
const eventosRoutes = new EventosRoutes();
exports.default = eventosRoutes.router;
