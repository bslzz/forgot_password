"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forgotPasswordEmail_1 = require("../controllers/forgotPasswordEmail");
const userValidation_1 = require("../validation/usersValidation/userValidation");
const router = express_1.default.Router();
router
    .route('/forgot_password_verification')
    .post(userValidation_1.sendForgotPasswordEmailValidation, forgotPasswordEmail_1.sendForgotPasswordEmail);
router
    .route('/verify_password')
    .post(userValidation_1.verifyNewPasswordValidation, forgotPasswordEmail_1.verifyNewPassword);
exports.default = router;
