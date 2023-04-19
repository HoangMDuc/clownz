import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../contexts/CartContext';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { IProductOfCart } from '../../interfaces/interfaces';

const StyledMainBlock = styled.div`
    padding-top: 140px;
    .container {
        margin: 30px 90px;
        padding: 0 15px;
        .content {
            padding: 10px 0;
            h2 {
                font-size: 2.6rem;
                letter-spacing: 2.4px;
                color: #1c1c1c;
                font-weight: 400;
                text-transform: uppercase;
            }
            .payment_block {
                p {
                    line-height: 2.2;
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: #1c1c1c;
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 0;
                    &:first-child {
                        border-bottom: 1px solid #ccc;
                    }
                    span {
                        font-weight: 700;
                    }
                    &:nth-child(2) {
                        font-size: 1.8rem;
                    }
                }
                button {
                    width: 100%;
                    height: 50px;
                    margin: 5px 0;
                }
            }
            .product {
                border-bottom: 1px solid #ccc;
                padding: 20px 0;
                .product_image {
                    width: 100%;
                }
                .product_name_block,
                .product_price_block,
                .product_quantity_block {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .product_name_block {
                    flex-direction: column;
                    align-items: unset;
                    padding-left: 25px;
                    p {
                        font-size: 1.4rem;
                        color: rgba(0, 0, 0, 0.9);
                        text-transform: capitalize;
                    }
                    .delete_btn {
                        padding: 10px 0;
                        font-size: 1.3rem;
                        font-style: italic;
                        color: #dc4e3f;
                        text-align: left;
                    }
                }
                .product_price_block {
                    p {
                        font-size: 1.6rem;
                        color: #dc4e3f;
                        font-weight: 500;
                    }
                }
                .product_quantity_block {
                    margin-top: 10px;
                    .product_quantity-increase,
                    .product_quantity-decrease {
                        border: 1px solid #ccc;
                        height: 30px;
                        padding: 0 8px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
`;

const Cart = () => {
    const { cart, setCart } = useContext(CartContext);
    useEffect(() => {
        document.title = 'Giỏ hàng | CLOWNZⓇ STREETWEAR';
    }, []);
    const handleDeleteProduct = (index: number) => {
        const newCart = { ...cart };
        let products = newCart.products;
        const productWillDelete = products[index];
        newCart.total_price -= productWillDelete.productPrice * productWillDelete.productQuantity;
        products.splice(index, 1);
        newCart.products = products;
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };
    return (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <div className="container">
                    <div className="content">
                        <h2>Giỏ Hàng ( {cart.products.length} sản phẩm)</h2>
                        <div className="row">
                            <div className="col-9 products_list">
                                {cart &&
                                    cart.products.map((product: IProductOfCart, index: number) => {
                                        return (
                                            <div key={index} className="row product">
                                                <div className="col-3">
                                                    <img className="product_image" src={product.productImage} alt="" />
                                                </div>
                                                <div className="col-4 product_name_block">
                                                    <p>
                                                        {product.productName} - Size: {product.productSize}
                                                    </p>

                                                    <Button
                                                        fw="700"
                                                        onClick={() => {
                                                            handleDeleteProduct(index);
                                                        }}
                                                        className="delete_btn"
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                                <div className="col-2 product_price_block">
                                                    <p>{product.productPrice}</p>
                                                </div>
                                                <div className="col-3 product_quantity_block">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const newCart = { ...cart };
                                                            newCart.products[index].productQuantity -= 1;
                                                            newCart.total_price -= product.productPrice;
                                                            localStorage.setItem('cart', JSON.stringify(newCart));
                                                            setCart(newCart);
                                                        }}
                                                        className="product_quantity-decrease"
                                                        disabled={product.productQuantity == 1 ? true : false}
                                                    >
                                                        -
                                                    </button>
                                                    <Input
                                                        height="30px"
                                                        width="45px"
                                                        textAlign="center"
                                                        radius="none"
                                                        value={product.productQuantity}
                                                        onChange={(e) => {
                                                            const newCart = { ...cart };
                                                            newCart.products[index].productQuantity = Number(
                                                                e.target.value,
                                                            );
                                                            localStorage.setItem('cart', JSON.stringify(newCart));
                                                            setCart(newCart);
                                                        }}
                                                        readOnly
                                                        type="number"
                                                        name=""
                                                        id=""
                                                    />

                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();

                                                            const newCart = { ...cart };
                                                            newCart.products[index].productQuantity += 1;
                                                            newCart.total_price += product.productPrice;
                                                            localStorage.setItem('cart', JSON.stringify(newCart));
                                                            setCart(newCart);
                                                        }}
                                                        className="product_quantity-increase"
                                                        disabled={
                                                            product.productQuantity == product.maxQuantity
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className="col-3 payment_block">
                                <p>
                                    Tạm tính: <span>{cart.total_price} ₫</span>
                                </p>
                                <p>
                                    Thành tiền: <span className="text-danger">{cart.total_price} ₫</span>
                                </p>
                                <Link to="/checkout">
                                    <Button primary="true" className="btn-primary">
                                        Thanh Toán Ngay
                                    </Button>
                                </Link>
                                <Link to="/collection/all" state={{ id: -1 }}>
                                    <Button primary="true" className="btn-primary">
                                        Tiếp tục mua hàng
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </StyledMainBlock>
            <Footer></Footer>
        </div>
    );
};

export default Cart;
