import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';

import validates from '../../helpers/validate_v2';
import { useNavigate } from 'react-router-dom';
import {
    getDistrictNameByCode,
    getDistrictOfProvince,
    getProvinceNameByCode,
    getWardNameByCode,
    getWardsOfDistrict,
} from '../../helpers/address_helper_functions';
import { LoginContext } from '../../contexts/LoginContext';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import TextArea from '../../components/TextArea/TextArea';
import Label from '../../components/Label/Label';
import Button from '../../components/Button/Button';
import { IAddressApi, IProductOfCart, IUserAddress, TypeValidateResult } from '../../interfaces/interfaces';
import { CartContext } from '../../contexts/CartContext';
const StyledMainBlock = styled.div`
    padding: 140px 10px 50px 100px;
    border-bottom: 1px solid #ccc;
    .content {
        h2 {
            font-size: 1.8rem;
            margin-bottom: 10px;
        }
        .checkout_info {
            .form_group {
                padding: 6px;

                &.ship_method,
                &.payment_method {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                    height: 70px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
            }
        }
        .order_info {
            border-left: 1px solid #ccc;
            font-size: 1.4rem;
            .invoice_cost {
                div {
                    margin-bottom: 10px;
                }
                .final_cost {
                    font-size: 2rem;
                    margin-bottom: 30px;
                }
            }
            button {
                width: 50%;
                transform: translateX(50%);
            }
        }
        .products_list {
            margin-top: 20px;
            max-height: 250px;
            overflow-y: scroll;
            overflow-x: hidden;
        }
        hr {
            margin-top: 30px;
            margin-bottom: 20px;
        }
    }
`;
type AddressSelected = {
    id: string;
    street: string;
    wards: number;
    city: number;
    district: number;
    phone: string;
};
type ShipInfo = {
    price: any;
    user_id: any;
    products: any;
    shipStatus: string;
    paymentStatus: string;
    shipmethod: string;
    paymethod: string;
    note: string;
};
const CheckOut = () => {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const { loginInfo } = useContext(LoginContext);
    const [address, setAddress] = useState([]);
    const [addressApiData, setAddressApiData] = useState<IAddressApi[]>([]);
    const [validatesResult, setValidatesResult] = useState<TypeValidateResult>();
    const [addressSelected, setAddressSelected] = useState<AddressSelected>({
        id: 'other',
        street: '',
        wards: 1,
        city: 1,
        district: 1,
        phone: '',
    });
    const [shipInfo, setShipInfo] = useState<ShipInfo>({
        price: cart.total_price > 700000 ? cart.total_price : cart.total_price + 30000,
        user_id: loginInfo.userInfo.id,
        products: cart.products,
        shipStatus: 'Chưa vận chuyển',
        paymentStatus: 'Chưa thanh toán',
        shipmethod: 'Chuyển phát nhanh',
        paymethod: 'Thanh toán khi giao hàng',
        note: '',
    });
    // const [loginInfo, setLoginInfo] = useState(() => {
    //     return JSON.parse(sessionStorage.getItem('loginInfo') || '');
    // });

    useEffect(() => {
        if (loginInfo.isLogin) {
            document.title = 'Thanh toán | CLOWNZⓇ STREETWEAR';
            axios.get(`https://629c5b853798759975d46095.mockapi.io/api/user_address`).then((result) => {
                const user_address = result.data.filter(
                    (element: IUserAddress) => element.user_id == loginInfo.userInfo.id,
                );
                setAddress(user_address);
            });
            axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
                setAddressApiData(response.data);
            });
        } else {
            navigate('/login');
        }
    }, []);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const today = new Date();
        if (addressSelected.id === 'other') {
            if (validates.isTel(addressSelected.phone).valid && validates.isRequired(addressSelected.street).valid) {
                axios({
                    method: 'post',
                    url: 'https://629c5b853798759975d46095.mockapi.io/api/orders',
                    data: {
                        createdAt: `${today.toLocaleString('default', {
                            year: 'numeric',
                        })}-${today.toLocaleString('default', {
                            month: '2-digit',
                        })}-${today.toLocaleString('default', {
                            day: '2-digit',
                        })} ${today.toLocaleString('default', {
                            hour: '2-digit',
                        })}: ${today.toLocaleString('default', {
                            minute: '2-digit',
                        })}`,
                        address: {
                            street: addressSelected.street,
                            wards: addressSelected.wards,
                            district: addressSelected.district,
                            city: addressSelected.city,
                        },
                        phone: addressSelected.phone,
                        ...shipInfo,
                    },
                }).then((result) => {
                    localStorage.setItem('cart', JSON.stringify({ total_price: 0, products: [] }));

                    setCart({ total_price: 0, products: [] });
                    navigate('/account/orders');
                });
            } else {
                setValidatesResult({
                    phoneValidation: validates.isTel(addressSelected.phone),
                    streetValidation: validates.isRequired(addressSelected.street),
                });
            }
        } else {
            axios({
                method: 'post',
                url: 'https://629c5b853798759975d46095.mockapi.io/api/orders',
                data: {
                    createdAt: `${today.toLocaleString('default', {
                        year: 'numeric',
                    })}-${today.toLocaleString('default', {
                        month: '2-digit',
                    })}-${today.toLocaleString('default', {
                        day: '2-digit',
                    })} ${today.toLocaleString('default', {
                        hour: '2-digit',
                    })}: ${today.toLocaleString('default', {
                        minute: '2-digit',
                    })}`,
                    address: {
                        street: addressSelected.street,
                        wards: addressSelected.wards,
                        district: addressSelected.district,
                        city: addressSelected.city,
                    },
                    phone: addressSelected.phone,
                    ...shipInfo,
                },
            }).then(async (result) => {
                localStorage.setItem('cart', JSON.stringify({ total_price: 0, products: [] }));
                setCart({ total_price: 0, products: [] });
                navigate('/account/orders');
            });
        }
    };

    return loginInfo.isLogin ? (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <div className="content">
                    <form onSubmit={handleSubmit} className="checkout_info">
                        <div className="row gx-5">
                            <div className="col-8">
                                <div className="row g-5">
                                    <div className="col-6">
                                        <div className="row">
                                            <h2>Thông tin nhận hàng</h2>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="list_address">
                                                    Sổ địa chỉ
                                                </Label>
                                                <Select
                                                    padding="8px"
                                                    value={addressSelected.id}
                                                    onChange={(e) => {
                                                        if (e.target.value !== 'other') {
                                                            const temp = address.find((element: IUserAddress) => {
                                                                return element.id === e.target.value;
                                                            });

                                                            if (temp) {
                                                                setAddressSelected(temp);
                                                            }
                                                        } else {
                                                            setAddressSelected({
                                                                id: 'other',
                                                                street: '',
                                                                wards: 1,
                                                                city: 1,
                                                                district: 1,
                                                                phone: '',
                                                            });
                                                        }
                                                    }}
                                                    id="list_address"
                                                >
                                                    <option value="other">Địa chỉ khác</option>
                                                    {address &&
                                                        addressApiData.length > 0 &&
                                                        address.map((element: IUserAddress) => {
                                                            return (
                                                                <option value={element.id}>{`${
                                                                    element.street
                                                                }, ${getWardNameByCode(
                                                                    element.city,
                                                                    element.district,
                                                                    element.wards,
                                                                    addressApiData,
                                                                )}, ${getDistrictNameByCode(
                                                                    element.city,
                                                                    element.district,
                                                                    addressApiData,
                                                                )}, ${getProvinceNameByCode(
                                                                    element.city,
                                                                    addressApiData,
                                                                )}`}</option>
                                                            );
                                                        })}
                                                </Select>
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    value={loginInfo.userInfo.email}
                                                    height="40px"
                                                    padding="8px"
                                                    type="text"
                                                    id="email"
                                                    readOnly
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="name">
                                                    Họ và tên
                                                </Label>
                                                <Input
                                                    value={loginInfo.userInfo.name}
                                                    type="text"
                                                    height="40px"
                                                    padding="8px"
                                                    id="name"
                                                    placeholder="Họ và tên"
                                                    readOnly
                                                />
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="phone">
                                                    Số điện thoại
                                                </Label>
                                                <Input
                                                    value={addressSelected.phone}
                                                    type="text"
                                                    height="40px"
                                                    padding="8px"
                                                    id="phone"
                                                    placeholder="Số điện thoại"
                                                    onChange={(e) => {
                                                        setAddressSelected((prevState) => {
                                                            return { ...prevState, phone: e.target.value };
                                                        });
                                                    }}
                                                    disabled={addressSelected.id === 'other' ? false : true}
                                                />
                                                <span className="text-danger">
                                                    {validatesResult && validatesResult?.phoneValidation.valid
                                                        ? ''
                                                        : validatesResult?.phoneValidation.message}
                                                </span>
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="street">
                                                    Đường, số nhà
                                                </Label>
                                                <Input
                                                    value={addressSelected.street}
                                                    type="text"
                                                    height="40px"
                                                    padding="8px"
                                                    id="street"
                                                    placeholder="Số nhà"
                                                    onChange={(e) => {
                                                        setAddressSelected((prevState) => {
                                                            return { ...prevState, street: e.target.value };
                                                        });
                                                    }}
                                                    disabled={addressSelected.id === 'other' ? false : true}
                                                />
                                                <span className="text-danger">
                                                    {validatesResult && validatesResult?.streetValidation.valid
                                                        ? ''
                                                        : validatesResult?.streetValidation.message}
                                                </span>
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="city">
                                                    Tỉnh thành
                                                </Label>
                                                <Select
                                                    padding="8px"
                                                    id="city"
                                                    value={addressSelected?.city ? addressSelected.city : ''}
                                                    onChange={(e) => {
                                                        setAddressSelected({
                                                            ...addressSelected,
                                                            city: Number(e.target.value),
                                                            district: getDistrictOfProvince(
                                                                Number(e.target.value),
                                                                addressApiData,
                                                            )[0].code,
                                                            wards: getWardsOfDistrict(
                                                                e.target.value,
                                                                getDistrictOfProvince(
                                                                    Number(e.target.value),
                                                                    addressApiData,
                                                                )[0].code,
                                                                addressApiData,
                                                            )[0].code,
                                                        });
                                                    }}
                                                >
                                                    {addressApiData.length > 0 &&
                                                        addressApiData.map((province) => {
                                                            return (
                                                                <option key={province.code} value={province.code}>
                                                                    {province.name}
                                                                </option>
                                                            );
                                                        })}
                                                </Select>
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="district">
                                                    Quận huyện
                                                </Label>
                                                <Select
                                                    padding="8px"
                                                    id="district"
                                                    value={addressSelected?.district ? addressSelected.district : ''}
                                                    onChange={(e) => {
                                                        setAddressSelected({
                                                            ...addressSelected,
                                                            district: Number(e.target.value),
                                                            wards: getWardsOfDistrict(
                                                                addressSelected.city,
                                                                Number(e.target.value),
                                                                addressApiData,
                                                            )[0].code,
                                                        });
                                                    }}
                                                >
                                                    {addressApiData.length > 0 &&
                                                        getDistrictOfProvince(addressSelected.city, addressApiData).map(
                                                            (district) => {
                                                                return (
                                                                    <option key={district.code} value={district.code}>
                                                                        {district.name}
                                                                    </option>
                                                                );
                                                            },
                                                        )}
                                                </Select>
                                            </div>
                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="ward">
                                                    Phường xã
                                                </Label>
                                                <Select
                                                    padding="8px"
                                                    id="ward"
                                                    value={addressSelected?.wards ? addressSelected.wards : ''}
                                                    onChange={(e) => {
                                                        setAddressSelected({
                                                            ...addressSelected,
                                                            wards: Number(e.target.value),
                                                        });
                                                    }}
                                                >
                                                    {addressApiData.length > 0 &&
                                                        getWardsOfDistrict(
                                                            addressSelected.city,
                                                            addressSelected.district,
                                                            addressApiData,
                                                        ).map((ward) => {
                                                            return (
                                                                <option key={ward.code} value={ward.code}>
                                                                    {ward.name}
                                                                </option>
                                                            );
                                                        })}
                                                </Select>
                                            </div>

                                            <div className="col-12 form_group">
                                                <Label textTransform="uppercase" htmlFor="note">
                                                    Ghi chú
                                                </Label>
                                                <TextArea
                                                    padding="8px"
                                                    value={shipInfo.note}
                                                    name="note"
                                                    id="note"
                                                    cols={30}
                                                    rows={100}
                                                    placeholder="Ghi chú"
                                                    onChange={(e) => {
                                                        setShipInfo((prevState) => {
                                                            return { ...prevState, note: e.target.value };
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="row">
                                            <h2>Vận chuyển</h2>
                                            <div className="col-12 form_group ship_method">
                                                <Input
                                                    checked={cart.total_price > 700000 ? true : false}
                                                    type="radio"
                                                    id="free_ship"
                                                    margin=" 0 10px 0 0"
                                                    readOnly
                                                    height="40px"
                                                    padding="8px"
                                                />
                                                <Label textTransform="uppercase" htmlFor="free_ship">
                                                    {'Miễn phí vận chuyển đơn hàng > 700.000đ'}
                                                </Label>
                                            </div>
                                            <h2>Thanh toán</h2>
                                            <div className="col-12 form_group payment_method">
                                                <Input
                                                    height="40px"
                                                    padding="8px"
                                                    margin=" 0 10px 0 0"
                                                    type="radio"
                                                    id="cod"
                                                    checked
                                                    readOnly
                                                />
                                                <Label textTransform="uppercase" htmlFor="cod">
                                                    Thanh toán khi giao hàng (COD)
                                                </Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 order_info">
                                <h2>Thông tin đơn hàng</h2>
                                <ul className="products_list">
                                    {cart &&
                                        cart.products.map((product: IProductOfCart, index: number) => {
                                            return (
                                                <li key={index}>
                                                    <div className="row">
                                                        <div className="col-3">
                                                            <img className="w-full" src={product.productImage} alt="" />
                                                        </div>
                                                        <div className="col-6">
                                                            <p>{product.productName}</p>
                                                            <p>{product.productSize}</p>
                                                            <p>
                                                                Số lượng: <span>{product.productQuantity}</span>
                                                            </p>
                                                        </div>
                                                        <div className="col-3">
                                                            <p>{product.productPrice}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                </ul>
                                <hr />
                                <div className="invoice_cost">
                                    <div>
                                        Tạm tính <span className="float-right">{cart.total_price}</span>
                                    </div>
                                    <div>
                                        Phí vận chuyển{' '}
                                        <span className="float-right">
                                            {cart.total_price > 700000 ? 'Miễn phí' : 30000}
                                        </span>
                                    </div>
                                    <i>
                                        <b>{'Freeship đơn hàng > 7000000đ'}</b>
                                    </i>
                                    <hr />
                                    <div className="final_cost">
                                        Tổng cộng{' '}
                                        <span className="text-danger float-right">
                                            {cart.total_price > 700000 ? cart.total_price : cart.total_price + 30000}
                                        </span>
                                    </div>
                                    <Button primary="true" type="submit">
                                        Đặt hàng
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </StyledMainBlock>
            <Footer></Footer>
        </div>
    ) : (
        <div></div>
    );
};

export default CheckOut;
