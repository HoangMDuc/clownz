import React from 'react';
import NavItem from '../NavItem/NavItem';
import styled, { css } from 'styled-components';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { IMenu } from '../../interfaces/interfaces';

type TypeDropDown = {
    position?: string;
    dropdown?: IMenu[];
    ref?: React.RefObject<HTMLDivElement>;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StyledDropDown = styled.div<TypeDropDown>`
    display: none;
    position: absolute;
    z-index: 100;
    width: 220px;
    ${(props) => {
        switch (props.position) {
            case 'left': {
                return css`
                    right: 100%;
                `;
            }
            case 'right': {
                return css`
                    top: 0;
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

const DropDown = ({ dropdown, position, ...props }: TypeDropDown) => {
    return (
        <StyledDropDown {...props} position={position}>
            {dropdown &&
                dropdown.length > 0 &&
                dropdown.map((item) => {
                    if (item.childrens && item.childrens?.length > 0) {
                        return (
                            <NavItem
                                dropdown={item.childrens}
                                iconRight={faAngleRight}
                                position="right"
                                to={`/collection/${item.name}`}
                                href={item.href}
                                key={item.id}
                                id={item.id}
                            >
                                {item.name}
                            </NavItem>
                        );
                    }

                    return (
                        <NavItem key={item.id} to={`/collection/${item.name}`} id={item.id} href={item.href}>
                            {item.name}
                        </NavItem>
                    );
                })}
        </StyledDropDown>
    );
};

export default DropDown;
