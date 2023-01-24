import { useEffect } from "react"
import { getAllFavsCards } from "../services/favsFetch";
import { useAppDispatch, useAppSelector } from './useTypedSelector';

export const useFavs = () => {
    const { favsProducts } = useAppSelector(state => state.favs);
    const favsProductsIds = favsProducts.map(product => product.productId);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllFavsCards())
    }, [])
    return favsProductsIds;
};