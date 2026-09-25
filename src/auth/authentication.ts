import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export interface AuthenticatedUser extends Request {
    userId: string
}

export const authentication = (req: AuthenticatedUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (!token) {
        res.status(401).json({ message: 'Unauthorized. No token provided.' })
        return
    }

    try {
        const decoded = jwt.verify(token, "qwerty123") as { userId: string }
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(403).json({
            message: 'Forbidden - Invalid or expired token',
        });
        return;
    }
}