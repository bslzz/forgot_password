"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const verifiedUser = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.user = verifiedUser.userId;
        next();
    }
    catch (error) {
        return next(http_errors_1.default(401, error.message));
    }
};
exports.auth = auth;
