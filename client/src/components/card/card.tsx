import { FC, MouseEventHandler, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { createFavCard, delFavCard } from "../../services/favsFetch";
import { ProductsTypes } from "../../types/types";
import './card.css';
const { IMG_URL } = process.env;

export const Card: FC<ProductsTypes> = ({
    id,
    productId,
    title,
    color,
    price,
    img
}) => {
    const dispatch = useAppDispatch();
    const { favsProducts } = useAppSelector(state => state.favs);
    const favsActive = favsProducts?.find(product => { return product.productId === id });
    const { isLoggedIn } = useAppSelector(state => state.login);
    const [changeFav, setChangeFav] = useState<boolean>(!!favsActive);

    const addOrRemoveFavs: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        const idFav: string | undefined = id;
        if (!favsActive) {
            setChangeFav(true);
            dispatch(createFavCard({ title, img, color, price, idFav }));}
        else {
            setChangeFav(false);
            dispatch(delFavCard(favsActive.id));
        }
    }, [favsActive])

    return (
        <div className="card-container" style={{ backgroundColor: color[0] + "50" }}>
            {
                isLoggedIn && <button className={changeFav ? 'fav-active favourite-btn ' : 'favourite-btn '} onClick={addOrRemoveFavs}>
                    <span className="material-symbols-outlined">
                        favorite
                    </span>
                </button>
            }
            <Link to={`/product/${id}`}>
                <div className="div-img" >
                    <img src={`${IMG_URL}${img[0][0]}`} alt={title} />
                </div>
                <div className="product-card-details ">
                    <div className="circle-color" style={{ backgroundColor: color[0] }}></div>
                    <h1>{title}</h1>
                    <div className="colors">
                        <h3>Colores:</h3>
                        {color.map((color: string) =>
                            <span
                                key={color}
                                style={{
                                    background: color
                                }}
                            />
                        )}
                    </div>
                    <h2><strong>${price}</strong></h2>
                </div>
            </Link>
        </div>
    )
};