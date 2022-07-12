"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const auth_1 = require("../services/auth");
const authService = (0, auth_1.makeAuthService)();
function authMiddleware(req, res, next) {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            throw new Error();
        const { id, username } = authService.verify(token);
        res.locals.user = { id, username };
        next();
    }
    catch (e) {
        res.status(401).send("Unauthorized");
    }
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map