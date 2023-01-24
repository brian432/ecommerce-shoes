import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ProductsTypes } from "../../types/types";
import { SvgNike } from "../svg/svgNike";
import './newArrivals.css';

const { IMG_URL } = process.env;

const NewArrivals: FC<ProductsTypes> = ({
    img,
    color,
    desc,
    id,
    title
}) => {
    return (
        <div className="new-arrivals-wrapper" style={{ backgroundColor: color[0] + "50" }}>
            <SvgNike />
            <div className="details">
                <h1>{title}</h1>
                <p>{desc}</p>
                <Link to={`/product/${id}`} style={{ backgroundColor: color[0] + "60" }}>Ver producto</Link>
            </div>
            <div className="div-img">
                <img  src={`${IMG_URL}${img[0][0]}`} alt={title} />
            </div>
        </div>
    )
};
export default React.memo(NewArrivals);