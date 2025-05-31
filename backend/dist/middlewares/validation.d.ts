import type { Request, Response, NextFunction } from 'express';
import type { SimpleResponse } from '../types/requests';
export declare const validateRegister: (req: Request, res: Response<SimpleResponse>, next: NextFunction) => void;
declare const _default: {
    validateRegister: (req: Request, res: Response<SimpleResponse>, next: NextFunction) => void;
};
export default _default;
