import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoginContext } from '../../../contexts/LoginContext';
import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../../helpers/address_helper_functions';
import Footer from '../../../layouts/Footer/Footer';
import Header from '../../../layouts/Header/Header';
import AccountSideBar from '../components/AccountSideBar';
import { IAddressApi, IOrder } from '../../../interfaces/interfaces';
const StyledMainBlock = styled.div`
    padding: 140px 100px 50px;
    display: flex;
    & * {
        text-transform: unset;
        color: var(--primary-color);
    }
    h2 {
        margin: 10px 0 10px;
        font-size: 1.9rem;
        font-weight: 400;
        text-transform: uppercase;
    }
    .orders-block {
        flex: 1;
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 1.2rem;
            td,
            th {
                padding: 8px;
                border: 1px solid #ccc;
            }
        }
        .text-danger > * {
            color: red;
        }
    }
`;
const Orders = () => {
    const [userOrders, setUserOrders] = useState<IOrder[]>([]);
    const [addressApi, setAddressApi] = useState<IAddressApi[]>([]);
    const navigate = useNavigate();
    const { loginInfo } = useContext(LoginContext);
    useEffect(() => {
        if (loginInfo.isLogin) {
            document.title = 'Trang đơn hàng | CLOWNZⓇ STREETWEAR';
            axios
                .get(`https://629c5b853798759975d46095.mockapi.io/api/orders?user_id=${loginInfo.userInfo.id}`)
                .then((result) => {
                    if (result) {
                        setUserOrders(result.data);
                    }
                });
            axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
                setAddressApi(response.data);
            });
        } else {
            navigate('/login');
        }
    }, []);

    return loginInfo.isLogin ? (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <AccountSideBar></AccountSideBar>
                <div className="orders-block">
                    <h2>Đơn hàng của bạn</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Đơn Hàng</th>
                                <th>Ngày </th>
                                <th>Địa chỉ</th>
                                <th>Giá trị đơn hàng</th>
                                <th>TT thanh toán</th>
                                <th>TT vận chuyển</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userOrders &&
                                addressApi.length > 0 &&
                                userOrders.map((order) => {
                                    return (
                                        <tr key={order.id}>
                                            <td className="text-danger">
                                                <Link state={{ id: order.id }} to={`/account/orders/${order.id}`}>
                                                    # {order.id}
                                                </Link>
                                            </td>
                                            <td>{order.createdAt}</td>
                                            <td>{`${order.address.street}, ${getWardNameByCode(
                                                order.address.city,
                                                order.address.district,
                                                order.address.wards,
                                                addressApi,
                                            )}, ${getDistrictNameByCode(
                                                order.address.city,
                                                order.address.district,
                                                addressApi,
                                            )}, ${getProvinceNameByCode(order.address.city, addressApi)}`}</td>
                                            <td>{order.price}</td>
                                            <td className={order.shipStatus === 'Đã hủy' ? 'text-danger' : ''}>
                                                {order.shipStatus}
                                            </td>
                                            <td className={order.shipStatus === 'Đã hủy' ? 'text-danger' : ''}>
                                                {order.paymentStatus}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </StyledMainBlock>
            <Footer></Footer>
        </div>
    ) : (
        <div></div>
    );
};

export default Orders;
