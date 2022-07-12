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
exports.authRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../services/auth");
exports.authRouter = (0, express_1.Router)();
const authService = (0, auth_1.makeAuthService)();
exports.authRouter.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const userInfo = yield authService.createAccount(params.username, params.first_name, params.last_name, params.email, params.password, params.age, params.gender, params.country, params.role);
        res.json(userInfo);
    }
    catch (e) {
        res.status(404).send("Failed to create an account");
    }
}));
exports.authRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.body;
        const userInfo = yield authService.login(params.username, params.password);
        res.json(userInfo);
    }
    catch (e) {
        res.status(404).send("Failed to login");
    }
}));
//# sourceMappingURL=auth.js.map