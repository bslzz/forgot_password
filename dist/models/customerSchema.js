"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: 'string',
        required: true
    }
});
const Customer = (0, mongoose_1.model)('Customer', userSchema);
exports.default = Customer;
