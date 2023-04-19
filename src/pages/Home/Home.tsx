import React, { useEffect } from 'react';
import Banner from '../../layouts/Banner/Banner';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import Slider from '../../layouts/Slider/Slider';
import Video from '../../layouts/Video/Video';

export default function Home() {
    useEffect(() => {
        document.title = 'CLOWNZⓇ STREETWEAR';
        const cart = localStorage.getItem('cart');
        if (!cart) {
            localStorage.setItem('cart', JSON.stringify({ products: [], total_price: 0 }));
        }
        const loginInfo = sessionStorage.getItem('loginInfo');
        if (!loginInfo) {
            sessionStorage.setItem('loginInfo', JSON.stringify({ isLogin: false, userInfo: {} }));
        }
    }, []);

    return (
        <div>
            <Header primary={false}></Header>
            <Video></Video>
            <Banner></Banner>
            <Slider></Slider>
            <Footer></Footer>
        </div>
    );
}
