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
exports.profesoresController = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class ProfesoresController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM Profesores');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM Profesores WHERE idProfesor = ?', [idProfesor]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Profesor no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = req.body.password;
            var salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.compare('prueba', "xyz", (err, res) => {
                console.log('Compared result', res);
            });
            bcryptjs_1.default.hash(password, salt).then(function (nuevoPassword) {
                req.body.password = nuevoPassword;
                const resp = database_1.default.query("INSERT INTO Profesores set ?", [req.body]);
                res.json(resp);
            });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE Profesores set ? WHERE idProfesor= ?", [req.body, idProfesor]);
            res.json(resp);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM Profesores WHERE idProfesor= ${idProfesor}`);
            res.json(resp);
        });
    }
    existe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("existe");
            const { correoProfesor } = req.params;
            let password = req.body.password;
            let token;
            let consulta = "SELECT idProfesor,password FROM Profesores WHERE correoProfesor = '" + correoProfesor + "'";
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            if (respuesta.length > 0) {
                bcryptjs_1.default.compare(password, respuesta[0].password, (err, resEncriptar) => {
                    if (resEncriptar == true) {
                        token = jsonwebtoken_1.default.sign(correoProfesor, process.env.TOKEN_SECRET || 'prueba');
                        console.log(token);
                        res.json({ 'token': token, 'idProfesor': respuesta[0].idProfesor });
                    }
                    else
                        res.json(-1);
                    return;
                });
            }
            else
                res.json(-1);
        });
    }
    listAutorByArticulo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("listAutorByArticulo")
            const { idArticulo } = req.params;
            let consulta = 'SELECT P.nombresP, P.idProfesor, P.apellidoP, P.apellidoM, P.nombreApa FROM Profesores P INNER JOIN ArticuloYProfesor AYP ON AYP.idProfesor=P.idProfesor WHERE idArticulo = ' + idArticulo;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    cambiarContrasena(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProfesor } = req.params;
            let password = req.body.password;
            var salt = bcryptjs_1.default.genSaltSync(10);
            bcryptjs_1.default.hash(req.body.password, salt).then(function (nuevoPassword) {
                req.body.password = nuevoPassword;
                const resp = database_1.default.query('UPDATE profesores set ? WHERE idProfesor = ?', [req.body, idProfesor]);
                res.json(resp);
            });
        });
    }
    listProfesoresByCarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            let consulta = 'SELECT * FROM Profesores WHERE idCarrera =' + idCarrera;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    listProfesoresByInstituto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idInstituto } = req.params;
            let consulta = 'SELECT * FROM Profesores WHERE idInstituto = ' + idInstituto;
            const respuesta = yield database_1.default.query(consulta);
            res.json(respuesta);
        });
    }
    constructor() {
        dotenv_1.default.config();
        console.log(process.env.TOKEN_SECRET);
    }
}
exports.profesoresController = new ProfesoresController();
