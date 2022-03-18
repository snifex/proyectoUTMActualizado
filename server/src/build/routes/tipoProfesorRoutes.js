"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoProfesorController_1 = require("../controllers/tipoProfesorController");
class TipoProfesorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipoProfesorController_1.tipoProfesorController.list);
    }
}
const tipoProfesorRoutes = new TipoProfesorRoutes();
exports.default = tipoProfesorRoutes.router;
