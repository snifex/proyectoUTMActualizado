"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articuloyprofesorController_1 = require("../controllers/articuloyprofesorController");
class ArticuloYProfesorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', articuloyprofesorController_1.articuloyprofesorController.list);
        this.router.get('/:idAyP', articuloyprofesorController_1.articuloyprofesorController.listOne);
        this.router.post('/create', articuloyprofesorController_1.articuloyprofesorController.create);
        this.router.put('/actualizar/:idAyP', articuloyprofesorController_1.articuloyprofesorController.actualizar);
        this.router.delete('/eliminar/:idAyP', articuloyprofesorController_1.articuloyprofesorController.eliminar);
    }
}
const articuloyprofesorRoutes = new ArticuloYProfesorRoutes();
exports.default = articuloyprofesorRoutes.router;
