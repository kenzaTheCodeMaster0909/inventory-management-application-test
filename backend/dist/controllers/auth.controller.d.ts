import type { Response } from 'express';
import type { RegisterRequest, LoginRequest, AuthResponse } from '../types/requests';
export declare const register: (req: RegisterRequest, res: Response<AuthResponse>) => Promise<void>;
export declare const login: (req: LoginRequest, res: Response<AuthResponse>) => Promise<void>;
