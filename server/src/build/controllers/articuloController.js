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
exports.articuloController = void 0;
const database_1 = __importDefault(require("../database"));
class ArticuloController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("list");
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listOne");
            const { idArticulo } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo WHERE idArticulo = ?', [idArticulo]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Articulo no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query("INSERT INTO Articulo set ?", [req.body]);
            //Sacamos el id del articulo creado con el await
            let dato = {
                'idProfesor': idProfesor,
                'idArticulo': resp.insertId,
                'pos': 1,
                'valido': 'Si'
            };
            const respArticulo = yield database_1.default.query("INSERT INTO ArticuloYProfesor set ?", [dato]);
            res.json(respArticulo);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("actualizar");
            const { idArticulo } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Articulo set ? WHERE idArticulo= ?", [req.body, idArticulo]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("eliminar");
            const { idArticulo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Articulo WHERE idArticulo= ${idArticulo}`);
            res.json(resp);
        });
    }
    articulosByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("articulosByCarrera");
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query("SELECT nombre FROM Articulo WHERE idCarrera=?", [req.body, idCarrera]);
            res.json(resp);
        });
    }
    listByProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("listByProfesor");
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo A INNER JOIN ArticuloYProfesor AYP ON AYP.idArticulo=A.idArticulo WHERE idProfesor = ?', [idProfesor]);
            res.json(respuesta);
        });
    }
    listByPeriodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ini, fin } = req.params;
            console.log("listByPeriodo");
            let consulta = `SELECT * FROM Articulo WHERE fechaEdicion>='${ini}' AND fechaEdicion<='${fin}'`;
            console.log(consulta);
            const respuesta = yield database_1.default.query('SELECT * FROM Articulo WHERE fechaEdicion>=? AND fechaEdicion<=?', [ini, fin]);
            res.json(respuesta);
        });
    }
    getArticulosByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            let respuesta = yield database_1.default.query('SELECT * FROM Articulo as A INNER JOIN ArticuloYProfesor AP ON AP.idArticulo=A.idArticulo INNER JOIN Profesores P ON P.idProfesor=AP.idProfesor WHERE P.idInstituto=?', idInstituto);
            // Obtener los profesores participantes
            for (let i = 0; i < respuesta.length; i++) {
                const respuesta2 = yield database_1.default.query('SELECT * FROM Profesores as P INNER JOIN ArticuloYProfesor AP ON AP.idProfesor=P.idProfesor WHERE AP.idArticulo=?', respuesta[i].idArticulo);
                respuesta[i].profesores = respuesta2;
            }
            res.json(respuesta);
        });
    }
}
exports.articuloController = new ArticuloController();
