import React, { FC } from "react";
import { Link } from "react-router-dom";

const Categorys: FC = () =>
    <nav className='categorys '>
        <Link to="/">Ver todas</Link>
        <Link to="/men">Hombre</Link>
        <Link to="/women">Mujer</Link>
    </nav>
export default React.memo(Categorys);