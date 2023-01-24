import { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/header/header';
import { Register } from './pages/auth/register';
import { Login } from './pages/auth/login';
import { Home } from './pages/Home/home';
import { Product } from './pages/product/product';
import { Logged } from './components/logged/logged';
import { Cart } from './pages/cart/cart';
import { Success } from './pages/success/success';
import { Orders } from './pages/orders/orders';
import { Favs } from './pages/favs/favs';
import Footer from './components/footer/footer';

import './index.css';
import { Paths } from './types/types';

export const App: FC = () => {
    const location = useLocation().pathname.split("/")[1];

    const paths = (str: any): str is Paths => {
        return Object.values(Paths).includes(str);
    };
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/:category' element={<Home />} />
                <Route path='/login' element={
                    <Logged>
                        <Login />
                    </Logged>
                } />
                <Route path='/register' element={
                    <Logged>
                        <Register />
                    </Logged>
                } />
                <Route path='/cart' element={<Cart />} />
                <Route path='/product/:id' element={<Product />} />
                <Route path='/success' element={<Success />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/favs' element={<Favs />} />
            </Routes>
            {!paths(location) && <Footer />}
        </>

    )
};