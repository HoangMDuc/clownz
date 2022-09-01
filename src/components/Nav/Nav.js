import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import NavItem from '../NavItem/NavItem';
const dropdown = [
    { title: 'abc', to: '/abc', submenu: [{ title: '12', to: '/12' }] },
    { title: '123', to: '/123' },
];
// const dropdown = [{ title: 'abc' }, { title: '123' }];
const Nav = () => {
    return (
        <div className="nav">
            <NavItem padding="10px 20px" to="/">
                Trang chủ
            </NavItem>
            <NavItem padding="10px 20px" to="/about">
                Giới thiệu
            </NavItem>
            <NavItem iconRight={faAngleDown} dropdown={dropdown} to="/collections/all">
                Sản phẩm
            </NavItem>
            <NavItem padding="10px 20px" iconRight={faAngleDown} to="/new-arrival">
                New Arrival
            </NavItem>
            <NavItem padding="10px 20px" to="/bst">
                BST
            </NavItem>
            <NavItem padding="10px 20px" to="/contact">
                Liên Hệ
            </NavItem>
        </div>
    );
};

export default Nav;
