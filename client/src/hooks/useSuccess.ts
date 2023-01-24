import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from './useTypedSelector';
import { useNavigate } from "react-router-dom";
import { createOrderCard } from '../services/orderFetch';
import { delAllCartCards } from "../services/cartFetch";
import { delStripeCard } from "../store/stripeSlice";

export const useSuccess = () => {
    const { data, cards } = useAppSelector(state => state.stripe);
    const { orderId } = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const products = cards?.map(({ title, productId, color, img, size, quantity, price }) => ({ title, productId, color, img, size, quantity, price }));
    const productsIds = cards?.map(({ id }) => id);

    useEffect(() => {
        if (products.length) {
            dispatch(delAllCartCards(productsIds));
            dispatch(delStripeCard());
            dispatch(createOrderCard({ products, amount: data.amount, address: data.billing_details?.address }));
        }
        else navigate('/', { replace: true })
    }, []);
    return orderId
};