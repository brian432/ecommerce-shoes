import { FC } from "react";
import { Link } from "react-router-dom";
import { useOrders } from '../../hooks/useOrders';
import { dateToString } from '../../utils/dateToString';
import { scrollUp } from "../../utils/scrollUp";
import './orders.css'

const { IMG_URL } = process.env;

export const Orders: FC = () => {
    const orders = useOrders();
    scrollUp();
    return (
        <div className="orders-container">
            <h1 className="orders-title">{orders?.length === 1 ? "Tu orden de compra" : orders?.length > 0 ? "Tus ordenes de compra" : "Aún no has realizado compras"}</h1>
            {
                orders?.map(({ id, createdAt, updatedAt, amount, address, products }) =>
                    <div className="order-wrapper" key={id}>
                        <h2>Detalles de compra</h2>
                        <p>Codigo de orden de compra: <strong>{id}</strong></p>
                        <p>Pais: <strong>{address.country}</strong></p>
                        <p>Ciudad: <strong>{address.city}</strong></p>
                        <p>Compra hecha el: <strong>{dateToString(createdAt)}</strong></p>
                        <p>Compra Actualizada el: <strong>{dateToString(updatedAt)}</strong></p>
                        <p>Precio: <strong>${amount / 100}</strong></p>
                        <div className="order-products">
                            <h3>{products.length > 1 ? "Productos comprados: " : "Producto comprado"}</h3>
                            <ul className="order-products-wrapper">
                                {
                                    products?.map(({ title, productId, _id, color, quantity, size, price, img }) =>
                                        <li key={_id}>
                                            <div className="order-products-details">
                                                <Link to={`/product/${productId}`} >{title}</Link>
                                                <p>Color: <span style={{ background: color }}></span></p>
                                                <p>Talle: <strong>{size}</strong></p>
                                                <p>Cantidad: <strong>{quantity}</strong></p>
                                                <p>Precio: <strong>${price}</strong></p>
                                            </div>
                                            <div className="order-div-img">
                                                <img  src={`${IMG_URL}${img}`} alt={title} />
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div >
    )
}