import type { Request, Response, NextFunction } from 'express';
import type { SimpleResponse } from '../../types/requests';
export declare const verifyToken: (req: Request, res: Response<SimpleResponse>, next: NextFunction) => void;
export default verifyToken;
