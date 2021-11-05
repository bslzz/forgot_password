"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const emailVerificationRoute_1 = __importDefault(require("./routes/emailVerificationRoute"));
const forgotPasswordEmailRoute_1 = __importDefault(require("./routes/forgotPasswordEmailRoute"));
const customerRoute_1 = __importDefault(require("./routes/customerRoute"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = express_1.default();
// middleware
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
// connect db
db_1.default();
// routes
app.use('/users', userRoute_1.default);
app.use('/', emailVerificationRoute_1.default);
app.use('/', forgotPasswordEmailRoute_1.default);
app.use('/customer', customerRoute_1.default);
// errorhandler middleware
app.use((err, req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
app.use(errorHandler_1.errorHandler);
// initiate server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
