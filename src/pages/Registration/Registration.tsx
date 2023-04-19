import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import validates from '../../helpers/validate_v2';
import Footer from '../../layouts/Footer/Footer';
import Header from '../../layouts/Header/Header';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Button from '../../components/Button/Button';
import { TypeValidateResult } from '../../interfaces/interfaces';
import { LoginContext } from '../../contexts/LoginContext';

const StyledMainBlock = styled.div`
    padding: 140px 50px 50px;
    form {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.2rem;
        h1 {
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 2.6rem;
        }
        p {
            margin-top: 10px;
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.4rem;
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
        .form-group {
            margin-bottom: 20px;
        }

        .submit-btn {
            margin-left: 50%;
            transform: translateX(-50%);
        }

        .login-btn {
            display: block;
            text-align: center;
            font-size: 1.4rem;
            font-weight: 500;
            margin-top: 20px;
        }
    }
`;

const Registration = () => {
    const [registrationInfo, setRegistrationInfo] = useState({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        password: '',
        date: '',
        isAdmin: false,
    });
    const { setLoginInfo } = useContext(LoginContext);
    useEffect(() => {
        document.title = 'Trang đăng ký | CLOWNZⓇ STREETWEAR';
    }, []);
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const navigate = useNavigate();
    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            validates.isRequired(registrationInfo.firstname).valid &&
            validates.isRequired(registrationInfo.lastname).valid &&
            validates.isTel(registrationInfo.phoneNumber).valid &&
            validates.isEmail(registrationInfo.email).valid &&
            validates.isPassword(registrationInfo.password).valid
        ) {
            axios
                .get(`https://62890e4b10e93797c162141e.mockapi.io/clownz/users?email=${registrationInfo.email}`)
                .then((res) => {
                    if (res.data.length === 0) {
                        const data = { ...registrationInfo };
                        const date = new Date();

                        data.date = `${date.toLocaleString('default', {
                            year: 'numeric',
                        })}-${date.toLocaleString('default', {
                            month: '2-digit',
                        })}-${date.toLocaleString('default', {
                            day: '2-digit',
                        })}`;
                        axios({
                            method: 'post',
                            url: 'https://62890e4b10e93797c162141e.mockapi.io/clownz/users',
                            data: {
                                name: data.firstname + data.lastname,
                                email: data.email,
                                phoneNumber: data.phoneNumber,
                                isAdmin: data.isAdmin,
                                createdAt: data.date,
                                password: data.password,
                            },
                        }).then((res) => {
                            if (res.data) {
                                sessionStorage.setItem(
                                    'loginInfo',
                                    JSON.stringify({
                                        isLogin: true,
                                        userInfo: res.data,
                                    }),
                                );
                                setLoginInfo({
                                    isLogin: true,
                                    userInfo: res.data,
                                });
                                navigate('/');
                            }
                        });
                    } else {
                        setValidateResults({
                            ...validateResults,
                            emailValidation: { valid: false, message: 'Email này đã tồn tại' },
                        });
                    }
                });
        } else {
            setValidateResults({
                firstnameValidation: validates.isRequired(registrationInfo.firstname),
                lastnameValidation: validates.isRequired(registrationInfo.lastname),
                phoneValidation: validates.isTel(registrationInfo.phoneNumber),
                emailValidation: validates.isEmail(registrationInfo.email),
                passwordValidation: validates.isPassword(registrationInfo.password),
            });
        }
    };
    return (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <form onSubmit={handleSubmitForm}>
                    <h1>Đăng ký tài khoản</h1>
                    <p>Nếu chưa có tài khoản vui lòng đăng ký tại đây</p>
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
                    <div className="form-group">
                        <Label textTransform="uppercase" htmlFor="firstname">
                            Họ <span className="text-danger">*</span>
                        </Label>
                        <Input
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            height="50px"
                            value={registrationInfo ? registrationInfo.firstname : ''}
                            onChange={(e) => setRegistrationInfo({ ...registrationInfo, firstname: e.target.value })}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    firstnameValidation: validates.isRequired(e.target.value),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    firstnameValidation: {
                                        valid: true,
                                    },
                                });
                            }}
                            type="text"
                            placeholder="Họ"
                            id="firstname"
                        />
                        <span className="text-danger">
                            {validateResults?.firstnameValidation?.valid
                                ? ''
                                : validateResults?.firstnameValidation?.message}
                        </span>
                    </div>
                    <div className="form-group">
                        <Label textTransform="uppercase" htmlFor="lastname">
                            Tên <span className="text-danger">*</span>
                        </Label>
                        <Input
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            height="50px"
                            type="text"
                            placeholder="Tên"
                            id="lastname"
                            value={registrationInfo ? registrationInfo.lastname : ''}
                            onChange={(e) => setRegistrationInfo({ ...registrationInfo, lastname: e.target.value })}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    lastnameValidation: validates.isRequired(e.target.value),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    lastnameValidation: {
                                        valid: true,
                                    },
                                });
                            }}
                        />
                        <span className="text-danger">
                            {validateResults?.lastnameValidation?.valid
                                ? ''
                                : validateResults?.lastnameValidation?.message}
                        </span>
                    </div>
                    <div className="form-group">
                        <Label textTransform="uppercase" htmlFor="phone">
                            Số điện thoại <span className="text-danger">*</span>
                        </Label>
                        <Input
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            height="50px"
                            type="text"
                            placeholder="Số điện thoại"
                            id="phone"
                            value={registrationInfo ? registrationInfo.phoneNumber : ''}
                            onChange={(e) => setRegistrationInfo({ ...registrationInfo, phoneNumber: e.target.value })}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    phoneValidation: validates.isTel(e.target.value),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    phoneValidation: {
                                        valid: true,
                                    },
                                });
                            }}
                        ></Input>
                        <span className="text-danger">
                            {validateResults?.phoneValidation?.valid ? '' : validateResults?.phoneValidation?.message}
                        </span>
                    </div>
                    <div className="form-group">
                        <Label textTransform="uppercase" htmlFor="email">
                            Email <span className="text-danger">*</span>
                        </Label>
                        <Input
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            height="50px"
                            type="email"
                            placeholder="Email"
                            id="email"
                            value={registrationInfo ? registrationInfo.email : ''}
                            onChange={(e) => setRegistrationInfo({ ...registrationInfo, email: e.target.value })}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    emailValidation: validates.isEmail(e.target.value),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    emailValidation: {
                                        valid: true,
                                    },
                                });
                            }}
                        ></Input>
                        <span className="text-danger">
                            {validateResults?.emailValidation?.valid ? '' : validateResults?.emailValidation?.message}
                        </span>
                    </div>
                    <div className="form-group">
                        <Label textTransform="uppercase" htmlFor="password">
                            Mật khẩu <span className="text-danger">*</span>
                        </Label>
                        <Input
                            padding="16px"
                            background-color="rgb(247, 247, 247)"
                            margin="10px 0 8px 0"
                            height="50px"
                            type="password"
                            placeholder="Mật khẩu"
                            id="password"
                            value={registrationInfo ? registrationInfo.password : ''}
                            onChange={(e) => setRegistrationInfo({ ...registrationInfo, password: e.target.value })}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    passwordValidation: validates.isPassword(e.target.value),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    passwordValidation: {
                                        valid: true,
                                    },
                                });
                            }}
                        />
                        <span className="text-danger">
                            {validateResults?.passwordValidation?.valid
                                ? ''
                                : validateResults?.passwordValidation?.message}
                        </span>
                    </div>
                    <Button primary="true" type="submit" width="50%" margin="0 auto 0 auto" className="submit-btn">
                        Tạo tài khoản
                    </Button>
                    <Link to="/login" className="text-danger login-btn">
                        ĐĂNG NHẬP
                    </Link>
                </form>
            </StyledMainBlock>
            <Footer></Footer>
        </div>
    );
};

export default Registration;
