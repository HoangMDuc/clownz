/* eslint-disable no-loop-func */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import { ICategory, IProductCard } from '../../interfaces/interfaces';

interface CategoryBanner {
    image?: string;
}

const StyledBanner = styled.div<CategoryBanner>`
    padding-top: 140px;
    width: 100%;
    color: white;
    height: 390px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    ${(props) =>
        props.image &&
        css`
            background-image: url(${props.image});
        `};
`;

const StyledProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 30px;
    padding: 40px 50px 50px;
    border-bottom: 1px solid #ccc;
`;
const Category = () => {
    const categoryId = useLocation().state.id;
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [category, setCategory] = useState<ICategory>();
    const params = useParams();

    useEffect(() => {
        document.title = `${params.category} | CLOWNZⓇ STREETWEAR`;
        if (categoryId == '-1') {
            axios.get(`https://62890e4b10e93797c162141e.mockapi.io/clownz/products`).then((results) => {
                setProducts(results.data);
                setCategory({ ...category, name: 'ALL', image: '/images/banners/page-banner.webp' } as ICategory);
            });
        } else {
            axios
                .get('https://62890e4b10e93797c162141e.mockapi.io/clownz/categories')
                .then((results) => {
                    const cat = results.data.find((category: ICategory) => {
                        return category.id === categoryId;
                    });

                    setCategory(cat);
                    const categories = results.data;
                    let childCategoryIds = [categoryId];
                    let temp = [categoryId];

                    while (temp.length > 0) {
                        let ids: string[] = [];
                        categories.forEach((item: ICategory) => {
                            if (temp.includes(item.parent_category_id)) {
                                ids.push(item.id);
                            }
                        });

                        if (ids.length > 0) {
                            childCategoryIds = childCategoryIds.concat(ids);
                            temp = ids;
                        } else {
                            temp = [];
                        }
                    }
                    return childCategoryIds;
                })
                .then((childCategoryIds) => {
                    axios.get(`https://62890e4b10e93797c162141e.mockapi.io/clownz/products`).then((results) => {
                        var data: IProductCard[] = [];
                        results.data.forEach((product: IProductCard) => {
                            if (childCategoryIds.includes(product.category_id)) {
                                data = [...data, product];
                            }
                        });
                        setProducts(data);
                    });
                });
        }
    }, [categoryId]);

    return (
        <div>
            <Header primary={true}></Header>
            <div className="content">
                {category && (
                    <StyledBanner className="banner" image={category.image}>
                        <h1>{category.name}</h1>
                    </StyledBanner>
                )}
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

export default Category;
