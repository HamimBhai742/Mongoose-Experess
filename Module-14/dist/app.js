"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const todos_router_1 = require("./app/router/todos_router");
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/todos', todos_router_1.todosRouter);
app.get('/', (req, res) => {
    res.send('Welcome to Todos Express');
});
exports.default = app;
