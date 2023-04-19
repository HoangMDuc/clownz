import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import NavItem from '../../../components/NavItem/NavItem';
import { LoginContext } from '../../../contexts/LoginContext';

const StyledSideBar = styled.div`
    width: 25%;
    font-size: 1.4rem;
    margin-right: 50px;
    h2 {
        font-size: 1.9rem;
        font-weight: 400;
        margin: 10px 0;
        text-transform: uppercase;
    }
    p {
        margin-bottom: 28px;
    }
`;
const AccountSideBar = () => {
    const { loginInfo } = useContext(LoginContext);
    return (
        <StyledSideBar>
            <h2>TRANG TÀI KHOẢN</h2>
            <p>
                <strong>Xin chào {loginInfo.userInfo.name}!</strong>
            </p>
            <NavItem padding="0px 0px 10px" to="/account">
                Thông tin tài khoản
            </NavItem>
            <NavItem padding="0px 0px 10px" to="/account/orders">
                Đơn hàng của bạn
            </NavItem>
            <NavItem padding="0px 0px 10px" to="/account/changepassword">
                Đổi mật khẩu
            </NavItem>
            <NavItem padding="0px 0px 10px" to="/account/address">
                Sổ địa chỉ
            </NavItem>
        </StyledSideBar>
    );
};

export default AccountSideBar;
