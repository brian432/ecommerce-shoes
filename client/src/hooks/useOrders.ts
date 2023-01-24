import { useEffect } from "react";
import { getAllOrdersCards } from "../services/orderFetch";
import { useAppDispatch, useAppSelector } from './useTypedSelector';

export const useOrders = () => {
    const { orders } = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllOrdersCards());
    }, []);

    return orders;
};