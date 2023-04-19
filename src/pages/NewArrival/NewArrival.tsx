import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import { IProductCard } from '../../interfaces/interfaces';

const StyledBanner = styled.div`
    padding-top: 140px;
    width: 100%;
    color: white;
    height: 390px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    background-image: url('/images/banners/page-banner.webp');
`;

const StyledProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 30px;
    padding: 40px 50px 50px;
    border-bottom: 1px solid #ccc;
`;
const NewArrival = () => {
    const [products, setProducts] = useState<IProductCard[]>([]);

    useEffect(() => {
        document.title = 'New Arrival | CLOWNZⓇ STREETWEAR';
        axios
            .get('https://62890e4b10e93797c162141e.mockapi.io/clownz/products?p=1&l=10&sortedBy=date&order=desc')
            .then((results) => {
                setProducts(results.data);
            });
    }, []);
    return (
        <div>
            <Header primary={true}></Header>

            <div>
                <StyledBanner className="banner">
                    <h1>NEW ARRIVAL</h1>
                </StyledBanner>
                <StyledProductList>
                    {products &&
                        products.map((product) => {
                            return <ProductCard product={product} key={product.id}></ProductCard>;
                        })}
                </StyledProductList>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default NewArrival;
