import type { User } from "../interfaces/User";
export declare const createUser: (username: string, email: string, password: string) => Promise<User>;
export declare const findUserByEmail: (email: string) => Promise<User | null>;
