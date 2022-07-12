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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.studentRouter = (0, express_1.Router)();
const studentStore = (0, models_1.makeStudentStore)();
exports.studentRouter.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentStore.index();
        res.json(students);
    }
    catch (e) {
        res.status(404).send("Failed to fetch students");
    }
}));
exports.studentRouter.get("/:studentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentStore.get(Number(req.params.studentId));
        res.json(student);
    }
    catch (e) {
        res.status(401).send("Failed to load student");
    }
}));
//# sourceMappingURL=student.js.map