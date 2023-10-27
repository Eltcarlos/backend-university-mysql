const express = require("express");
const students = require("./students")
const aulas = require("./aulas")
const programas = require("./programas")
const profesores = require("./profesores")
const matriculas = require("./matriculas")
const asignaturas = require("./asignaturas")
const horarios = require("./horarios")
const grupos = require("./grupos")
const html = require("./html")

// Route Main
const routerMain = express.Router();

// Route Children
routerMain.use("/api/v1/students", students);
routerMain.use("/api/v1/aulas", aulas );
routerMain.use("/api/v1/programas", programas);
routerMain.use("/api/v1/profesores", profesores );
routerMain.use("/api/v1/matriculas", matriculas)
routerMain.use("/api/v1/asignaturas", asignaturas)
routerMain.use("/api/v1/horarios", horarios )
routerMain.use("/api/v1/grupos", grupos)
routerMain.use("/html", html)

module.exports = routerMain;