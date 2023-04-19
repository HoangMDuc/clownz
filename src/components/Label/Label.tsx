import React from 'react';
import styled from 'styled-components';
import { TypeLabel } from '../../interfaces/interfaces';

const StyledLabel = styled.label<TypeLabel>`
    font-size: ${(props) => props.fontsize || '1.4rem'};
    padding: ${(props) => props.padding || '0px'};
    margin: ${(props) => props.margin || '0px'};
    color: ${(props) => props.color || '#000'};
    letter-spacing: ${(props) => props.lSpacing || '1.5px'};
    font-weight: ${(props) => props.fw || '500'};
    display: ${(props) => props.display || 'block'};
    text-transform: ${(props) => props.textTransform || 'capitalize'};
`;

const Label = ({ children, htmlFor, ...props }: TypeLabel) => {
    return <StyledLabel children={children} htmlFor={htmlFor} {...props}></StyledLabel>;
};

export default Label;
