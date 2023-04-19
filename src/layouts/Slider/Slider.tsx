import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const StyledSlider = styled.section`
    margin-top: 40px;
    width: 100%;
    img {
        width: 100%;
    }
`;
const Slider = () => {
    return (
        <StyledSlider>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide>
                    <img src="/images/slide/slider_story_1.webp" alt="SLIDER" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/slide/slider_story_2.webp" alt="SLIDER" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/images/slide/slider_story_3.webp" alt="SLIDER" />
                </SwiperSlide>
            </Swiper>
        </StyledSlider>
    );
};

export default Slider;
