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
exports.verifyUserEmail = exports.sendVerificationEmail = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const sendVerificationEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield userSchema_1.default.findOne({ email });
        if (!user) {
            return next(http_errors_1.default(404, 'Invalid Email'));
        }
        if (user.isVerified) {
            return next(http_errors_1.default(406, 'User already verified'));
        }
        const hashedToken = yield bcryptjs_1.default.hash(user._id.toString(), 10);
        const jwtToken = yield jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: '60m' });
        let info = yield config_1.transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: email,
            subject: 'Email verification ✔',
            html: `Your verification link is <a href = "${process.env
                .FRONTEND_URL}/verify_email/${jwtToken}"> Link </a>` // html body
        });
        yield userSchema_1.default.updateOne({ $set: { verifyToken: hashedToken } });
        res.json({
            message: `Preview URL: %s ${nodemailer_1.default.getTestMessageUrl(info)}`
        });
    }
    catch (error) {
        return next(http_errors_1.default(500, error.message));
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const verifyUserEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        if (!decodedToken) {
            return next(http_errors_1.default(401, 'Unauthorized'));
        }
        const user = yield userSchema_1.default.findById(decodedToken.userId);
        if (!user) {
            return next(http_errors_1.default(401, 'Unauthorized'));
        }
        yield user.updateOne({
            $set: { isVerified: true },
            $unset: { verifyToken: 0 }
        });
        res.json({ message: 'Email verified' });
    }
    catch (error) {
        return next(http_errors_1.default(500, error.message));
    }
});
exports.verifyUserEmail = verifyUserEmail;
