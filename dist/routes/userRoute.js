"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signUpUser_controller_1 = require("../controllers/signUpUser.controller");
const userValidation_1 = require("../validation/usersValidation/userValidation");
const router = express_1.default.Router();
router.route('/signup').post(userValidation_1.signUpUserValidation, signUpUser_controller_1.signUpUser);
router.route('/login').post(userValidation_1.signInUserValidation, signUpUser_controller_1.signInUser);
exports.default = router;
