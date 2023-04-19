import React, { useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';

const StyledBanner = styled.div`
    padding: 140px 50px 50px;
    font-size: 1.6rem;
    display: flex;
    .map {
        height: 100vh;
    }
    .contact-info {
        /* flex: 1; */
        padding-left: 50px;
        h3 {
            /* text-align: center; */

            margin-bottom: 20px;
        }
        .contact-item {
            margin-right: 115px;
            justify-content: space-between;
            align-items: center;
            display: flex;
            /* font-size: 1.4rem; */
            margin-bottom: 20px;
            b {
                margin-left: 10px;
            }
        }
        .working-time {
            font-size: 1.6rem;
            margin-bottom: 20px;
        }
        .btn-contact {
            width: 140px;
            color: white;
            text-align: center;
            padding: 8px 10px;
            background-color: rgb(71, 71, 76);
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
        .branches-info {
            .branch-info {
                display: flex;
                margin-bottom: 20px;
                font-size: 1.6rem;
                h4,
                p {
                    margin-bottom: 20px;
                }
                .branch-img {
                    margin-right: 40px;
                    width: 300px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
`;

const Contact = () => {
    useEffect(() => {
        document.title = 'Liên hệ | CLOWNZⓇ STREETWEAR';
    }, []);
    return (
        <div>
            <Header primary={true}></Header>
            <StyledBanner>
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0585113623474!2d105.82033961440743!3d21.030344693101362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab739d51388d%3A0x6abb0cd26159c0b4!2zNDUgUC4gTsO6aSBUcsO6YywgR2nhuqNuZyBWw7UsIEJhIMSQw6xuaCwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1664723949914!5m2!1svi!2s"
                        width="600"
                        height="690"
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="a"
                    ></iframe>
                </div>
                <div className="contact-info">
                    <h3>CÔNG TY TNHH 2 THÀNH VIÊN CLOWNZ</h3>
                    <div className="contact-item">
                        <p>
                            Điện thoại:{' '}
                            <b>
                                <a href="tel:058660 8660">058660 8660</a>
                            </b>
                        </p>
                        <a href="tel:058660 8660" className="btn-contact">
                            Gọi ngay
                        </a>
                    </div>
                    <div className="contact-item">
                        <p>
                            Email:{' '}
                            <b>
                                <a href="mailto:duong@clownz.vn">duong@clownz.vn</a>
                            </b>
                        </p>
                        <a href="mailto:duong@clownz.vn" className="btn-contact">
                            Gửi ngay
                        </a>
                    </div>
                    <div className="contact-item">
                        <p>
                            Chatbox: <b>Messenger</b>
                        </p>
                        <a href="#" className="btn-contact">
                            Nhắn ngay
                        </a>
                    </div>
                    <p className="working-time">
                        Giờ mở cửa: <b> Mon-Son | 9:30 ~ 21:30</b>
                    </p>
                    <div className="branches-info">
                        <div className="branch-info">
                            <div className="branch-img">
                                <img src="/images/branches/hn1.webp" alt="" />
                            </div>
                            <div>
                                <h4>CLOWN HỒ ĐẮC DI</h4>
                                <p>19 Hồ Đắc Di, Đống Đa, HN</p>
                                <p>
                                    Mở cửa: <b> Mon - Sun | 09:30 ~ 21:30</b>
                                </p>

                                <p>
                                    Phone:{' '}
                                    <b>
                                        <a href="tel:058660 8660">058660 8660</a>
                                    </b>
                                </p>
                                <div className="btn-contact">Xem cửa hàng</div>
                            </div>
                        </div>
                        <div className="branch-info">
                            <div className="branch-img">
                                <img src="/images/branches/hn2.webp" alt="" />
                            </div>
                            <div>
                                <h4>CLOWN NÚI TRÚC</h4>
                                <p>45 Núi Trúc, Ba Đình, HN</p>
                                <p>
                                    Mở cửa: <b> Mon - Sun | 09:30 ~ 21:30</b>
                                </p>

                                <p>
                                    Phone:{' '}
                                    <b>
                                        <a href="tel:058660 8660">058660 8660</a>
                                    </b>
                                </p>
                                <div className="btn-contact">Xem cửa hàng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledBanner>
            <Footer></Footer>
        </div>
    );
};

export default Contact;
