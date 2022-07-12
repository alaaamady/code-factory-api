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
exports.makeInstructorStore = void 0;
const database_1 = __importDefault(require("../database"));
function index() {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const result = yield connection.query("SELECT * FROM instructor");
        connection.release();
        return result.rows;
    });
}
function add(instructor) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const result = yield connection.query("INSERT INTO instructor (id, email, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *;", [instructor.id, instructor.email, instructor.first_name, instructor.last_name]);
        connection.release();
        return result.rows[0];
    });
}
function get(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        const result = yield connection.query("SELECT * FROM instructor WHERE id = $1", [id]);
        connection.release();
        if (result.rowCount === 0)
            throw new Error("Instructor not found");
        return result.rows[0];
    });
}
function makeInstructorStore() {
    return {
        index,
        add,
        get,
    };
}
exports.makeInstructorStore = makeInstructorStore;
//# sourceMappingURL=instructor.js.map