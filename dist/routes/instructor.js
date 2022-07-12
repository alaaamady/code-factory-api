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
exports.instructorRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.instructorRouter = (0, express_1.Router)();
const instructorStore = (0, models_1.makeInstructorStore)();
exports.instructorRouter.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instrucrors = yield instructorStore.index();
        res.json(instrucrors);
    }
    catch (e) {
        res.status(404).send("Failed to fetch instructors");
    }
}));
exports.instructorRouter.get("/:instructorId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructor = yield instructorStore.get(Number(req.params.instructorId));
        res.json(instructor);
    }
    catch (e) {
        res.status(401).send("Failed to load instructor");
    }
}));
//# sourceMappingURL=instructor.js.map