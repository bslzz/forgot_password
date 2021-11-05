"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userSchema = {
    signUpUser: joi_1.default.object({
        name: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    }),
    signInUser: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    }),
    sendVerificationEmail: joi_1.default.object({
        email: joi_1.default.string().email().required()
    }),
    verifyUserEmail: joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    }),
    sendForgotPasswordEmail: joi_1.default.object({
        email: joi_1.default.string().email().required()
    }),
    verifyNewPassword: joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    })
};
