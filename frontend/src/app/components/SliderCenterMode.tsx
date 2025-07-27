'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slider } from '../types/components/slider';

export default function SliderCenterMode(props: slider) {
    const {
        RenderItem,
        itemArray,
        className = '',
        dots = true,
        autoplay = true,
        centerMode = true,
        speed = 2000,
        itemPerView = 3,
    } = props;

    const settings = {
        className: 'center',
        centerMode,
        infinite: true,
        centerPadding: '50px',
        arrows: true,
        slidesToShow: itemPerView,
        dots,
        speed,
        autoplay,
        responsive: [
            {
                breakpoint: 1024, // <1024px
                settings: {
                    slidesToShow: itemPerView,
                },
            },
            {
                breakpoint: 768, // <768px
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480, // <480px
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {itemArray.map((item, ndx) => (
                    <div key={ndx} className={className}>
                        <RenderItem item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
