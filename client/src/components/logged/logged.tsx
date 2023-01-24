import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypedSelector";
type Props = {
    children: JSX.Element
}

export const Logged: FC<Props> = ({ children }) => {
    const { isLoggedIn } = useAppSelector(state => state.login);
    if (isLoggedIn) {
        return <Navigate to="/" replace={true} />
    }
    return children
}