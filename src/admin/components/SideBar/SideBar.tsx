import {
    faAddressBook,
    faBook,
    faList,
    faNoteSticky,
    faShirt,
    faTruck,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';
import NavItem from '../../../components/NavItem/NavItem';

const NAV_ITEMS = [
    {
        name: 'Quản lý sản phẩm',
        to: '/admin/product_management',
        iconLeft: faShirt,
    },
    {
        name: 'Quản người dùng',
        to: '/admin/user_management',
        iconLeft: faUser,
    },
    {
        name: 'Quản lý đơn hàng',
        to: '/admin/order_management',
        iconLeft: faTruck,
    },
    {
        name: 'Quản lý danh mục',
        to: '/admin/category_management',
        iconLeft: faList,
    },
    {
        name: 'Quản lý địa chỉ khách hàng',
        to: '/admin/address_management',
        iconLeft: faAddressBook,
    },
];

const StyledSideBar = styled.div`
    padding: 65px 30px 100px;
    width: 280px;
    background-color: rgba(204, 204, 204, 0.15) !important;
    border-right: 1px solid #ccc;
    position: fixed;
    height: 100vh;
    font-size: 1.4rem;
    top: 106px;
    & * {
        color: #000 !important;
    }
    h1 {
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 500;
        text-align: center;
        margin-bottom: 20px;
        letter-spacing: 2px;
    }
    .nav_items {
        .nav_item {
            border-bottom: 1px solid #000;
        }
    }
`;

const SideBar = () => {
    return (
        <StyledSideBar>
            <h1>Trang quản trị</h1>
            <ul className="nav_items">
                {NAV_ITEMS &&
                    NAV_ITEMS.map((item, index) => {
                        return (
                            <li key={index} className="nav_item">
                                <NavItem to={item.to} iconLeft={item.iconLeft}>
                                    {item.name}
                                </NavItem>
                            </li>
                        );
                    })}
            </ul>
        </StyledSideBar>
    );
};

export default SideBar;
