"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const emailVerification_1 = __importDefault(require("./routes/emailVerification"));
const forgotPasswordEmail_1 = __importDefault(require("./routes/forgotPasswordEmail"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = express_1.default();
// middleware
app.use(express_1.default.json());
// connect db
db_1.default();
// routes
app.use('/users', userRoute_1.default);
app.use('/', emailVerification_1.default);
app.use('/', forgotPasswordEmail_1.default);
// errorhandler middleware
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
app.use(errorHandler_1.errorHandler);
// initiate server
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
