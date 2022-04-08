"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const archivoyarticuloController_1 = require("../controllers/archivoyarticuloController");
class ArchivoYArticuloRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/listByArticulo/:idArticulo', archivoyarticuloController_1.archivoyarticuloController.listByArticulo);
        this.router.get('/list/', archivoyarticuloController_1.archivoyarticuloController.list);
    }
}
const archivoyarticuloRoutes = new ArchivoYArticuloRoutes();
exports.default = archivoyarticuloRoutes.router;
