import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import DropDown from '../DropDown/DropDown';

const StyledNavItem = styled.div`
    padding: ${(props) => props.padding || '10px'};

    display: flex;
    column-gap: 6px;
    align-items: center;
    text-transform: uppercase;

    color: var(--white);
    text-align: center;
    cursor: pointer;
    &:hover > .title {
        color: #dc4e3f;
    }

    .nav-icon-lg {
        width: 2rem;
        height: 2rem;
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

const NavItem = ({ iconLeft, iconRight, children, padding, dropdown, position, to, href }) => {
    return (
        <StyledNavItem padding={padding} dropdown={dropdown}>
            {iconLeft && <FontAwesomeIcon icon={iconLeft} className="nav-icon-lg"></FontAwesomeIcon>}
            {to && (
                <Link to={to} className="title">
                    {children}
                </Link>
            )}
            {href && (
                <a href={href} className="title">
                    {children}
                </a>
            )}
            {iconRight && <FontAwesomeIcon icon={iconRight} className="nav-icon-sm"></FontAwesomeIcon>}
            {dropdown && <DropDown dropdown={dropdown} className="dropdown" position={position}></DropDown>}
        </StyledNavItem>
    );
};

export default NavItem;
