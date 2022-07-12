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
exports.makeUserStore = void 0;
const database_1 = __importDefault(require("../database"));
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const result = yield connection.query('SELECT * FROM "users" WHERE username = $1', [username]);
        connection.release();
        if (result.rowCount === 0) {
            throw new Error("Cant find user");
        }
        return result.rows[0];
    });
}
function createUser(username, first_name, last_name, email, password, age, gender, country) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const result = yield connection.query('INSERT INTO "users" (username,first_name,last_name,email,password,age,gender,country) VALUES ($1, $2, $3, $4, $5, $6, $7 , $8) RETURNING *', [username, first_name, last_name, email, password, age, gender, country]);
        connection.release();
        return result.rows[0];
    });
}
function makeUserStore() {
    return {
        getUser,
        createUser,
    };
}
exports.makeUserStore = makeUserStore;
//# sourceMappingURL=user.js.map