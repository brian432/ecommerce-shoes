import { FC } from "react"
import { Card } from "../../components/card/card";
import { useFavs } from '../../hooks/useFavs';
import { useProducts } from "../../hooks/useProducts";
import './favs.css';

export const Favs: FC = () => {
    const products = useProducts();
    const favsProductsIDs = useFavs();
    const productsFavs = products.filter(product => favsProductsIDs.includes(product.id));
    return (
        <div className="favs-container">
            <h1>{productsFavs?.length === 1 ? "Tu producto favorito" : productsFavs?.length > 0 ? "Tus productos favoritos" : "Aún no tienes favoritos"}</h1>
            <div className="favs-wrapper ">
                {
                    productsFavs?.map(product => <Card key={product.id} {...product} />)
                }
            </div>
        </div>
    )
}