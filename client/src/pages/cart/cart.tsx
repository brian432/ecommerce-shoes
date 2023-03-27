import { FC, useRef } from "react";
import { Link } from "react-router-dom";
import { useCarts } from '../../hooks/useCarts';
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { delCartCard, updateCartCard } from "../../services/cartFetch";
import { createStripeCard } from '../../services/stripeFetch';
import StripeCheckout, { Token } from "react-stripe-checkout";
import { useStripe } from '../../hooks/useStripe';
import { Loader } from '../../components/loader/loader';
import './cart.css';
import { scrollUp } from "../../utils/scrollUp";

const { IMG_URL } = process.env;
const { STRIPE } = process.env;

export const Cart: FC = () => {
    const { cards, total } = useCarts();
    const dispatch = useAppDispatch();
    const loading = useStripe();

    const totalCartRef = useRef<HTMLDivElement>(null);
    const handleScrollToTotalCart = () => {
        totalCartRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleUpdateCartCard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, quantity: number, price: number, id: string | undefined) => {
        const button: HTMLButtonElement = e.currentTarget;

        if (button.id === "-" && quantity > 1) dispatch(updateCartCard({ quantity: quantity - 1, price: price - price / quantity, id }));
        else if (button.id === "+") dispatch(updateCartCard({ quantity: quantity + 1, price: price + price / quantity, id }));
    };

    const handleDeleteCartCard = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string | undefined) => {
        dispatch(delCartCard(id))
    };

    const handleToken = (token: Token) => {
        dispatch(createStripeCard({ tokenId: token.id, amount: total * 100, cards }))
    };

    const billingAddress = {
        name: 'John Doe',
        line1: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        country: 'US',
        postal_code: '12345',
        phone: '555-555-5555',
        email: 'johndoe@example.com',
        number: '4242424242424242', // Número de tarjeta de prueba
        cvc: '123',
        exp_month: '01',
        exp_year: '2024',
      };

    return (
        <div className="cart-container">
            {
                loading
                    ? <Loader />
                    : <>
                        <h1>{total >= 1 ? "Tu Carrito" : "Su carrito está vacío"}</h1>
                        <div className="buttons">
                            <Link to="/" className="clickActive ">Continúe comprando</Link>
                            <button className="button-checkout clickActive " onClick={handleScrollToTotalCart}>Termine su compra</button>
                        </div>
                        <div className="products-cart">
                            {
                                cards?.map(({ title, color, size, quantity, price, id, productId, img }) =>
                                    <div className="product" key={id}>
                                        <Link to={`/product/${productId}`} className="productWrapper">
                                            <div className="div-img">
                                                <img src={`${IMG_URL}${img}`} alt={title} />
                                            </div>
                                            <div className="detailsWrapper">
                                                <h3>Product: {title}</h3>
                                                <h3>ID: {id}</h3>
                                                <h3>Color: <span style={{ backgroundColor: color }} /></h3>
                                                <h3>Talle: {size}</h3>
                                            </div>
                                        </Link>
                                        <div className="price">
                                            <span onClick={e => handleDeleteCartCard(e, id)} className="material-symbols-outlined clickActive">
                                                delete
                                            </span>
                                            <div className="quantity">
                                                <button id="-" className="clickActive" onClick={e => handleUpdateCartCard(e, quantity, price, id)}> - </button>
                                                <div>{quantity}</div>
                                                <button id="+" className="clickActive" onClick={e => handleUpdateCartCard(e, quantity, price, id)}> + </button>
                                            </div>
                                            <h2>${price}</h2>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="totalCart" ref={totalCartRef}>
                            <h1>Resumen del pedido</h1>
                            <h3>Subtotal: <span>${total}</span></h3>
                            <h3>Envío: <span>$0</span></h3>
                            <h3>Descuento: <span>$-0</span></h3>
                            <h2><strong>Total:</strong> <span>${total}</span></h2>
                            {
                                total >= 1 &&
                                <StripeCheckout
                                    stripeKey={STRIPE}
                                    token={handleToken}
                                    amount={total * 100}
                                    billingAddress
                                    shippingAddress
                                    name="Nro. Trg. de prueba."
                                    description={`'4242 4242 4242 4242' CVV: 123`}
                                    currency="USD"
                                    ComponentClass="div"
                                    label="Realizar pago"
                                />
                            }
                        </div>
                    </>
            }
        </div>
    )
};