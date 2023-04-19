import React from 'react';
import styled from 'styled-components';
import { TypeSelect } from '../../interfaces/interfaces';

const StyledSelect = styled.select<TypeSelect>`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.width || '40px'};
    border-radius: ${(props) => (props.radius === 'none' ? 'none' : '4px')};
    border: ${(props) => props.border || '1px solid #ccc'};
    padding: ${(props) => props.padding || '0px'};
    margin: ${(props) => props.margin || '2px'};
`;

const Select = ({ children, name, id, value, onChange, className, ref, ...props }: TypeSelect) => {
    return (
        <StyledSelect name={name} id={id} value={value} onChange={onChange} ref={ref} {...props}>
            {children}
        </StyledSelect>
    );
};

export default Select;
