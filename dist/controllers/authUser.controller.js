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
exports.logOutUser = exports.signInUser = exports.signUpUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const emailExists = yield userSchema_1.default.findOne({ email });
        if (emailExists) {
            return next(http_errors_1.default(422, 'Email already exists'));
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new userSchema_1.default({
            name,
            email,
            password: hashedPassword
        });
        yield user.save();
        res.status(200).json({ message: 'new user registered' });
    }
    catch (error) {
        return next(http_errors_1.default(500, error.message));
    }
});
exports.signUpUser = signUpUser;
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            return next(http_errors_1.default(404, 'User Not Found'));
        }
        if (!user.isVerified) {
            return next(http_errors_1.default(406, 'User Not Verified'));
        }
        const matchPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!matchPassword) {
            return next(http_errors_1.default(401, 'Invalid email/password'));
        }
        const token = jsonwebtoken_1.default.sign({ name: user.name, email: user.email, userId: user._id }, process.env.JWT_KEY, { expiresIn: '7d' });
        res.cookie('jwt', token, {
            httpOnly: true
        });
        res.status(200).json({ token, name: user.name });
    }
    catch (error) {
        return next(http_errors_1.default(500, error.message));
    }
});
exports.signInUser = signInUser;
const logOutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logged out' });
    }
    catch (error) {
        return next(http_errors_1.default(500, error.message));
    }
});
exports.logOutUser = logOutUser;
