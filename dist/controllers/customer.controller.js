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
exports.getAllCustomersController = exports.createNewCustomerController = void 0;
const customerSchema_1 = __importDefault(require("../models/customerSchema"));
const createNewCustomerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const newCustomer = new customerSchema_1.default({ name });
        yield newCustomer.save();
        res.status(200).json({
            message: 'Customer created successfully',
            data: newCustomer
        });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createNewCustomerController = createNewCustomerController;
const getAllCustomersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCustomers = yield customerSchema_1.default.find();
        res.status(200).json({ data: allCustomers });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllCustomersController = getAllCustomersController;
