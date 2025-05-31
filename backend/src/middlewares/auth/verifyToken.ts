import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { SimpleResponse } from '../../types/requests';

export const verifyToken = (
  req: Request,
  res: Response<SimpleResponse>,
  next: NextFunction
): void => {
  try {
    // 1. Get token from headers (format: "Bearer TOKEN")
    const token = req.headers.authorization?.split(' ')[1];

    // 2. If no token → 401 Unauthorized
    if (!token) {
      res.status(401).json({ 
        success: false,
        error: 'Accès refusé. Token manquant.' 
      });
      return;
    }

    // 3. Verify token with secret key (stored in .env)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
    
    // 4. If OK, add user ID to the request (for subsequent routes)
    req.userId = decoded.userId;
    next(); // Proceed to next middleware/route
  } catch (err) {
    res.status(403).json({ 
      success: false,
      error: 'Token invalide.' 
    });
  }
};

export default verifyToken;
