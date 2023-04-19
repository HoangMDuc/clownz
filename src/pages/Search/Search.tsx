import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard/ProductCard';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import Input from '../../components/Input/Input';
import { IProductCard } from '../../interfaces/interfaces';

const StyledProductList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 50px 30px;
    padding: 140px 50px 50px;
    border-bottom: 1px solid #ccc;
`;
const ErrorBlock = styled.div`
    padding: 140px 50px 50px;
    text-align: center;
    h1 {
        margin-top: 30px;
        text-transform: uppercase;
        color: var(--primary-color);
        font-weight: 400;
        font-size: 2.2rem;
        margin-bottom: 20px;
    }
    p {
        font-size: 1.4rem;
        color: var(--primary-color);
        font-weight: 400;
        margin-bottom: 15px;
    }
    .search-body {
        width: 100%;
        display: flex;
        justify-content: center;
        button {
            padding: 12px 20px;
            color: #fff;
            background-color: #dc4e3f;
            border: 1px solid #dc4e3f;
            outline: none;
        }
    }
`;

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const query = searchParams.get('products');
    const [products, setProducts] = useState<IProductCard[]>([]);
    useEffect(() => {
        document.title = `${query} - Tìm kiếm | CLOWNZⓇ STREETWEAR`;
        axios.get(`https://62890e4b10e93797c162141e.mockapi.io/products?name=${query}`).then((results) => {
            setProducts(results.data);
        });
    }, [query]);
    useEffect(() => {
        if (searchValue.trim() !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [searchValue]);
    return (
        <div>
            <Header primary={true}></Header>
            {products && products.length > 0 && (
                <StyledProductList>
                    {products.map((product: IProductCard) => {
                        return <ProductCard product={product} key={product.id}></ProductCard>;
                    })}
                </StyledProductList>
            )}
            {products.length === 0 && (
                <ErrorBlock>
                    <h1>Không tìm thấy bất kỳ kết quả nào với từ khóa trên</h1>
                    <p>Vui lòng nhập từ khóa tìm kiếm khác</p>
                    <div className="search-body">
                        <Input
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            color="#000"
                            width="50%"
                            padding="12px"
                            margin="0 5px 0 0"
                            border="1px solid rgb(229, 229, 229)"
                            radius="none"
                            placeholder="Bạn cần tìm kiếm gì?"
                        />
                        {isDisabled ? (
                            <button disabled>
                                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                            </button>
                        ) : (
                            <button>
                                <Link to={`/search?products=${searchValue}`}>
                                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                </Link>
                            </button>
                        )}
                    </div>
                </ErrorBlock>
            )}
            <Footer></Footer>
        </div>
    );
};

export default Search;
