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
exports.courseRouter = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.courseRouter = (0, express_1.Router)();
const courseStore = (0, models_1.makeCourseStore)();
exports.courseRouter.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseStore.index();
        res.json(courses);
    }
    catch (error) {
        res.status(404).send("Failed to load courses");
    }
}));
exports.courseRouter.get("/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseStore.get(Number(req.params.courseId));
        res.json(courses);
    }
    catch (error) {
        res.status(404).send("Failed to load course");
    }
}));
//# sourceMappingURL=course.js.map