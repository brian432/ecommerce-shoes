import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useScroll } from '../../hooks/useScroll';
import { useResize } from '../../hooks/useResize';
import './header.css';
import Logo from '../logo/logo';
import HeaderLinks from '../headerLinks/headerLinks';
import { MyFunctionType } from "../../types/types";
import { useAppSelector } from "../../hooks/useTypedSelector";

export const Header: FC = () => {
    const [menu, setMenu] = useState<string>("");
    const [userMenu, setUserMenu] = useState<string>("none");
    const { isLoggedIn } = useAppSelector(state => state.login);
    const { isPhone } = useResize();
    const scroll = useScroll();
    const { quantity } = useAppSelector(state => state.cart);

    const handleMenus: MyFunctionType = () => {
        handleMenu("desactive")
        handleUserMenu()
    };

    const handleMenu: (str: string) => void = useCallback((param: string) => {
        if (!param) menu === ""
            ? setMenu("activo")
            : setMenu("")
        else setMenu("")
    }, [menu]);

    const handleUserMenu: MyFunctionType = useCallback(() => {
        userMenu === "none" ? setUserMenu("flex") : setUserMenu("none");
    }, [userMenu]);

    return (
        <header className={scroll}>
            <Logo handleMenu={handleMenu} />
            <div className="headerRight">
                <div className="auth-header">
                    <section className={menu === "activo" ? "menu-active" : "menu-disable section-auth"}>
                        <Link to={isLoggedIn ? "/favs" : "/login"} className="icons" onClick={isPhone ? handleMenus : undefined}>
                            <span className="material-symbols-outlined">
                                favorite
                            </span>
                        </Link>
                        <Link to={isLoggedIn ? "/cart" : "/login"} className="icons" onClick={isPhone ? handleMenus : undefined}>
                            <span className="material-symbols-outlined">
                                shopping_cart
                            </span>
                            {Number(quantity) > 0 && <span className="quantity">{quantity}</span>}
                        </Link>
                        {
                            isPhone
                                ? <HeaderLinks handleMenus={handleMenus} isLoggedIn={isLoggedIn} />
                                : <div className="icons user-menu-wrapper">
                                    <span className="material-symbols-outlined" onClick={handleUserMenu}>
                                        manage_accounts
                                    </span>
                                    <div className="user-menu" style={{ display: userMenu }}>
                                        <HeaderLinks handleMenus={handleMenus} isLoggedIn={isLoggedIn} />
                                    </div>
                                </div>
                        }
                    </section>
                    <div id="hamburguesa" onClick={() => handleMenu("")}>
                        <div className={menu === "" ? "" : "linea1"}></div>
                        <div className={menu === "" ? "" : "linea2"}></div>
                        <div className={menu === "" ? "" : "linea3"}></div>
                    </div>
                </div>
            </div>

        </header >
    )
}