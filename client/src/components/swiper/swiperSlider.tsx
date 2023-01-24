import NewArrivals from '../newArrivals/newArrivals';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import React, { FC } from 'react';
import { ProductsTypes } from '../../types/types';

type Props = {
    products: ProductsTypes[]
}

const SwiperSlider: FC<Props> = ({ products }) => {
    const swiperProducts: ProductsTypes[] = products.slice(0, 3);
    return (
        <Swiper
            pagination={true}
            modules={[Autoplay]}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            className="mySwiper"
        >
            {
                swiperProducts.map((product) => <SwiperSlide key={product.id}><NewArrivals {...product} /></SwiperSlide>)
            }

        </Swiper>
    )
};
export default React.memo(SwiperSlider);