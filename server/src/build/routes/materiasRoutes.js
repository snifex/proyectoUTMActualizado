"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiasController_1 = require("../controllers/materiasController");
class MateriasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', materiasController_1.materiasController.list);
        this.router.get('/:idMateria', materiasController_1.materiasController.listOne);
        this.router.post('/create', materiasController_1.materiasController.create);
        this.router.put('/actualizar/:codigo', materiasController_1.materiasController.actualizar);
        this.router.delete('/eliminar/:codigo', materiasController_1.materiasController.eliminar);
        this.router.get('/:getMateriasByPlanByCarrera/:idCarrera', materiasController_1.materiasController.getMateriasByPlanByCarrera);
    }
}
const materiasRoutes = new MateriasRoutes();
exports.default = materiasRoutes.router;
