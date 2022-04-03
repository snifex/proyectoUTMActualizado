"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articuloController_1 = require("../controllers/articuloController");
class ArticuloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', articuloController_1.articuloController.list);
        this.router.get('/:idArticulo', articuloController_1.articuloController.listOne);
        this.router.get('/listByProfesor/:idProfesor', articuloController_1.articuloController.listByProfesor);
        this.router.post('/create/:idProfesor', articuloController_1.articuloController.create);
        this.router.put('/actualizar/:idArticulo', articuloController_1.articuloController.actualizar);
        this.router.delete('/eliminar/:idArticulo', articuloController_1.articuloController.eliminar);
        this.router.get('/listByPeriodo/:ini/:fin', articuloController_1.articuloController.listByPeriodo);
        this.router.get('/listByInstituto/:idInstituto', articuloController_1.articuloController.getArticulosByInstituto);
    }
}
const articuloyprofesorRoutes = new ArticuloRoutes();
exports.default = articuloyprofesorRoutes.router;
