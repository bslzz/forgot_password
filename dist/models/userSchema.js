"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true
    },
    isVerified: {
        type: 'boolean',
        default: false
    },
    verifyToken: {
        type: 'string'
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
