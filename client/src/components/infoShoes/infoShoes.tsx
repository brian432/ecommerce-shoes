import { FC, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createCartCard } from '../../services/cartFetch';
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { InfoShoesProps } from "../../types/types"
import './infoShoes.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const InfoShoes: FC<InfoShoesProps> = ({
    product: {
        title, price, size, id, desc
    },
    imgActive: {
        imgPaths,
        colorShoes
    }
}) => {
    const [quantity, setQuantity] = useState<number>(1);
    const [sizeSelected, setSizeSelected] = useState<string>("40");
    const { isLoggedIn } = useAppSelector(state => state.login);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleQuantity = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const button: HTMLButtonElement = e.currentTarget;

        if (button.id === "-" && quantity > 1) setQuantity(quantity - 1);
        else if (button.id === "+") setQuantity(quantity + 1);
    };

    const handleCart = () => {
        if (isLoggedIn) {
            toast.success("Añadido al carrito")
            dispatch(createCartCard({ title, price: price * quantity, size: sizeSelected, productId: id, img: imgPaths[0], color: colorShoes, quantity }));
        }
        else navigate('/login')
    };

    const handleSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSizeSelected(e.currentTarget.value)
    };

    return (
        <div className='infoShoes'>
            <h1>{title}</h1>
            <div className='cardShopp'>
                <h2>${price}</h2>
                <div className="quantity">
                    <button
                        className="clickActive"
                        id="-"
                        onClick={handleQuantity}
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        -
                    </button>
                    <div>{quantity}</div>
                    <button
                        className="clickActive"
                        id="+"
                        onClick={handleQuantity}
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="buttons">
                    <div
                        className="select-div"
                        style={{
                            border: `2px solid ${colorShoes}`
                        }}
                    >
                        <p>Talles</p>
                        <select onChange={handleSize}>
                            {
                                size?.map(size =>
                                    <option key={`${size}`}>{size}</option>
                                )
                            }
                        </select>
                    </div>
                    <button
                        className="clickActive"
                        style={{
                            background: colorShoes
                        }}
                        onClick={handleCart}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
            <p
                className="data-shoes"
                style={{
                    background: `${colorShoes}`,
                    color: `${colorShoes === "black" ? "white" : "black"}`
                }}
            >
                {desc}
            </p>
            <ToastContainer/>
        </div>
    )
}