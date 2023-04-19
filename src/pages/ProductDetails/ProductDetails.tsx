import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useReducer } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../contexts/CartContext';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import Input from '../../components/Input/Input';
import { IProductCard, IProductOfCart } from '../../interfaces/interfaces';

const StyledProductCard = styled.div`
    padding: 140px 70px 50px;
    display: flex;
    border-bottom: 1px solid #ccc;
    .product-img {
        padding-right: 40px;
        width: 1000px;
        img {
            width: 100%;
        }
    }
    .product-info {
        .product-name {
            font-size: 2.5rem;
            color: var(--primary-color);
            border-bottom: 1px dashed #ccc;
            padding-bottom: 10px;
        }
        .product-price {
            font-weight: 800;
            font-size: 1.8rem;
            padding: 10px 0;
            margin-bottom: 10px;
            border-bottom: 1px dashed #ccc;
        }
        .product-quantity {
            font-size: 1.6rem;
            margin-bottom: 20px;
            .product-status {
                color: #dc4e3f;
            }
        }

        .product-sizes {
            font-size: 1.6rem;
            margin-bottom: 20px;
            .product-size {
                cursor: pointer;
                padding: 4px;
                margin: 0 4px;
                width: 40px;
                text-align: center;
                display: inline-block;
                position: relative;
                &.active {
                    border: 1px solid #000;
                    .select-icon {
                        display: block;
                    }
                }
                &:hover {
                    opacity: 0.8;
                }
                .select-icon {
                    display: none;
                    position: absolute;
                    width: 14px;
                    bottom: 0;
                    right: 0;
                }
            }
        }
        .quantity-purchased {
            font-size: 1.6rem;
            .control-quantity {
                display: inline-block;
                border: 1px solid #000;
                /* font-size: 2rem; */
                margin-bottom: 20px;
                .decrease {
                    width: 30px;
                    border: none;
                    padding: 6px 10px;
                    cursor: pointer;
                    border-right: 1px solid #000;
                    background-color: transparent;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:disabled {
                        cursor: auto;
                        background-color: rgba(204, 204, 204, 0.25);
                    }
                }

                .increase {
                    width: 30px;
                    border: none;
                    cursor: pointer;
                    border-left: 1px solid #000;
                    padding: 6px 10px;
                    background-color: transparent;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:disabled {
                        cursor: auto;
                        background-color: rgba(204, 204, 204, 0.25);
                    }
                }
            }
        }
        .buy-now {
            width: 100%;
            height: 60px;
            background-color: #ff0000b8;
            color: #fff;
            border: none;
            font-size: 1.6rem;
            text-transform: uppercase;
            margin-bottom: 30px;
            cursor: pointer;
        }
        .sizes-img {
            width: 500px;
            margin-bottom: 20px;
            img {
                width: 100%;
            }
        }

        .product-descriptions {
            font-size: 1.6rem;
            b {
                font-size: 1.6rem;
                display: inline-block;
                margin-bottom: 20px;
            }
            .description {
                margin-bottom: 10px;
                line-height: 1.6;
            }
        }
    }
`;
const sizes = [
    {
        id: 'M',
        name: 'M',
    },
    {
        id: 'L',
        name: 'L',
    },
    {
        id: 'XL',
        name: 'XL',
    },
    {
        id: 'XXL',
        name: 'XXL',
    },
];
interface Action {
    type: string;
    payload?: {
        productQuantity?: number;
        size?: string;
    };
}

