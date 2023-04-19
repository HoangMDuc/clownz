import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import styled from 'styled-components';

import axios from 'axios';

import AccountSideBar from './components/AccountSideBar';

import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../helpers/address_helper_functions';
import { IAddressApi, IUserAddress } from '../../interfaces/interfaces';
import { LoginContext } from '../../contexts/LoginContext';
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';

const StyledMainBlock = styled.div`
    padding: 140px 100px 50px;
    display: flex;
    & * {
        color: var(--primary-color);
        text-transform: unset;
    }
    .account-info {
        font-size: 1.4rem;
        line-height: 1.7;
        h2 {
            margin: 10px 0 30px;
            font-size: 1.9rem;
            font-weight: 400;
            text-transform: uppercase;
        }
        p {
            margin-bottom: 15px;
        }
    }
`;

const Account = () => {
    const [userAddress, setUserAddress] = useState<IUserAddress>();
    const [addressApi, setAddressApi] = useState<IAddressApi[]>([]);
    const navigate = useNavigate();
    const { loginInfo } = useContext(LoginContext);
    useEffect(() => {
        if (!loginInfo.isLogin) {
            navigate('/login');
        } else {
            document.title = 'Trang khách hàng | CLOWNZⓇ STREETWEAR';
            const fetchData = async () => {
                const res = await Promise.all([
                    axios.get(`https://629c5b853798759975d46095.mockapi.io/api/user_address`),
                    axios.get('https://provinces.open-api.vn/api/?depth=3'),
                ]);
                setAddressApi(res[1].data);
                const address = res[0].data.find((e: IUserAddress) => {
                    return e.user_id === loginInfo.userInfo.id && e.isDefault === true;
                });
                setUserAddress(address);
            };
            fetchData();
        }
    }, []);

    return loginInfo.isLogin ? (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <AccountSideBar></AccountSideBar>
                <div className="account-info">
                    <h2>Thông tin tài khoản</h2>
                    <p>
                        <strong>Họ tên: </strong>
                        {loginInfo.userInfo.name}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {loginInfo.userInfo.email}
                    </p>
                    <p>
                        <strong>Điện thoại: </strong>
                        {loginInfo.userInfo.phoneNumber}
                    </p>
                    <p>
                        <strong>Địa chỉ: </strong>
                        {userAddress &&
                            addressApi &&
                            `${userAddress.street}, ${getWardNameByCode(
                                userAddress.city,
                                userAddress.district,
                                userAddress.wards,
                                addressApi,
                            )},
                            ${getDistrictNameByCode(userAddress.city, userAddress.district, addressApi)},
                            ${getProvinceNameByCode(userAddress.city, addressApi)}.`}
                    </p>
                </div>
            </StyledMainBlock>
            <Footer></Footer>
        </div>
    ) : (
        <div></div>
    );
};

export default Account;
