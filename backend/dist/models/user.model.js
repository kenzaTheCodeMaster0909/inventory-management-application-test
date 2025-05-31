"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
const createUser = async (username, email, password) => {
    const result = await db_1.default.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, password]);
    return result.rows[0];
};
exports.createUser = createUser;
const findUserByEmail = async (email) => {
    const result = await db_1.default.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=user.model.js.map