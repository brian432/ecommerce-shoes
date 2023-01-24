import { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsId } from "../../hooks/useProducts";
import './product.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { InfoShoes } from '../../components/infoShoes/infoShoes';
import { Slider } from '../../components/slider/slider';
import { StateImg } from "../../types/types";
import { useResize } from "../../hooks/useResize";
import { Autoplay, Pagination } from "swiper";

const { IMG_URL } = process.env;

export const Product: FC = () => {
    const [imgActive, setImgActive] = useState<StateImg>({
        imgPaths: [],
        colorShoes: ""
    });
    const [indexImage, setIndexImage] = useState<number>(0);

    const { id } = useParams();
    const product = useProductsId(id as string);
    const { isTablet } = useResize();

    const handleClick = (img: string[], color: string) => {
        setImgActive({
            imgPaths: img,
            colorShoes: color
        });
    };

    const changeImage = (index: number) => {
        setIndexImage(index)
    }

    return (
        <div className="container-cards">
            {
                product.img?.map((img, index) =>
                    <div
                        className={`${imgActive.colorShoes ? imgActive.colorShoes === product.color[index] ? "cardOn " : "cardOff " : "cards "}`}
                        key={img[indexImage]}
                        style={{
                            background: product.color[index]
                        }}
                        onClick={() => handleClick(img, product.color[index])}
                    >
                        {
                            imgActive.imgPaths.length > 0 && isTablet ?
                                <Swiper className='div-img '
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Autoplay, Pagination]}
                                >
                                    {imgActive.imgPaths.map(img =>
                                        <SwiperSlide key={img}>
                                            <img
                                                
                                                src={`${IMG_URL}${img}`}
                                                alt={product.title}
                                            />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                                : <div className='div-img '>
                                    <img  src={`${IMG_URL}${img[indexImage]}`} alt={product.title} />
                                </div>
                        }

                        <h3>{product.title}</h3>
                    </div>
                )
            }
            {
                imgActive.imgPaths.length > 0 &&
                <>
                    <InfoShoes product={product} imgActive={imgActive} />
                    <Slider imgPaths={imgActive.imgPaths} changeImage={changeImage} />
                </>
            }
        </div>
    )
}
