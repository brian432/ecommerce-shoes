import { useEffect } from "react"
import { useAppSelector } from './useTypedSelector';
import { useNavigate } from "react-router-dom";

export const useStripe = () => {
    const { cards } = useAppSelector(state => state.stripe);
    const navigate = useNavigate();
    const { loading } = useAppSelector(state => state.stripe);

    useEffect(() => {
        cards.length && navigate("/success");
    }, [cards])

    return loading
};