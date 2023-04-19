import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import validates from '../../helpers/validate_v2';
import axios from 'axios';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { IUser, TypeValidateResult } from '../../interfaces/interfaces';
import { LoginContext } from '../../contexts/LoginContext';
const StyledLoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 140px 50px 50px;
    h1 {
        text-align: center;
        margin-bottom: 30px;
        text-transform: uppercase;
        font-weight: 400;
        letter-spacing: 2.4px;
    }
    .social-login {
        display: flex;
        justify-content: center;
        gap: 20px;

        .login-icon {
            font-size: 1.6rem;
            padding-right: 30px;
        }
    }
    .form-login {
        width: 70%;

        div {
            margin-bottom: 30px;
            .login-status {
                font-size: 1.4rem;
                margin-bottom: 10px;
                color: red;
            }
        }
    }
    .forget-pw {
        text-align: center;
        color: red;
        font-size: 1.4rem;
        margin-bottom: 20px;
        font-weight: 500;
    }
    .registration-link {
        text-align: center;
        font-size: 1.4rem;
        font-weight: 500;
        text-transform: uppercase;
    }
`;

const Login = () => {
    const [userInfo, setUserInfo] = useState<IUser>({} as IUser);
    const { setLoginInfo } = useContext(LoginContext);
    const [validatesResult, setValidatesResult] = useState<TypeValidateResult>();

    const statusRef = useRef<HTMLParagraphElement>(null);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Đăng nhập | CLOWNZⓇ STREETWEAR';
    }, []);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validates.isEmail(userInfo.email).valid) {
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/users').then((response) => {
                const users = response.data;
                const result = users.find((user: IUser) => {
                    return user.email === userInfo.email && user.password === userInfo.password;
                });
                if (result) {
                    if (statusRef.current) {
                        statusRef.current.textContent = '';
                    }
                    sessionStorage.setItem('loginInfo', JSON.stringify({ isLogin: true, userInfo: result }));
                    setLoginInfo({ isLogin: true, userInfo: result });
                    navigate('/');
                } else {
                    if (statusRef.current) {
                        statusRef.current.textContent = 'Thông tin tài khoản không chính xác';
                    }
                }
            });
        }
    };

    return (
        <div>
            <Header primary={true}></Header>
            <StyledLoginForm>
                <h1>Đăng nhập tài khoản</h1>
                <div className="social-login">
                    <Button
                        backgroundColor="#0657a3"
                        color="#fff"
                        width=" 180px"
                        height="37px"
                        padding="0 12px"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FontAwesomeIcon className="login-icon" icon={faFacebookF}></FontAwesomeIcon>Facebook
                    </Button>
                    <Button
                        backgroundColor="rgb(225, 75, 51)"
                        color="#fff"
                        width=" 180px"
                        height="37px"
                        padding="0 12px"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <FontAwesomeIcon className="login-icon" icon={faGooglePlusG}></FontAwesomeIcon>
                        Google
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="form-login">
                    <div>
                        <p ref={statusRef} className="login-status"></p>
                        <Label textTransform="uppercase" htmlFor="email">
                            Email <span className="text-danger">*</span>
                        </Label>
                        <Input
                            value={userInfo.email}
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            height="50px"
                            type="text"
                            id="email"
                            placeholder="Nhập địa chỉ email"
                            onChange={(e) =>
                                setUserInfo((prevState) => {
                                    return { ...prevState, email: e.target.value };
                                })
                            }
                            onBlur={(e) => {
                                setValidatesResult({
                                    ...validatesResult,
                                    emailValidation: validates.isEmail(e.target.value),
                                });
                            }}
                            onInput={(e) => {
                                setValidatesResult({ ...validatesResult, emailValidation: { valid: true } });
                            }}
                        ></Input>
                        <span className="text-danger">
                            {validatesResult && validatesResult?.emailValidation.valid
                                ? ''
                                : validatesResult?.emailValidation.message}
                        </span>
                    </div>
                    <div>
                        <Label textTransform="uppercase" htmlFor="password">
                            Mật khẩu <span className="text-danger">*</span>
                        </Label>
                        <Input
                            value={userInfo.password}
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            color="#000"
                            height="50px"
                            type="password"
                            id="password"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) =>
                                setUserInfo((prevState) => {
                                    return { ...prevState, password: e.target.value };
                                })
                            }
                        ></Input>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Button height="50px" primary="true" width="50%" type="submit">
                            Đăng nhập
                        </Button>
                    </div>
                    <Link to="/forget">
                        <h5 className="forget-pw">Quên mật khẩu?</h5>
                    </Link>
                    <Link to="/registration">
                        <p className="registration-link">
                            Bạn chưa có tài khoản. Đăng ký <span className="text-danger">tại đây</span>
                        </p>
                    </Link>
                </form>
            </StyledLoginForm>
            <Footer></Footer>
        </div>
    );
};

export default Login;
