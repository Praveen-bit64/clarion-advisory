'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slider } from '../types/components/slider';

export default function SliderCenterMode(props: slider) {
    const { RenderItem, itemPerView = 3, dots = true, autoplay = true, itemArray, className = '' } = props;

    const settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '120px',
        slidesToShow: itemPerView,
        autoplay,
        dots,
        speed: 500,
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4">
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
