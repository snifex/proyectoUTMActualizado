"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actividadesControllers_1 = require("../controllers/actividadesControllers");
class ActividadesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', actividadesControllers_1.actividadesController.list);
        this.router.get('/:id', actividadesControllers_1.actividadesController.listOne);
        this.router.post('/create', actividadesControllers_1.actividadesController.create);
        this.router.delete('/delete/:idArticulo', actividadesControllers_1.actividadesController.delete);
        this.router.put('/update/:idArticulo', actividadesControllers_1.actividadesController.update);
        this.router.get('/actividadesByProfesor/:idProfesor/:fechaIni/:fechaFin', actividadesControllers_1.actividadesController.getActividadesByProfesor);
    }
}
const actividadesRoutes = new ActividadesRoutes();
exports.default = actividadesRoutes.router;
