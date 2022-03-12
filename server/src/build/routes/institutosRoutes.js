"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const institutosController_1 = require("../controllers/institutosController");
class InstitutosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando institutos'));
        this.router.post('/create', institutosController_1.institutosController.create);
        this.router.put('/actualizar/:codigo', institutosController_1.institutosController.actualizar);
        this.router.delete('/eliminar/:codigo', institutosController_1.institutosController.eliminar);
        this.router.get('/all', institutosController_1.institutosController.list);
        this.router.get('/:codigo', institutosController_1.institutosController.listOne);
    }
}
const institutosRoutes = new InstitutosRoutes();
exports.default = institutosRoutes.router;
