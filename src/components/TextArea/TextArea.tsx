import React from 'react';
import styled from 'styled-components';
import { TypeTextarea } from '../../interfaces/interfaces';
const StyledTextArea = styled.textarea<TypeTextarea>`
    outline: none;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '40px'};
    border-radius: ${(props) => (props.radius === 'none' ? 'none' : '4px')};
    border: ${(props) => props.border || '1px solid #ccc'};
    padding: ${(props) => props.padding || '0px'};
    margin: ${(props) => props.margin || '2px'};
`;
const TextArea = ({
    children,
    cols = 30,
    rows = 10,
    className,
    placeholder,
    value,
    ref,
    name,
    onChange,
    id,
    ...props
}: TypeTextarea) => {
    return (
        <StyledTextArea
            children={children}
            cols={cols}
            rows={rows}
            className={className}
            value={value}
            ref={ref}
            name={name}
            placeholder={placeholder}
            id={id}
            onChange={onChange}
            {...props}
        ></StyledTextArea>
    );
};

export default TextArea;
