import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { loginSwitch } from "../../store/loginSlice";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { MyFunctionType } from "../../types/types";
import { quantitySwitch } from "../../store/cartSlice";

type Props = {
    handleMenus: () => void
    isLoggedIn: Boolean
};

const HeaderLinks: FC<Props> = ({ handleMenus, isLoggedIn }) => {
    const dispatch = useAppDispatch();

    const handleLogout: MyFunctionType = () => {
        dispatch(loginSwitch());
        dispatch(quantitySwitch());
    };
    return (
        <>
            <Link to={isLoggedIn ? "/orders" : "/login"} onClick={handleMenus}>
                <span className="material-symbols-outlined">
                    {isLoggedIn ? "format_list_bulleted" : "login"}
                </span>{isLoggedIn ? "Mis compras" : "Inciar Sesión"}
            </Link>
            <Link to={isLoggedIn ? "/" : "/register"} onClick={() => { handleMenus(); isLoggedIn && handleLogout() }}>
                <span className="material-symbols-outlined">
                    {isLoggedIn ? "logout" : "app_registration"}
                </span>{isLoggedIn ? "Cerrar Sesión" : "Registrarse"}
            </Link>
        </>
    )
};
export default React.memo(HeaderLinks)