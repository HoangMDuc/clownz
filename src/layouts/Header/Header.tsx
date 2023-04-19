import React, { useContext, useEffect, useState } from 'react';
import {
    faLocationDot,
    faPhone,
    faRightFromBracket,
    faSearch,
    faShoppingBag,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { css } from 'styled-components';
import NavItem from '../../components/NavItem/NavItem';
import Nav from '../../components/Nav/Nav';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import { CartContext } from '../../contexts/CartContext';
import Input from '../../components/Input/Input';
import { LoginContext } from '../../contexts/LoginContext';
const StyledSearchForm = styled.div`
    display: none;
    position: absolute;
    width: 250px;
    padding: 10px;
    /* top: 100%; */
    z-index: 80;
    background-color: #fff;
    right: 0;
    border: 1px solid #ebebeb;
    .search-body {
        display: flex;
        width: 100%;
        column-gap: 4px;
        font-size: 1.4rem;
        button {
            width: 100px;
            border: none;
            background-color: #ebebeb;
            * {
                background-color: inherit;
            }
        }
    }
    &::before {
        content: '';
        position: absolute;
        top: -30%;
        width: 250px;
        height: 30px;
    }
`;

const StyledAccountBlock = styled.div`
    font-size: 1.4rem;
    position: relative;
    text-transform: uppercase;
    &:hover .account-control {
        display: block;
    }
    .account-control {
        z-index: 9;
        border: 1px solid #ccc;
        border-top: none;
        display: none;
        position: absolute;
        width: 140px;
    }
`;
interface Props {
    primary: boolean;
    show: boolean;
}
const StyledHeader = styled.header<Props>`
    width: 100%;
    position: fixed;
    z-index: 10;
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2.38rem;
    ${(props) =>
        props.primary
            ? css`
                  & * {
                      background-color: #fff;
                      color: var(--primary-color);
                  }
                  & .logo {
                      filter: unset;
                  }
                  &:hover {
                      border-bottom: 1px solid #000;
                  }
              `
            : css`
                  background-color: transparent;
                  color: var(--white) !important;
                  &:hover * {
                      background-color: #fff;
                      color: var(--primary-color);
                  }
                  &:hover .logo {
                      filter: unset;
                  }

                  & .logo {
                      filter: invert(1);
                  }
              `}

    ${(props) => {
        let styles = '';
        props.show
            ? (styles = `
                  & * {
                      background-color: #fff;
                      color: var(--primary-color);
                  }
                  & .logo {
                      filter: unset;
                  }
              `)
            : (styles = `
                  background-color: transparent;
                  color: var(--white) !important;
                  & .logo {
                      filter: invert(1);
                  }
              `);
        if (props.primary) {
            return props.show
                ? css`
                      ${styles}
                      & .logo {
                          filter: unset;
                      }
                      border-bottom: 1px solid #000;
                  `
                : css`
                      ${styles}
                      & .logo {
                          filter: unset;
                      }
                  `;
        } else {
            return css`
                ${styles}
            `;
        }
    }}

    .header-inner {
        width: 100%;
        padding: 0 15px;

        .header-top {
            padding: 0 50px;
            margin: 0 -15px;
            display: flex;
            column-gap: 30px;
            justify-content: space-between;
            align-items: center;

            .header-item {
                display: flex;
                /* width: 33.333%; */
                align-items: center;
                &:last-child {
                    justify-self: end;
                }
            }
        }
        .nav {
            display: flex;
            justify-content: center;
        }
        .search {
            position: relative;
            &:hover ${StyledSearchForm} {
                display: block;
            }
        }
    }
`;

export default function Header({ primary }: { primary: boolean }) {
    const { cart } = useContext(CartContext);
    const [show, setShow] = useState<boolean>(false);
    const [showCart, setShowCart] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    // const [loginInfo, setLoginInfo] = useState(() => {
    //     const data = sessionStorage.getItem('loginInfo');
    //     if (data) {
    //         return JSON.parse(data);
    //     }
    //     return null;
    // });
    const { loginInfo } = useContext(LoginContext);
    const searchRef = useRef<HTMLInputElement>(null);
    const cartRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShow(true);
            } else {
                setShow(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (searchValue.trim() !== '') {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [searchValue]);

    const handleMouseOver = () => {
        setShowCart(true);
    };
    const handleMouseLeave = () => {
        setShowCart(false);
    };
    return (
        <StyledHeader show={show} primary={primary}>
            <div className="header-inner">
                <div className="header-top">
                    <div className="header-item">
                        <NavItem padding="20px" iconLeft={faLocationDot} to="/contact">
                            Địa chỉ: Việt Nam
                        </NavItem>
                        <NavItem padding="20px" iconLeft={faPhone} href="tel:058660 8660">
                            SĐT: 058660 8660
                        </NavItem>
                    </div>
                    <Link to="/">
                        <img
                            className="logo"
                            src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/logo.png?1661616129384"
                            alt=""
                        />
                    </Link>
                    <div className="header-item">
                        <div className="search">
                            <NavItem padding="20px" iconLeft={faSearch} to="/search"></NavItem>
                            <StyledSearchForm>
                                <div className="search-body">
                                    <Input
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        inputRef={searchRef}
                                        type="text"
                                        height="40px"
                                        padding="4px 6px"
                                        placeholder="Nhập từ khóa"
                                    ></Input>
                                    {isDisabled ? (
                                        <button disabled>Tìm kiếm</button>
                                    ) : (
                                        <button>
                                            <Link to={`/search?products=${searchValue}`}>Tìm kiếm</Link>
                                        </button>
                                    )}
                                </div>
                            </StyledSearchForm>
                        </div>

                        {loginInfo && loginInfo.isLogin === true ? (
                            <StyledAccountBlock>
                                {loginInfo.userInfo['name']}
                                <div className="account-control">
                                    <NavItem padding="20px" iconLeft={faUser} to="/account">
                                        Thông tin
                                    </NavItem>
                                    {loginInfo.userInfo['isAdmin'] && (
                                        <NavItem
                                            padding="20px"
                                            iconLeft={faRightFromBracket}
                                            to="/admin/product_management"
                                        >
                                            Trang quản trị
                                        </NavItem>
                                    )}
                                    <NavItem padding="20px" iconLeft={faRightFromBracket} to="/logout">
                                        Đăng xuất
                                    </NavItem>
                                </div>
                            </StyledAccountBlock>
                        ) : (
                            <NavItem padding="20px" to="/login">
                                Đăng Nhập
                            </NavItem>
                        )}

                        <NavItem
                            hMouseLeave={handleMouseLeave}
                            hMouseOver={handleMouseOver}
                            padding="20px"
                            iconLeft={faShoppingBag}
                            to="/shopping_cart"
                            isCart={true}
                            productQuantity={cart && cart.products.length}
                        >
                            Giỏ hàng
                            {showCart && <ShoppingCart ref={cartRef}></ShoppingCart>}
                        </NavItem>
                    </div>
                </div>
                <div className="nav-container">
                    <Nav></Nav>
                </div>
            </div>
        </StyledHeader>
    );
}
