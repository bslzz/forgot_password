"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailVerification_1 = require("../controllers/emailVerification");
const userValidation_1 = require("../validation/usersValidation/userValidation");
const router = express_1.default.Router();
router
    .route('/send_verification_email')
    .post(userValidation_1.sendVerificationEmailValidation, emailVerification_1.sendVerificationEmail);
router.route('/verify_email').post(userValidation_1.verifyUserEmailValidation, emailVerification_1.verifyUserEmail);
exports.default = router;
