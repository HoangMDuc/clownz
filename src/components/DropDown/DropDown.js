import React from 'react';
import NavItem from '../NavItem/NavItem';
import styled, { css } from 'styled-components';

const StyledDropDown = styled.div`
    display: none;
    position: absolute;
    z-index: 100;
    width: 250px;

    ${(props) => {
        switch (props.position) {
            case 'left': {
                return css`
                    right: 100%;
                `;
            }
            case 'right': {
                return css`
                    left: 100%;
                `;
            }
            default: {
                return css`
                    top: 100%;
                `;
            }
        }
    }}
    && * {
        background-color: rgba(255, 255, 255, 0.95);
    }

    box-shadow: 0 0 10px 1px rgb(0 0 0 / 15%);
`;

const DropDown = ({ dropdown, position, ...props }) => {
    // console.log(dropdown);
    return (
        <StyledDropDown {...props} position={position}>
            {dropdown &&
                dropdown.map((item, index) => {
                    console.log(item.to, item.href);
                    if (item.submenu) {
                        return (
                            <NavItem dropdown={item.submenu} key={index} position="right" to={item.to} href={item.href}>
                                {item.title}
                            </NavItem>
                        );
                    }
                    return (
                        <NavItem key={index} to={item.to} href={item.href}>
                            {item.title}
                        </NavItem>
                    );
                })}
        </StyledDropDown>
    );
};

export default DropDown;
