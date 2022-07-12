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
exports.makeAuthService = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userStore = (0, models_1.makeUserStore)();
const studentStore = (0, models_1.makeStudentStore)();
const instructorStore = (0, models_1.makeInstructorStore)();
const { TOKEN_SECRET: tokenSecret, BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds, } = process.env;
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tokenSecret || !pepper)
            throw new Error("Missing env variables");
        const storedUser = yield userStore.getUser(username);
        const storedUserHash = storedUser.password;
        const isValid = yield bcrypt_1.default.compare(password + pepper, storedUserHash);
        if (!isValid)
            throw new Error("Invalid login");
        const token = jsonwebtoken_1.default.sign({ id: storedUser.id, username: storedUser.username }, tokenSecret);
        return {
            id: storedUser.id,
            username: storedUser.username,
            token,
        };
    });
}
function createAccount(username, first_name, last_name, email, password, age, gender, country, role) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!saltRounds || !tokenSecret)
            throw new Error("Missing env variable");
        const hashedPassword = yield bcrypt_1.default.hash(password + pepper, Number(saltRounds));
        const createdUser = yield userStore.createUser(username, first_name, last_name, email, hashedPassword, age, gender, country);
        if (role === "Instructor") {
            yield instructorStore.add({
                id: createdUser.id,
                first_name: createdUser.first_name,
                last_name: createdUser.last_name,
                email: createdUser.email,
            });
        }
        else {
            yield studentStore.add({
                id: createdUser.id,
                first_name: createdUser.first_name,
                last_name: createdUser.last_name,
                email: createdUser.email,
                age: createdUser.age,
                gender: createdUser.gender,
                country: createdUser.country,
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: createdUser.id, username: createdUser.username }, tokenSecret);
        return {
            id: createdUser.id,
            username: createdUser.username,
            token,
        };
    });
}
function verify(token) {
    if (!tokenSecret)
        throw new Error("Missing env variables");
    return jsonwebtoken_1.default.verify(token, tokenSecret);
}
function makeAuthService() {
    return {
        login,
        createAccount,
        verify,
    };
}
exports.makeAuthService = makeAuthService;
//# sourceMappingURL=auth.js.map