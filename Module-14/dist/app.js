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
    // console.log(first);
    res.send('Welcome to Todos Express');
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).json({ message: "Sorry can't find that!" });
});
// error middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});
exports.default = app;
