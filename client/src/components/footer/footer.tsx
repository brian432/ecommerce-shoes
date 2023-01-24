import React, { FC } from "react";
import { Link } from "react-router-dom";
import './footer.css';

const Footer: FC = () => {
    return (
        <footer>
            <div className="footer-top-one">
                <Link to="/">LOCALES MÁS CERCANOS</Link>
                <Link to="/">REGISTRATE PARA RECIBIR NOVEDADES</Link>
            </div>
            <div className="footer-top-two">
                <Link to="/">ACERCA DE NIKE</Link>
                <ul>
                    <li><Link to="/" className="gray">Noticias</Link></li>
                    <li><Link to="/" className="gray">Empleo</Link></li>
                    <li><Link to="/" className="gray">Inversores</Link></li>
                    <li><Link to="/" className="gray">Sustentabilidad</Link></li>
                </ul>
            </div>
            <div className="footer-top-three">
                <i className="fa-brands fa-twitter "></i>
                <i className="fa-brands fa-facebook-f "></i>
                <i className="fa-brands fa-youtube "></i>
                <i className="fa-brands fa-instagram "></i>
            </div>
            <div className="footer-bottom-one">
                <Link to="/">Argentina</Link> <span >© 2022 Nike, Inc. Todos los derechos reservados.</span>
            </div>
            <div className="footer-bottom-two">
                <Link to="/" className="gray">Términos de uso</Link>
                <Link to="/" className="gray">Política de privacidad</Link>
            </div>
        </footer>
    )
};

export default React.memo(Footer);