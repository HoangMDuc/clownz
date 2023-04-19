import styled, { css } from 'styled-components';
import { InputType } from '../../interfaces/interfaces';
const StyledInput = styled.input<InputType>`
    height: ${(props) => props.height || 'unset'};
    outline: none;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
    width: ${(props) => props.width || '100%'};
    font-size: ${(props) => props.fontsize || '1.4rem'};
    padding: ${(props) => props.padding || '0px'};
    margin: ${(props) => props.margin || '0px'};
    border: ${(props) => props.border || '1px solid #ccc'};
    color: ${(props) => props.color || '#000'};
    text-align: ${(props) => props.textAlign || 'start'};
    border-radius: ${(props) => (props.radius === 'none' ? 'unset' : '4px')};
    ::placeholder {
        color: #ccc;
    }
    ${(props) => {
        return props.type === 'radio' || props.type === 'checkbox'
            ? css`
                  width: unset;
              `
            : css``;
    }};
    &.invalid ~ .error-message {
        display: block;
    }
`;

const Input = ({
    value = '',
    placeholder,
    id,
    type = 'text',
    width = '100%',
    inputRef,
    onBlur,
    onInput,
    onChange,
    ...props
}: InputType) => {
    return (
        <StyledInput
            value={value}
            id={id}
            width={width}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onInput}
            ref={inputRef}
            {...props}
        ></StyledInput>
    );
};

export default Input;
