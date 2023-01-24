import { useEffect } from 'react';
import { getCartCards } from '../services/cartFetch';
import { useAppDispatch, useAppSelector } from './useTypedSelector';

export const useCarts = () => {
    const { cards, total } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCartCards())
    }, []);

    return { cards, total}
};