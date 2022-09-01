import React from 'react';
import { faLocationDot, faPhone, faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import NavItem from '../../components/NavItem/NavItem';
import Nav from '../../components/Nav/Nav';
import { Link } from 'react-router-dom';
const StyledSearchForm = styled.div`
    display: none;
    position: absolute;
    width: 250px;
    padding: 10px;
    /* top: 100%; */
    z-index: 999;
    background-color: #fff;
    right: 0;
    border: 1px solid #ebebeb;
    .search-body {
        display: flex;
        width: 100%;
        column-gap: 4px;
        font-size: 1.4rem;
        input {
            height: 40px;
            outline: none;
            width: 168px;
            padding-left: 10px;
        }
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

const StyledHeader = styled.header`
    width: 100%;
    position: fixed;
    z-index: 10;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: transparent;
    line-height: 2.38rem;

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

export default function Header() {
    return (
        <StyledHeader>
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
                    <a href="./">
                        <img
                            className="logo"
                            src="https://bizweb.dktcdn.net/100/414/728/themes/867455/assets/logo.png?1661616129384"
                            alt=""
                        />
                    </a>
                    <div className="header-item">
                        <div className="search">
                            <NavItem padding="20px" iconLeft={faSearch} to="/search"></NavItem>
                            <StyledSearchForm>
                                <div className="search-body">
                                    <input type="text" name="" id="" placeholder="Nhập từ khóa" />
                                    <button>
                                        <Link to="/search:param">Tìm kiếm</Link>
                                    </button>
                                </div>
                            </StyledSearchForm>
                        </div>

                        <NavItem padding="20px" iconLeft={faUser} to="/account">
                            Tài khoản
                        </NavItem>

                        <NavItem padding="20px" iconLeft={faShoppingBag} to="/shopping_cart">
                            Giỏ hàng
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
