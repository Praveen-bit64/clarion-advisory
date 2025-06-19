'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slider } from '../types/components/slider';

export default function SliderCenterMode(props: slider) {
    const { RenderItem, itemPerView = 3, dots = true, autoplay = true, itemArray, className = '', centerMode = true, speed = 500 } = props;

    const settings = {
        className: 'center',
        centerMode: centerMode,
        infinite: true,
        centerPadding: '50px',
        arrows: true,
        slidesToShow: itemPerView,
        autoplay,
        dots,
        speed: speed,
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {itemArray.map((item, ndx) => (
                    <div key={ndx} className="px-2">
                        <div className={`${className}`}>
                            <RenderItem item={item} />
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
