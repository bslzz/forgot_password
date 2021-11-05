"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("../controllers/customer.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// auth has access to the user so it passes the req.user to createNewCustomerController. Hence createNewCustomerController can get access to the user
router.route('/').post(auth_1.auth, customer_controller_1.createNewCustomerController);
router.route('/all').get(auth_1.auth, customer_controller_1.getAllCustomersController);
exports.default = router;
