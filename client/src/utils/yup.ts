import * as yup from 'yup'
import { TypedSchema } from 'yup/lib/util/types';
const required = "* Campo requerido";

export const userSchema: yup.InferType<TypedSchema> = yup.object().shape({
    username: yup.string().min(3, "Ingrese mas de 2 caracteres").required(required),
    email: yup.string().email("Debe ser un email valido").required(required),
    password: yup.string().min(3, "Ingrese mas de 2 caracteres").required(required)
});

export const loginSchema: yup.InferType<TypedSchema> = yup.object().shape({
    username: yup.string().min(3, "Ingrese mas de 2 caracteres").required(required),
    password: yup.string().min(3, "Ingrese mas de 2 caracteres").required(required)
});