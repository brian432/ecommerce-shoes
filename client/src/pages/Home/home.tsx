import { FC } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Card } from '../../components/card/card';
import Categorys from '../../components/categorys/categorys';
import SwiperSlider from '../../components/swiper/swiperSlider';
import './home.css';
import "swiper/css";
import "swiper/css/pagination";
import { useCarts } from '../../hooks/useCarts';

export const Home: FC = () => {
    const products = useProducts();
    const { total } = useCarts();
    return (
        <div className='home-container'>
            <SwiperSlider products={products} />
            <Categorys />
            <section className='products-wrapper '>
                {
                    products.map(card => <Card key={card.id} {...card} />)
                }
            </section>
        </div>
    )
};