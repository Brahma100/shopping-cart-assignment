import React, { useState, useEffect } from 'react';
import './Corousel.style.css';
import Carousel from 'nuka-carousel';

const MainCarousel = () => {
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/banners')
            .then(res => res.json())
            .then((res) => {
                const resList = [];
                res.forEach(value => {
                    resList.push(`.${value.bannerImageUrl}`);
                });
                setBanners(resList)
            })
    }, [])

    return (
        <Carousel autoplay={true}>
            {
                banners.map((url, index) =>
                (
                    <img style={{ width: '100%' }} key={index} src={url} alt=""></img>)
                )
            }
        </Carousel>

    );
}

export default MainCarousel;