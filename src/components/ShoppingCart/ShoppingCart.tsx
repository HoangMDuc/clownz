import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { forwardRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../contexts/CartContext';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { IProductCard, IProductOfCart } from '../../interfaces/interfaces';

const StyledCart = styled.div`
    position: absolute;
    width: 320px;
    box-shadow: 0px 2px 6px 0px rgb(50 50 50 / 33%);
    max-height: 360px;
    /* display: none; */
    right: 0;
    top: 100%;
    z-index: 9999;
    background-color: #fff;
    .cart_body {
        padding: 10px;
        font-size: 1.4rem;
        font-weight: 400;
        .list_products {
            max-height: 250px;
            overflow-y: scroll;
            overflow-x: hidden;
            border-bottom: 1px dashed #ccc;
            .product_block {
                text-align: left;
                padding: 10px 0 20px;
                border-bottom: 1px solid #ccc;
                &:last-child {
                    border-bottom: none;
                }
                .product_image {
                    max-width: 100%;
                    height: auto;
                }
                .product_size {
                    text-transform: capitalize;
                }
                .product_name {
                    color: #000;
                    font-weight: 500;
                    text-transform: lowercase;
                    .delete_btn {
                        float: right;
                        border: none;
                        cursor: pointer;
                        padding: 4px 10px;
                    }
                }
                .product_quantity_block {
                    margin-top: 4px;
                    font-size: 1.4rem;
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
        .total_price {
            margin-top: 10px;
            text-align: left;
            display: flex;
            justify-content: space-between;
        }
        .cart_action {
            display: flex;
            margin-top: 10px;
            justify-content: space-around;
            button {
                width: 145px;
            }
        }
    }
`;

const ShoppingCart = () => {
    const { cart, setCart } = useContext(CartContext);
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
        <StyledCart>
            <div className="cart_body">
                {cart && cart.products.length > 0 && (
                    <div className="list_products">
                        {cart.products.map((product: IProductOfCart, index: number) => {
                            return (
                                <div key={index} className="row product_block gx-4">
                                    <div className="col-4 ">
                                        <img className="product_image" src={product.productImage} alt="" />
                                    </div>
                                    <div className="col-8">
                                        <div className="product_name">
                                            {product.productName}
                                            <button
                                                className="delete_btn"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDeleteProduct(index);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                                            </button>
                                        </div>
                                        <div className="product_price">{product.productPrice}₫</div>
                                        <div className="product_size">Size: {product.productSize}</div>
                                        <div className="product_quantity_block">
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
                                                fontsize="1.rem"
                                                color="#000"
                                                textAlign="center"
                                                radius="none"
                                                value={product.productQuantity}
                                                onChange={(e) => {
                                                    const newCart = { ...cart };
                                                    newCart.products[index].productQuantity = Number(e.target.value);

                                                    localStorage.setItem('cart', JSON.stringify(newCart));
                                                    setCart(newCart);
                                                }}
                                                readOnly
                                                type="number"
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
                                                disabled={product.productQuantity == product.maxQuantity ? true : false}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {cart.products && cart.products.length > 0 && (
                    <div>
                        <p className="total_price">
                            <span>Tổng cộng:</span> <span className="text-danger">{cart.total_price} ₫</span>
                        </p>
                        <div className="cart_action">
                            <Link to="/checkout">
                                <Button width="100px" primary="true">
                                    Thanh toán
                                </Button>
                            </Link>
                            <Link to="/shopping_cart">
                                <Button primary="true" width="100px">
                                    Giỏ hàng
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
                {cart.products && cart.products.length === 0 && <div>Không có sản phẩm nào trong giỏ hàng</div>}
            </div>
        </StyledCart>
    );
};

export default forwardRef(ShoppingCart);