const reducer = (state: IProductOfCart, action: Action): IProductOfCart => {
    switch (action.type) {
        case 'DECREASE': {
            return { ...state, productQuantity: state.productQuantity - 1 };
        }
        case 'INCREASE': {
            return { ...state, productQuantity: state.productQuantity + 1 };
        }
        case 'SELECT_SIZE': {
            return { ...state, productSize: action?.payload?.size || 'M' };
        }

        default:
            return state;
    }
};
const ProductDetails = () => {
    const { cart, setCart } = useContext(CartContext);
    const id = useLocation().state.id;
    const params = useParams();

    const [product, setProduct] = useState<IProductCard>();
    const [productWillBuy, dispatch] = useReducer(reducer, {
        productId: id,
        productQuantity: 1,
        productSize: 'M',
        productName: '',
        productPrice: 0,
        productImage: '',
        maxQuantity: 0,
    });

    useEffect(() => {
        document.title = `${params.product_name} | CLOWNZⓇ STREETWEAR`;
        axios.get(`https://62890e4b10e93797c162141e.mockapi.io/clownz/products/${id}`).then((result) => {
            setProduct(result.data);
        });
    }, [id]);

    return (
        <div>
            <Header primary={true}></Header>
            {product && (
                <StyledProductCard>
                    <div className="product-img">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="product-info">
                        <h1 className="product-name">{product.name}</h1>
                        <p className="product-price">{product.price}đ</p>
                        <p className="product-quantity">
                            <strong>Tình trạng:</strong>{' '}
                            <span className="product-status">
                                {product.quantity > 0 ? `Còn hàng (${product.quantity})` : 'Đã hết'}
                            </span>
                        </p>
                        <div className="product-sizes">
                            <strong>Size:</strong>
                            {sizes.map((item) => {
                                return (
                                    <span
                                        className={`product-size ${
                                            productWillBuy.productSize === item.name ? 'active' : ''
                                        }`}
                                        onClick={() => dispatch({ type: 'SELECT_SIZE', payload: { size: item.name } })}
                                    >
                                        {item.name}
                                        <img src="/images/sizes/select-pro.webp" className="select-icon" alt="" />
                                    </span>
                                );
                            })}
                        </div>
                        <div className="quantity-purchased">
                            <strong>Số lượng: </strong>
                            <div className="control-quantity">
                                <button
                                    className="decrease"
                                    disabled={productWillBuy.productQuantity > 1 ? false : true}
                                    onClick={() => dispatch({ type: 'DECREASE' })}
                                >
                                    -
                                </button>
                                <Input
                                    fontsize="1.6rem"
                                    width="40px"
                                    margin="0 0 0 20px"
                                    color="inherit"
                                    type="number"
                                    radius="none"
                                    border="none"
                                    readOnly
                                    value={productWillBuy.productQuantity}
                                    disabled={product.quantity > 0 ? false : true}
                                />
                                <button
                                    className="increase"
                                    disabled={productWillBuy.productQuantity === product.quantity ? true : false}
                                    onClick={() => dispatch({ type: 'INCREASE' })}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const newCart = { ...cart };
                                newCart.total_price += Number(product.price) * Number(productWillBuy.productQuantity);
                                const index = newCart.products.findIndex((product: IProductOfCart) => {
                                    return (
                                        product.productId == productWillBuy.productId &&
                                        product.productSize === productWillBuy.productSize
                                    );
                                });
                                if (index === -1) {
                                    newCart.products = [
                                        ...newCart.products,
                                        {
                                            ...productWillBuy,
                                            productName: product.name,
                                            productPrice: product.price,
                                            productImage: product.image,
                                            maxQuantity: product.quantity,
                                        },
                                    ];
                                } else {
                                    newCart.products[index].productQuantity += productWillBuy.productQuantity;
                                }

                                localStorage.setItem('cart', JSON.stringify(newCart));
                                setCart(newCart);
                            }}
                            className="buy-now"
                        >
                            Mua ngay
                        </button>
                        <div className="sizes-img">
                            <img src="/images/sizes/sizes.webp" alt="" />
                        </div>
                        <div className="product-descriptions">
                            <b>Mô tả:</b>
                            <div>
                                {product.description.split('\n').map((description, index) => {
                                    return (
                                        <p key={index} className="description">
                                            - {description}
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </StyledProductCard>
            )}
            <Footer></Footer>
        </div>
    );
};

export default ProductDetails;
