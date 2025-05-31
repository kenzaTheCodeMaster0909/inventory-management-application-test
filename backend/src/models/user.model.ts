import pool from "../config/db";
import type { User } from "../interfaces/User";

export const createUser = async (
	username: string,
	email: string,
	password: string,
): Promise<User> => {
	const result = await pool.query<User>(
		"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
		[username, email, password],
	);
	return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
	const result = await pool.query<User>(
		"SELECT * FROM users WHERE email = $1",
		[email],
	);
	return result.rows[0] || null;
};
