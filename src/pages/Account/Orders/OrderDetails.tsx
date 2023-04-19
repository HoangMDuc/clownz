import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    getDistrictNameByCode,
    getProvinceNameByCode,
    getWardNameByCode,
} from '../../../helpers/address_helper_functions';
import Footer from '../../../layouts/Footer/Footer';
import Header from '../../../layouts/Header/Header';
import AccountSideBar from '../components/AccountSideBar';
import { IAddressApi, IOrder, IProductOfCart } from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';

const StyledMainBlock = styled.div`
    padding: 140px 100px 50px;
    display: flex;
    width: 100%;
    & * {
        text-transform: unset;
        color: var(--primary-color);
    }
    h2 {
        margin: 10px 0 30px;
        font-size: 1.9rem;
        font-weight: 400;
        text-transform: uppercase;
    }
    .order-block {
        flex: 1;
        .payment-status {
            margin-right: 30px;
        }
        .ship-status,
        .payment-status {
            display: inline-block;
            font-size: 1.4rem;
            margin-bottom: 20px;
        }
        .date {
            font-size: 1.6rem;
            margin-bottom: 40px;
            h4 {
                font-weight: 600;
            }
        }
        .address-block {
            font-size: 1.6rem;
            .address-content {
                font-size: 1.4rem;
                width: 100%;
                margin-top: 10px;
                padding: 13px 25px 10px 20px;
                p {
                    margin-bottom: 10px;
                }
            }
        }
        .payment-block,
        .note-block {
            font-size: 1.6rem;
            display: flex;
            flex-direction: column;
        }

        .payment-content,
        .note-content {
            padding: 13px 25px 10px 20px;
            margin-top: 10px;
            font-size: 1.4rem;
            flex: 1;
        }
        .order_products {
            margin-top: 20px;
            border-collapse: collapse;
            width: 100%;
            th,
            td {
                border: 1px solid #ccc;
                padding: 8px;
                font-size: 1.4rem;
            }
            p {
                margin: 5px 0;
            }
        }
        .order_cost {
            width: 100%;
            border: 1px solid #ccc;
            border-bottom: unset;
            border-right: unset;
            margin-top: 20px;
            margin-left: 0;
            font-size: 1.4rem;
            font-weight: 400;
            div {
                padding: 8px;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
            }
            div:last-child {
                font-weight: 600;
            }
        }
    }
    .border-radius {
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .product-image {
        width: 100%;
    }
`;
const OrderDetails = () => {
    const [order, setOrder] = useState<IOrder>();
    const [addressApi, setAddressApi] = useState<IAddressApi[]>([]);
    const orderId = useLocation().state.id;
    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (loginInfo.isLogin) {
            document.title = 'Chi tiết đơn hàng | CLOWNZⓇ STREETWEAR';
            const fetchData = async () => {
                const res = await Promise.all([
                    axios.get(`https://629c5b853798759975d46095.mockapi.io/api/orders/${orderId}`),
                    axios.get('https://provinces.open-api.vn/api/?depth=3'),
                ]);
                setOrder(res[0].data);
                setAddressApi(res[1].data);
            };
            fetchData();
        } else {
            navigate('/login');
        }
    }, [orderId]);
    return loginInfo ? (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <AccountSideBar></AccountSideBar>
                {order && (
                    <div className="order-block">
                        <h2>Chi tiết đơn hàng #{order.id}</h2>
                        <div className="payment-status">
                            <span>
                                Trạng thái thanh toán:
                                <b className="text-danger"> {order.paymentStatus}</b>
                            </span>
                        </div>
                        <div className="ship-status">
                            <span>
                                Trạng thái vận chuyển:
                                <b className="text-danger"> {order.shipStatus}</b>
                            </span>
                        </div>
                        <div className="date">
                            <h4>Ngày đặt hàng: {order.createdAt}</h4>
                        </div>
                        <div className="row">
                            <div className="address-block col-6">
                                <span>ĐỊA CHỈ GIAO HÀNG</span>
                                <div className="address-content border-radius">
                                    <p>
                                        <strong>{loginInfo.userInfo.name}</strong>
                                    </p>
                                    <p>
                                        Địa chỉ:{' '}
                                        {order &&
                                            addressApi &&
                                            `${order.address.street}, ${getWardNameByCode(
                                                order.address.city,
                                                order.address.district,
                                                order.address.wards,
                                                addressApi,
                                            )}, ${getDistrictNameByCode(
                                                order.address.city,
                                                order.address.district,
                                                addressApi,
                                            )}, ${getProvinceNameByCode(order.address.city, addressApi)}`}
                                    </p>
                                    <p>Số điện thoại: {loginInfo.userInfo.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="payment-block col-3">
                                <span>THANH TOÁN</span>
                                <div className="payment-content border-radius">
                                    <p>{order.paymethod}</p>
                                </div>
                            </div>
                            <div className="note-block col-3">
                                <span>GHI CHÚ</span>
                                <div className="note-content border-radius">Không có ghi chú</div>
                            </div>
                        </div>
                        <table className="order_products">
                            <thead>
                                <tr>
                                    <th style={{ width: '50%' }}>Sản phẩm</th>

                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.products &&
                                    order.products.map((product: IProductOfCart) => {
                                        return (
                                            <tr key={product.productId}>
                                                <td>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <Link
                                                                to={`/product_details/${product.productName}`}
                                                                state={{ id: product.productId }}
                                                                className="text-hover"
                                                            >
                                                                <img
                                                                    src={product.productImage}
                                                                    alt=""
                                                                    className="product-image"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="col-9">
                                                            <Link
                                                                to={`/product_details/${product.productName}`}
                                                                state={{ id: product.productId }}
                                                                className="text-hover"
                                                            >
                                                                {product.productName}
                                                            </Link>
                                                            <p>Size: {product.productSize}</p>
                                                            <p>Mã sản phẩm: {product.productId}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>{product.productPrice} đ</td>
                                                <td>{product.productQuantity}</td>
                                                <td>{product.productQuantity * product.productPrice} đ</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>

                        <div className="row order_cost">
                            <div className="col-4">Khuyến mại</div>
                            <div className="col-8">0đ</div>
                            <div className="col-4">Phí vận chuyển</div>
                            <div className="col-8">30.000 ₫ (Chuyển phát nhanh)</div>
                            <div className="col-4">Tổng tiền</div>
                            <div className="col-8 text-danger">{order.price} ₫</div>
                        </div>
                    </div>
                )}
            </StyledMainBlock>
            <Footer></Footer>
        </div>
    ) : (
        <div></div>
    );
};

export default OrderDetails;
