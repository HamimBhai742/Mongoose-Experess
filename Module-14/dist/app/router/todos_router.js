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
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
const filePath = path_1.default.join(__dirname, '../../../db/todo.json');
exports.todosRouter = express_1.default.Router();
const db = mongodb_1.client.db('todosDB');
const todosCollection = db.collection('todos');
//create new todos
exports.todosRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const todo = {
        title: title,
        description: description,
        createAt: new Date().toLocaleString(),
        isCompleted: false,
    };
    const result = yield todosCollection.insertOne(todo);
    res.json({ message: 'success', result });
}));
//get all todos
exports.todosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield todosCollection.find({}).toArray();
    res.send(result);
}));
//get single todo by id
exports.todosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = { _id: new mongodb_2.ObjectId(id) };
    const result = yield todosCollection.findOne(query);
    res.send(result);
}));
//update todo by id
exports.todosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, isCompleted } = req.body;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updateDoc = {
        $set: {
            title,
            description,
            isCompleted
        },
    };
    const result = yield todosCollection.updateOne(filter, updateDoc);
    res.json({ message: 'Todos updated successfully', result });
}));
//todo delete
exports.todosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = { _id: new mongodb_2.ObjectId(id) };
    const result = yield todosCollection.deleteOne(query);
    res.json({ message: 'Todos deleted successfully', result });
}));
