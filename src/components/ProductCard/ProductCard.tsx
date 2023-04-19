import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../Button/Button';
import { IProductCard } from '../../interfaces/interfaces';
const StyledProductCard = styled.div`
    position: relative;
    color: #828282;

    img {
        width: 100%;
    }
    .product-info {
        width: 100%;

        .product-name {
            margin: 20px 0 5px;
            font-size: 2rem;
            font-weight: 400;
        }
        .product-title {
            font-size: 1.6rem;
            font-weight: 400;
            margin-bottom: 10px;
        }
        .product-price {
            font-size: 1.6rem;
            font-weight: 500;
        }
    }
    .product-details-overlay {
        position: absolute;
        /* width: 100%; */
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        height: 0;
        overflow: hidden;
        transition: 0.3s ease-in-out;

        background: #fff;
        color: #1c1c1c;

        &:hover {
            background-color: #000;
            color: var(--white);
        }
    }
    &:hover .product-details-overlay {
        height: 46px;
    }
    &:hover {
        color: var(--white);
    }
`;
const ProductCard = ({ product }: { product: IProductCard }) => {
    return (
        <StyledProductCard className="product-card">
            <Link to={`/product_details/${product.name}`} state={{ id: product.id }}>
                <img src={product.image} loading="lazy" alt="BOTTOM" />
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>

                    <p className="product-title">{product.title}</p>
                    <p className="product-price">
                        {product.price} <span>đ</span>
                    </p>
                    <div className="product-details-overlay">
                        <Button
                            primary="true"
                            fw="500"
                            fontsize="1.3rem"
                            textAlign="center"
                            width="100%"
                            height="inherit"
                        >
                            Chi tiết
                        </Button>
                    </div>
                </div>
            </Link>
        </StyledProductCard>
    );
};

export default ProductCard;
