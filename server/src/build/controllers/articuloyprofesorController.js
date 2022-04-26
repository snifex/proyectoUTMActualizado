"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articuloyprofesorController = void 0;
const database_1 = __importDefault(require("../database"));
class ArticuloYProfesorController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM ArticuloYProfesor');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAyP } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM ArticuloYProfesor WHERE idAyP = ?', [idAyP]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = database_1.default.query("INSERT INTO ArticuloYProfesor set ?", [req.body]);
            res.json(resp);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAyP } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE ArticuloYProfesor set ? WHERE idAyP= ?", [req.body, idAyP]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idAyP } = req.params;
            const resp = yield database_1.default.query("DELETE FROM ArticuloYProfesor WHERE idAyP= ${idAyP}");
            res.json(resp);
        });
    }
    ProfesoresArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idArticulo } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("SELECT nombresP FROM Profesores WHERE idArticulo=?", [req.body, idArticulo]);
            res.json(resp);
        });
    }
    listByFirstAutor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            const respuesta = yield database_1.default.query("SELECT P.nombreApa, P.idInstituto, A.* FROM profesores P JOIN articuloyprofesor AyP ON P.idProfesor = AyP.idProfesor JOIN articulo A ON A.idArticulo = AyP.idArticulo WHERE AyP.pos = 1 AND ? = P.idInstituto", [idInstituto]);
            res.json(respuesta);
        });
    }
}
exports.articuloyprofesorController = new ArticuloYProfesorController();
