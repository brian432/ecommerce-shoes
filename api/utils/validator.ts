import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';
import { Validation } from '../src/types';

export const arrayValidation = (args: Validation): Array<ValidationChain> => {
    return [...args].map(prop => {
        if (prop === 'price') {
            return body(prop)
                .exists().withMessage('required field')
                .notEmpty().withMessage('should not be empty')
                .isNumeric().withMessage('must contain a number')
        }
        else if (prop === "email") {
            return body(prop)
                .exists().withMessage('required field')
                .notEmpty().withMessage('should not be empty')
                .isString().withMessage('must contain a string')
                .isEmail().withMessage('requires a valid email')
        } else if (prop === "color" || prop === "size" || prop === "img") {
            return body(prop)
                .exists().withMessage('required field')
                .notEmpty().withMessage('should not be empty')
                .isArray().withMessage('must contain a array')
                .isLength({ min: 2 }).withMessage('must be at least 2 chars long')
        } else if (prop === "inStock") {
            return body(prop)
                .exists().withMessage('required field')
                .notEmpty().withMessage('should not be empty')
                .isBoolean().withMessage('boolean required')
        }
        else {
            return body(prop)
                .exists().withMessage('required field')
                .notEmpty().withMessage('should not be empty')
                .isString().withMessage('must contain a string')
                .isLength({ min: 3 }).withMessage('must be at least 3 chars long')
        }
    }
    )
};

export const validateProps = (array: Validation): Array<any> => {
    return [
        arrayValidation(array),
        (req: Request, res: Response, next: NextFunction) => {
            if (Object.keys(req.body).length > array.length) {
                throw new Error("extra fields not permited");
            }
            try {
                validationResult(req).throw() //
                return (next())
            } catch (err: any) {
                return res.status(400).send({
                    status_code: 400,
                    error: err.mapped()
                })
            }
        }
    ]
};


const arrayRegisterProperties: Validation = ['username', 'email', 'password'];
const arrayLoginProperties: Validation = ['username', 'password'];
const arrayProductProperties: Validation = ['title', 'desc', 'category', 'img', 'size', 'color', 'price', 'inStock'];

export const validateRegister = validateProps(arrayRegisterProperties);
export const validateLogin = validateProps(arrayLoginProperties);
export const validateProduct = validateProps(arrayProductProperties);