import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import{SvgNike} from '../svg/svgNike';

type Props = {
    handleMenu: (str: string) => void;
};

const Logo: FC<Props> = ({ handleMenu }) =>
    <Link to="/" className="headerLeft" onClick={() => handleMenu("desactive")}>
        <SvgNike />
    </Link>;

export default React.memo(Logo);