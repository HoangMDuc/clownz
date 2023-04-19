import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import DropDown from '../DropDown/DropDown';
import { IMenu, INavItem } from '../../interfaces/interfaces';

type Props = {
    isCart?: boolean;
    padding?: string;
    dropdown?: IMenu[];
};
const StyledNavItem = styled.div<Props>`
    padding: ${(props) => props.padding || '10px'};
    display: flex;
    column-gap: 6px;
    align-items: center;
    text-transform: uppercase;
    /* justify-content: space-between; */
    color: var(--white);
    text-align: center;
    line-height: 1.6;
    cursor: pointer;
    &:hover > .title {
        color: #dc4e3f;
    }

    .nav-icon-lg {
        display: flex;
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 4px;
        .product_quantity {
            ${(props) => {
                if (props.isCart) {
                    return css`
                        position: absolute;
                        font-size: 1rem;
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        background-color: #000;
                        color: #fff;
                        top: -40%;
                        right: -40%;
                        /* display: none; */
                    `;
                }
            }}
        }
    }
    .nav-icon-sm {
        width: 1.2rem;
        height: 1.2rem;
    }
    position: relative;

    &:hover > .dropdown {
        display: block;
    }
`;

const NavItem = ({
    iconLeft,
    iconRight,
    children,
    padding,
    dropdown,
    position,
    to,
    href,
    id,
    hMouseOver,
    hMouseLeave,
    isCart,
    productQuantity,
    ...props
}: INavItem) => {
    // console.log(children, 'render');
    return (
        <StyledNavItem
            isCart={isCart}
            onMouseLeave={hMouseLeave}
            onMouseOver={hMouseOver}
            padding={padding}
            dropdown={dropdown}
            {...props}
        >
            {iconLeft && (
                <div className="nav-icon-lg">
                    {' '}
                    <FontAwesomeIcon icon={iconLeft}></FontAwesomeIcon>
                    <span className="product_quantity">{isCart === true ? productQuantity : ''}</span>
                </div>
            )}
            {to && (
                <Link to={to} state={{ id: id }} className="title">
                    {children}
                </Link>
            )}
            {href && (
                <a href={href} className="title">
                    {children}
                </a>
            )}
            {iconRight && <FontAwesomeIcon icon={iconRight} className="nav-icon-sm"></FontAwesomeIcon>}
            {dropdown && dropdown?.length > 0 && (
                <DropDown dropdown={dropdown} className="dropdown" position={position}></DropDown>
            )}
        </StyledNavItem>
    );
};

export default NavItem;
