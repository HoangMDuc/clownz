import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    getDistrictNameByCode,
    getDistrictOfProvince,
    getProvinceNameByCode,
    getWardNameByCode,
    getWardsOfDistrict,
} from '../../../helpers/address_helper_functions';
import validates from '../../../helpers/validate_v2';
import Header from '../../../layouts/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import {
    FormState,
    IAddressApi,
    IOrder,
    IProductCard,
    IProductOfCart,
    IUser,
    TypeValidateResult,
} from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';

const StyledMainBlock = styled.div`
    padding-top: 110px;
    padding-left: 300px;
    padding-right: 10px;
    h1 {
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    table {
        margin-top: 20px;
        font-size: 1.4rem;
        width: 100%;
        border-collapse: collapse;
        td,
        th {
            border: 1px solid #ccc;
            padding: 8px;
        }
    }
`;

const StyledModal = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    display: none;
    z-index: 98;
    height: 100vh;
    padding-top: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    form {
        background-color: #fff;
        border-radius: 4px;
        padding: 10px 30px 30px;
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.4rem;
        h1 {
            text-align: center;
            margin-bottom: 10px;
        }

        .form_action {
            display: flex;
            justify-content: end;
            margin-top: 20px;

            .cancel_btn {
                margin-right: 20px;
            }
        }
        .products-control {
            position: relative;
            .products {
                max-height: 100px;
                border: 1px solid #ccc;
                min-height: 40px;
                padding: 8px;
                margin-top: 2px;
                width: 50%;
                border-radius: 4px;
                display: inline-block;

                overflow-y: scroll;
                overflow-x: hidden;

                li {
                    display: flex;
                    padding: 4px;
                    justify-content: space-between;
                }
            }
            .add-product {
                position: absolute;
                top: 2.5px;
                right: 0px;
                height: 40px;
            }
        }
    }
`;

const AddProductModal = styled.div`
    position: fixed;
    display: none;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: 100vh;
    background-color: rgb(204 204 204 / 0.2);
    font-size: 1.4rem;
    .body {
        margin-left: auto;
        margin-right: auto;
        width: 50%;
        background-color: #fff;
        padding: 30px;
        margin-top: 80px;
    }
    div {
        ${'' /* margin-top: 20px; */}
    }
    .btn-row {
        display: flex;
        justify-content: end;
        gap: 20px;
    }
