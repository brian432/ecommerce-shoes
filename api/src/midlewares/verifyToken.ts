import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { RequestExtend } from '../types';
const { SECRET } = process.env;

type FuncNext = () => void;

export const verifyToken = (req: RequestExtend, res: Response, next: FuncNext) => {  
    const { headers: { authorization } } = req;
    if (authorization && (authorization as string).toLowerCase().startsWith('bearer ')) {
        const token = (authorization as string).substring(7);
        jwt.verify(token, SECRET as string, (err, user): any => {
            if (err) {                                         
                res.status(403).json({
                    status_code: 403,
                    error: "Token missing or invalid!"
                });
            };

            req.user = user;
            next();                                        
        });
    } else {                                     
        res.status(401).json({
            status_code: 401,
            error: "You are not authenticated!"
        })
    };
};

export const verifyTokenAndAuthorization = (req: RequestExtend, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) { 
            next()
        } else {
            res.status(403).json({
                status_code: 403,
                error: "You are not alowed!"
            });
        };
    });
};

export const verifyTokenAndAdmin = (req: RequestExtend, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) { 
            next()
        } else {
            res.status(403).json({
                status_code: 403,
                error: "You are not alowed!"
            });
        };
    });
};

