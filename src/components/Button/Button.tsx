import styled, { css } from 'styled-components';
import { TypeButton } from '../../interfaces/interfaces';

const StyledButton = styled.button<TypeButton>`
    outline: none;
    background-color: ${(props) => props.backgroundColor || 'transparent'};
    cursor: pointer;
    color: ${(props) => (props.color ? props.color : '')};
    text-align: ${(props) => props.textAlign || 'start'};
    font-family: ${(props) => props.fontFamily || 'inherit'};
    font-size: ${(props) => props.fontsize || 'inherit'};
    text-transform: uppercase;
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '40px'};
    border-radius: ${(props) => props.radius || 'unset'};
    border: ${(props) => props.border || 'none'};
    padding: ${(props) => props.padding || '0px'};
    margin: ${(props) => props.margin || '0px'};
    font-weight: ${(props) => props.fw || 'unset'};
    ${(props) => {
        if (props.primary === 'true') {
            return css`
                text-align: center;

                padding: 0 28px;
                background-color: #000 !important;
                border: none;
                color: white !important;
                text-transform: uppercase;
                font-size: 1.4rem;
                &:hover {
                    background-color: #fff !important;
                    border: 1px solid #000;
                    color: #000 !important  ;
                }
            `;
        }
    }}
    ${(props) => {
        if (props.secondary === 'true') {
            return css`
                padding: 0 15px;
                border-radius: 3px;
                border: solid 1px #ebebeb;
                font-size: 1.4rem;
                text-align: center;
                background-color: #787171;
                &:hover {
                    opacity: 0.8;
                    background-color: #9e9e9e;
                    color: #fff;
                }
            `;
        }
    }}}
`;

const Button = ({ children, className, onClick, type = 'button', id, ...props }: TypeButton) => {
    return (
        <StyledButton
            children={children}
            onClick={onClick}
            type={type}
            id={id}
            className={className}
            {...props}
        ></StyledButton>
    );
};

export default Button;