`;

const OrderManagement = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [productWillAdd, setProductWillAdd] = useState<IProductOfCart>({
        productId: '',
        productQuantity: 0,
        productSize: 'M',
        productName: '',
        productPrice: 0,
        productImage: '',
        maxQuantity: 0,
    });
    const [formState, setFormState] = useState<FormState>({ method: '' });
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const [addressApi, setAddressApi] = useState<IAddressApi[]>([]);
    const [newOrder, setNewOrder] = useState<IOrder>({
        address: {
            street: '',
            city: 1,
            district: 1,
            wards: 1,
        },
        user_id: '',
        shipmethod: 'Chuyển phát nhanh',
        paymethod: 'Thanh toán khi giao hàng',
        shipStatus: 'Chưa vận chuyển',
        paymentStatus: 'Chưa thanh toán',
        price: 0,
        products: [],
        createdAt: '',
        phone: '',
    });

    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);
    const addProductModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loginInfo.isLogin && loginInfo.userInfo?.isAdmin) {
            document.title = 'Trang quản lý đơn hàng';
            axios.get('https://629c5b853798759975d46095.mockapi.io/api/orders').then((res) => {
                setOrders(res.data);
            });
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/users').then((res) => {
                setUsers(res.data);
                setNewOrder({
                    address: {
                        street: '',
                        city: 1,
                        district: 1,
                        wards: 1,
                    },
                    user_id: res.data[0].id,
                    shipmethod: 'Chuyển phát nhanh',
                    paymethod: 'Thanh toán khi giao hàng',
                    shipStatus: 'Chưa vận chuyển',
                    paymentStatus: 'Chưa thanh toán',
                    price: 0,
                    products: [],
                    createdAt: '',
                    phone: '',
                });
            });
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/products').then((res) => {
                setProducts(res.data);
                setProductWillAdd({
                    productId: res.data[0].id,
                    productName: res.data[0].name,
                    productPrice: res.data[0].price,
                    productQuantity: 1,
                    productSize: 'M',
                    productImage: res.data[0].image,
                    maxQuantity: res.data[0].quantity,
                });
            });
            axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
                setAddressApi(response.data);
            });
        } else if (!loginInfo.isLogin) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, []);
    useEffect(() => {
        if (formState.method === 'delete') {
            axios({
                method: 'delete',
                url: `https://629c5b853798759975d46095.mockapi.io/api/orders/${formState.id}`,
            }).then((res) => {
                const newOrders = orders.filter((order) => {
                    return order.id !== formState.id;
                });
                setOrders(newOrders);
            });
        } else if (formState.method === 'edit') {
            const orderWillChange = orders.find((order) => {
                return order.id === formState.id;
            });
            if (orderWillChange) setNewOrder(orderWillChange);
            if (modalRef.current) modalRef.current.style.display = 'block';
        } else if (formState.method === 'post') {
            if (modalRef.current) modalRef.current.style.display = 'block';
            setNewOrder({
                address: {
                    street: '',
                    city: 1,
                    district: 1,
                    wards: 1,
                },
                user_id: users[0].id || '',
                shipmethod: 'Chuyển phát nhanh',
                paymethod: 'Thanh toán khi giao hàng',
                shipStatus: 'Chưa vận chuyển',
                paymentStatus: 'Chưa thanh toán',
                price: 0,
                products: [],
                createdAt: '',
                phone: '',
            });
        } else {
            if (modalRef.current) modalRef.current.style.display = 'none';
        }
    }, [formState]);

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            validates.isTel(newOrder.phone).valid &&
            validates.isRequired(newOrder.address.street || '') &&
            validates.isEmptyOrder(newOrder).valid
        ) {
            const data = { ...newOrder };
            data.createdAt = data.createdAt.replace('T', ' ');
            if (data.createdAt === '') {
                const date = new Date();
                data.createdAt = `${date.toLocaleString('default', {
                    year: 'numeric',
                })}-${date.toLocaleString('default', {
                    month: '2-digit',
                })}-${date.toLocaleString('default', {
                    day: '2-digit',
                })} ${date.toLocaleString('default', {
                    hour: '2-digit',
                })}: ${date.toLocaleString('default', {
                    minute: '2-digit',
                })}`;
            }

            if (formState.method === 'post') {
                axios({
                    method: 'post',
                    url: 'https://629c5b853798759975d46095.mockapi.io/api/orders',
                    data: data,
                }).then((res) => {
                    window.location.reload();
                });
            } else if (formState.method === 'edit') {
                axios({
                    method: 'put',
                    url: `https://629c5b853798759975d46095.mockapi.io/api/orders/${formState.id}`,
                    data: data,
                }).then((res) => {
                    window.location.reload();
                });
            }
        } else {
            setValidateResults({
                phoneValidation: validates.isTel(newOrder.phone),
                addressValidation: validates.isRequired(newOrder.address.street || ''),
                productValidation: validates.isEmptyOrder(newOrder),
            });
        }
    };
    return loginInfo.isLogin && loginInfo.userInfo?.isAdmin ? (
        <div>
            <Header primary={true}></Header>
            <SideBar></SideBar>
            <StyledMainBlock>
                <h1 className="text-center">Quản lý đơn hàng</h1>
                <Button
                    primary="true"
                    width="200px"
                    className="btn-primary"
                    onClick={() => {
                        setFormState({ method: 'post' });
                    }}
                >
                    Thêm đơn hàng
                </Button>
                <table>
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Mã khách hàng</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Ngày đặt</th>
                            <th>Phương thức vận chuyển</th>
                            <th>Phương thức thanh toán</th>
                            <th>Tình trạng vận chuyển</th>
                            <th>Tình trạng thanh toán</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 &&
                            addressApi.length > 0 &&
                            orders.map((order) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.user_id}</td>
                                        <td>{order.phone}</td>
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
                                        <td>
                                            <Link
                                                to={`/admin/order_management/${order.id}`}
                                                state={{
                                                    id: order.id,
                                                }}
                                            >
                                                <Button className="btn-info">Xem chi tiết</Button>
                                            </Link>
                                        </td>
                                        <td className="text-success">{order.price}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.shipmethod}</td>
                                        <td>{order.paymethod}</td>
                                        <td
                                            className={
                                                order.shipStatus === 'Chưa vận chuyển' ? 'text-danger' : 'text-success'
                                            }
                                        >
                                            {order.shipStatus}
                                        </td>
                                        <td
                                            className={
                                                order.paymentStatus === 'Chưa thanh toán'
                                                    ? 'text-danger'
                                                    : 'text-success'
                                            }
                                        >
                                            {order.paymentStatus}
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => {
                                                    setFormState({ method: 'edit', id: order.id });
                                                    setValidateResults({});
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                className="text-danger"
                                                onClick={() => {
                                                    setFormState({ method: 'delete', id: order.id });
                                                }}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </StyledMainBlock>
            {addressApi.length > 0 && (
                <StyledModal ref={modalRef}>
                    <form onSubmit={handleSubmitForm}>
                        {formState.method === 'post' && <h1>Nhập thông tin đơn hàng</h1>}
                        {formState.method === 'edit' && (
                            <h1>
                                Sửa thông tin đơn hàng <span className="text-danger">#{formState.id}</span>
                            </h1>
                        )}
                        <div className="row gx-5 gy-3">
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="user_id">
                                    Người dùng
                                </Label>
                                <Select
                                    padding="8px"
                                    name="user_id"
                                    value={newOrder ? newOrder.user_id : ''}
                                    onChange={(e) => {
                                        setNewOrder({
                                            ...newOrder,
                                            user_id: e.target.value,
                                        });
                                    }}
                                >
                                    {users &&
                                        users.map((user) => {
                                            return (
                                                <option value={user.id} key={user.id}>
                                                    {user.name} - Mã: {user.id}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="phone">
                                    Số điện thoại
                                </Label>
                                <Input
                                    height="40px"
                                    padding="8px"
                                    margin="2px"
                                    type="text"
                                    id="phone"
                                    value={newOrder ? newOrder.phone : ''}
                                    onChange={(e) => {
                                        setNewOrder({
                                            ...newOrder,
                                            phone: e.target.value,
                                        });
                                    }}
                                    onInput={(e) => {
                                        setValidateResults({
                                            ...validateResults,
                                            phoneValidation: { valid: true },
                                        });
                                    }}
                                    onBlur={(e) => {
                                        setValidateResults({
                                            ...validateResults,
                                            phoneValidation: validates.isTel(e.target.value),
                                        });
                                    }}
                                    placeholder="Số điện thoại"
                                />
                                <span className="text-danger">
                                    {validateResults?.phoneValidation?.valid
                                        ? ''
                                        : validateResults?.phoneValidation?.message}
                                </span>
                            </div>

                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="address">
                                    Số nhà, đường
                                </Label>
                                <Input
                                    height="40px"
                                    padding="8px"
                                    margin="2px"
                                    id="address"
                                    type="text"
                                    value={newOrder ? newOrder?.address?.street : ''}
                                    onChange={(e) => {
                                        const newAddress = { ...newOrder.address };
                                        newAddress.street = e.target.value;
                                        setNewOrder({
                                            ...newOrder,
                                            address: newAddress,
                                        });
                                    }}
                                    onInput={(e) => {
                                        setValidateResults({
                                            ...validateResults,
                                            addressValidation: { valid: true },
                                        });
                                    }}
                                    onBlur={(e) => {
                                        setValidateResults({
                                            ...validateResults,
                                            addressValidation: validates.isRequired(e.target.value),
                                        });
                                    }}
                                    placeholder="Địa chỉ"
                                />
                                <span className="text-danger">
                                    {validateResults?.addressValidation?.valid
                                        ? ''
                                        : validateResults?.addressValidation?.message}
                                </span>
                            </div>
                            <div className="col-6 form_group">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="city">
                                    Tỉnh thành
                                </Label>
                                <Select
                                    padding="8px"
                                    id="city"
                                    value={newOrder.address?.city ? newOrder.address.city : ''}
                                    onChange={(e) => {
                                        const nOrder = { ...newOrder };
                                        nOrder.address.city = Number(e.target.value);
                                        nOrder.address.district = getDistrictOfProvince(
                                            e.target.value,
                                            addressApi,
                                        )[0].code;
                                        nOrder.address.wards = getWardsOfDistrict(
                                            e.target.value,
                                            getDistrictOfProvince(e.target.value, addressApi)[0].code,
                                            addressApi,
                                        )[0].code;
                                        setNewOrder(nOrder);
                                    }}
                                >
                                    {addressApi &&
                                        addressApi.map((province) => {
                                            return (
                                                <option key={province.code} value={province.code}>
                                                    {province.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                            <div className="col-6 form_group">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="district">
                                    Quận huyện
                                </Label>
                                <Select
                                    padding="8px"
                                    id="district"
                                    value={newOrder.address?.district ? newOrder.address.district : ''}
                                    onChange={(e) => {
                                        const nOrder = { ...newOrder };
                                        nOrder.address.district = Number(e.target.value);
                                        nOrder.address.wards = getWardsOfDistrict(
                                            nOrder.address.city,
                                            e.target.value,
                                            addressApi,
                                        )[0].code;
                                        setNewOrder(nOrder);
                                    }}
                                >
                                    {addressApi &&
                                        getDistrictOfProvince(newOrder.address.city, addressApi).map((district) => {
                                            return (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                            <div className="col-6 form_group">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="ward">
                                    Phường xã
                                </Label>
                                <Select
                                    padding="8px"
                                    id="ward"
                                    value={newOrder.address?.wards ? newOrder.address.wards : ''}
                                    onChange={(e) => {
                                        const nOrder = { ...newOrder };
                                        nOrder.address.wards = Number(e.target.value);
                                        setNewOrder(nOrder);
                                    }}
                                >
                                    {addressApi &&
                                        getWardsOfDistrict(
                                            newOrder.address.city,
                                            newOrder.address.district,
                                            addressApi,
                                        ).map((ward) => {
                                            return (
                                                <option key={ward.code} value={ward.code}>
                                                    {ward.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                            <div className="col-12 ">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="password">
                                    Sản phẩm
                                </Label>
                                <div className="products-control">
                                    <ul className="products ">
                                        {newOrder.products.map((product) => {
                                            return (
                                                <li key={product.productId}>
                                                    {product.productName} / {product.productSize}:{' '}
                                                    {product.productQuantity}
                                                    <Button
                                                        width="20px"
                                                        onClick={() => {
                                                            const nOrder = { ...newOrder };
                                                            const newProducts = newOrder.products.filter((e) => {
                                                                return e.productId !== product.productId;
                                                            });
                                                            newOrder.price -=
                                                                Number(product.productQuantity) *
                                                                Number(product.productSize);
                                                            setNewOrder(nOrder);
                                                        }}
                                                        className="delete-product text-danger"
                                                    >
                                                        Xóa
                                                    </Button>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <Button
                                        primary="true"
                                        width="100px"
                                        className="btn-primary add-product"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (addProductModalRef.current) {
                                                addProductModalRef.current.style.display = 'block';
                                            }

                                            setValidateResults({
                                                ...validateResults,
                                                productValidation: { valid: true },
                                            });
                                        }}
                                    >
                                        Thêm
                                    </Button>
                                </div>
                                <span className="text-danger">
                                    {validateResults?.productValidation?.valid
                                        ? ''
                                        : validateResults?.productValidation?.message}
                                </span>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="price">
                                    Tổng tiền
                                </Label>
                                <Input
                                    height="40px"
                                    padding="8px"
                                    margin="2px"
                                    type="price"
                                    value={newOrder ? newOrder.price : ''}
                                    readOnly
                                    placeholder="Tổng tiền"
                                />
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="title">
                                    Ngày đặt
                                </Label>
                                <Input
                                    height="40px"
                                    padding="8px"
                                    margin="2px"
                                    type="datetime-local"
                                    value={newOrder ? newOrder.createdAt : ''}
                                    onChange={(e) => {
                                        setNewOrder({
                                            ...newOrder,
                                            createdAt: e.target.value,
                                        });
                                    }}
                                    placeholder="Ngày đặt"
                                />
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="shipStatus">
                                    Tình trạng vận chuyển
                                </Label>
                                <Select
                                    padding="8px"
                                    id="shipStatus"
                                    onChange={(e) => {
                                        setNewOrder({
                                            ...newOrder,
                                            shipStatus: e.target.value,
                                        });
                                    }}
                                    value={newOrder ? newOrder.shipStatus : ''}
                                >
                                    <option value="Chưa vận chuyển">Chưa vận chuyển</option>
                                    <option value="Đang giao">Đang giao</option>
                                    <option value="Đã giao">Đã giao</option>
                                </Select>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="paymentStatus">
                                    Tình trạng thanh toán
                                </Label>
                                <Select
                                    padding="8px"
                                    id="paymentStatus"
                                    value={newOrder ? newOrder.paymentStatus : ''}
                                    onChange={(e) => {
                                        setNewOrder({
                                            ...newOrder,
                                            paymentStatus: e.target.value,
                                        });
                                    }}
                                >
                                    <option value="Chưa thanh toán">Chưa thanh toán</option>
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                </Select>
                            </div>
                            <div className="form_action">
                                <Button
                                    secondary="true"
                                    width="100px"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFormState({ method: '' });
                                    }}
                                    className="cancel_btn btn-secondary"
                                >
                                    Hủy
                                </Button>
                                <Button primary="true" width="100px" type="submit" className="btn-primary">
                                    {formState.method === 'post' && 'Thêm'}
                                    {formState.method === 'edit' && 'Sửa'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </StyledModal>
            )}
            {products.length > 0 && (
                <AddProductModal ref={addProductModalRef}>
                    <div className="body">
                        <h1 className="text-center">Thêm sản phẩm</h1>
                        <div>
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="product">
                                Sản phẩm
                            </Label>
                            <Select
                                padding="8px"
                                id="product"
                                value={productWillAdd ? productWillAdd.productId : ''}
                                onChange={(e) => {
                                    const product = products.find((product) => {
                                        return product.id === e.target.value;
                                    });
                                    if (product) {
                                        setProductWillAdd({
                                            productId: product.id as string,
                                            productName: product.name,
                                            productPrice: product.price,
                                            productQuantity: 1,
                                            productSize: 'M',
                                            productImage: product.image,
                                            maxQuantity: product.quantity,
                                        });
                                    }
                                }}
                            >
                                {products &&
                                    products.map((product) => {
                                        return (
                                            <option key={product.id} value={product.id}>
                                                {product.name}
                                            </option>
                                        );
                                    })}
                            </Select>
                        </div>
                        <div>
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="price">
                                Giá
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                id="price"
                                value={productWillAdd ? productWillAdd.productPrice : 0}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="quantity">
                                Số lượng
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="number"
                                value={productWillAdd ? productWillAdd.productQuantity : 1}
                                onChange={(e) => {
                                    setProductWillAdd({
                                        ...productWillAdd,
                                        productQuantity: Number(e.target.value),
                                    });
                                }}
                                id="quantity"
                                min={1}
                                max={productWillAdd ? productWillAdd.maxQuantity : 1000}
                            />
                        </div>

                        <div>
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="size">
                                Size
                            </Label>
                            <Select
                                padding="8px"
                                id="size"
                                value={productWillAdd ? productWillAdd.productSize : 'M'}
                                onChange={(e) => {
                                    setProductWillAdd({
                                        ...productWillAdd,
                                        productSize: e.target.value,
                                    });
                                }}
                            >
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </Select>
                        </div>
                        <div className="btn-row">
                            <Button
                                secondary="true"
                                width="100px"
                                className="btn-secondary"
                                onClick={() => {
                                    if (addProductModalRef.current) addProductModalRef.current.style.display = 'none';
                                    setProductWillAdd({
                                        productId: products[0].id as string,
                                        productName: products[0].name,
                                        productPrice: products[0].price,
                                        productQuantity: 1,
                                        productSize: 'M',
                                        productImage: products[0].image,
                                        maxQuantity: products[0].quantity,
                                    });
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                primary="true"
                                width="100px"
                                className="btn-primary"
                                onClick={() => {
                                    const nOrder = { ...newOrder };
                                    const index = nOrder.products.findIndex((product) => {
                                        return (
                                            product.productId === productWillAdd.productId &&
                                            product.productSize === productWillAdd.productSize
                                        );
                                    });
                                    if (index === -1) {
                                        nOrder.products.push(productWillAdd);
                                    } else {
                                        nOrder.products[index].productQuantity += productWillAdd.productQuantity;
                                    }
                                    nOrder.price +=
                                        Number(productWillAdd.productPrice) * Number(productWillAdd.productQuantity);
                                    setNewOrder(nOrder);
                                    setProductWillAdd({
                                        productId: products[0].id as string,
                                        productName: products[0].name,
                                        productPrice: products[0].price,
                                        productQuantity: 1,
                                        productSize: 'M',
                                        productImage: products[0].image,
                                        maxQuantity: products[0].quantity,
                                    });
                                    if (addProductModalRef.current) addProductModalRef.current.style.display = 'none';
                                }}
                            >
                                Thêm
                            </Button>
                        </div>
                    </div>
                </AddProductModal>
            )}
        </div>
    ) : (
        <div></div>
    );
};

export default OrderManagement;
