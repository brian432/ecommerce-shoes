import { FC } from "react";
import './slider.css';
const { IMG_URL } = process.env;

type Props = {
    imgPaths: string[],
    changeImage: (index: number) => void
}

export const Slider: FC<Props> = ({ imgPaths, changeImage }) => {


    return (
        <div className="slider-wrapper">
            <div className="slider">
                {
                    imgPaths?.map((img, index) =>
                        <div className="slider-div-imgs " key={img} onClick={() => changeImage(index)}>
                            <img  src={`${IMG_URL}${img}`} alt="imagenes" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}