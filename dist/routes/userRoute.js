"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authUser_controller_1 = require("../controllers/authUser.controller");
const userValidation_1 = require("../validation/usersValidation/userValidation");
const router = express_1.default.Router();
router.route('/signup').post(userValidation_1.signUpUserValidation, authUser_controller_1.signUpUser);
router.route('/login').post(userValidation_1.signInUserValidation, authUser_controller_1.signInUser);
router.route('/logout').get(authUser_controller_1.logOutUser);
exports.default = router;
