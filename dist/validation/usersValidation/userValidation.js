"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNewPasswordValidation = exports.sendForgotPasswordEmailValidation = exports.verifyUserEmailValidation = exports.sendVerificationEmailValidation = exports.signInUserValidation = exports.signUpUserValidation = void 0;
const validator_1 = __importDefault(require("../utils/validator"));
const userSchema_1 = require("./userSchema");
const signUpUserValidation = (req, res, next) => {
    validator_1.default(userSchema_1.userSchema.signUpUser, req.body, next);
};
exports.signUpUserValidation = signUpUserValidation;
const signInUserValidation = (req, res, next) => {
    validator_1.default(userSchema_1.userSchema.signInUser, req.body, next);
};
exports.signInUserValidation = signInUserValidation;
const sendVerificationEmailValidation = (req, res, next) => {
    validator_1.default(userSchema_1.userSchema.sendVerificationEmail, req.body, next);
};
exports.sendVerificationEmailValidation = sendVerificationEmailValidation;
const verifyUserEmailValidation = (req, res, next) => {
    validator_1.default(userSchema_1.userSchema.verifyUserEmail, req.body, next);
};
exports.verifyUserEmailValidation = verifyUserEmailValidation;
const sendForgotPasswordEmailValidation = (req, res, next) => {
    validator_1.default(userSchema_1.userSchema.sendForgotPasswordEmail, req.body, next);
};
exports.sendForgotPasswordEmailValidation = sendForgotPasswordEmailValidation;
const verifyNewPasswordValidation = (req, res, next) => {
    validator_1.default(userSchema_1.userSchema.verifyNewPassword, req.body, next);
};
exports.verifyNewPasswordValidation = verifyNewPasswordValidation;
