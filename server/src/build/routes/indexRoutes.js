"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.get('/Institutos', (req, res) => res.send('probando instituto'));
        this.router.get('/Carreras', (req, res) => res.send('probando carrera'));
        this.router.get('/Profesores', (req, res) => res.send('probando profesor'));
        this.router.get('/Materias', (req, res) => res.send('probando materia'));
        this.router.get('/articuloYprofesor', (req, res) => res.send('probando materia'));
        this.router.get('/articulo', (req, res) => res.send('probando articulo'));
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
