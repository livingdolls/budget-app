"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const Auth_route_1 = __importDefault(require("./Routes/Auth.route"));
const MainBudget_route_1 = __importDefault(require("./Routes/MainBudget.route"));
const Income_route_1 = __importDefault(require("./Routes/Income.route"));
const ExpensePlan_route_1 = __importDefault(require("./Routes/ExpensePlan.route"));
const Expense_route_1 = __importDefault(require("./Routes/Expense.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// Dependen
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
app.use((0, cookie_parser_1.default)());
// Route
app.use("/api/v1/auth", Auth_route_1.default);
app.use("/api/v1/mainBudget", MainBudget_route_1.default);
app.use("/api/v1/income", Income_route_1.default);
app.use("/api/v1/expense-plan", ExpensePlan_route_1.default);
app.use("/api/v1/expense", Expense_route_1.default);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Ada sesuatu yang salah!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
const Port = process.env.APP_PORT || 3001;
app.listen(Port, () => {
    console.log("Connect to backend port = ", Port);
});
