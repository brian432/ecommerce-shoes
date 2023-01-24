import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from './useTypedSelector';
import { useNavigate } from "react-router-dom";
import { swalFalse } from '../utils/swal';
import { errorSwitch } from '../store/loginSlice';
import { getCartCards } from "../services/cartFetch";

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const { isLoggedIn, error } = useAppSelector(state => state.login);
    const navigate = useNavigate();

    const failure: string = 'Usuario y/o contraseña invalida';
    const textFailure: string = 'Por favor, ingrese un usuario y/o contraseña validos';
    useEffect(() => {
        if (error) {
            swalFalse(failure, textFailure);
            dispatch(errorSwitch());
        }
        else if (isLoggedIn) {
            getCartCards();
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, error]);
};