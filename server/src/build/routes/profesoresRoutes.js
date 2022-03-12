"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profesoresController_1 = require("../controllers/profesoresController");
class ProfesoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', profesoresController_1.profesoresController.list);
        this.router.get('/:idProfesor', profesoresController_1.profesoresController.listOne);
        this.router.post('/create', profesoresController_1.profesoresController.create);
        this.router.put('/actualizar/:idProfesor', profesoresController_1.profesoresController.actualizar);
        this.router.delete('/eliminar/:idProfesor', profesoresController_1.profesoresController.eliminar);
        this.router.get('/listAutorByArticulo/:idArticulo', profesoresController_1.profesoresController.listAutorByArticulo);
        this.router.post('/existe/:correoProfesor', profesoresController_1.profesoresController.existe);
        this.router.post('/cambiarContrasena/:idProfesor', profesoresController_1.profesoresController.cambiarContrasena);
    }
}
const profesoresRoutes = new ProfesoresRoutes();
exports.default = profesoresRoutes.router;
