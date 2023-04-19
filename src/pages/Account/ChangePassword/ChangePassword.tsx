import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../../layouts/Header/Header';
import AccountSideBar from '../components/AccountSideBar';
import validates from '../../../helpers/validate_v2';
import axios from 'axios';
import Input from '../../../components/Input/Input';
import Label from '../../../components/Label/Label';
import Button from '../../../components/Button/Button';
import { TypeValidateResult } from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
const StyledMainBlock = styled.div`
    padding: 140px 100px 50px;
    display: flex;
    width: 100%;
    & * {
        text-transform: unset;
        color: var(--primary-color);
    }
    .change_pw_form {
        flex-grow: 1;
        h2 {
            font-size: 2rem;
            font-weight: 400;
            margin-bottom: 25px;
        }
        p {
            font-size: 1.4rem;
            margin-bottom: 15px;
        }

        .error-message {
            font-size: 1.2rem;
            display: none;
        }
    }
`;
const ChangePassword = () => {
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    // const [loginInfo] = useState(() => {
    //     const data = sessionStorage.getItem('loginInfo');
    //     if (data) {
    //         return JSON.parse(data);
    //     }
    // });
    const { loginInfo } = useContext(LoginContext);
    const statusRef = useRef<HTMLParagraphElement>(null);
    const navigate = useNavigate();
    const [password, setPassword] = useState({
        oldPw: '',
        newPw: '',
        confirmPw: '',
    });
    useEffect(() => {
        if (loginInfo.isLogin) {
            document.title = 'Thay đổi mật khẩu | CLOWNZⓇ STREETWEAR';
        } else {
            navigate('/login');
        }
    }, []);
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            validates.isRequired(password.oldPw).valid &&
            validates.isPassword(password.newPw).valid &&
            validates.isConfirmPassword(password.newPw, password.confirmPw).valid
        ) {
            if (password.oldPw === loginInfo?.userInfo?.password) {
                axios({
                    method: 'put',
                    url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/users/${loginInfo?.userInfo?.id}`,
                    data: {
                        ...loginInfo.userInfo,
                        password: password.newPw,
                    },
                }).then((result) => {
                    window.confirm('Đổi mật khẩu thành công!');
                    window.location.reload();
                });
            } else {
                if (statusRef.current) {
                    (statusRef.current as HTMLElement).textContent = 'Mật khẩu không chính xác. Vui lòng nhập lại!';
                }
            }
        } else {
            setValidateResults({
                oldPwValidation: validates.isRequired(password.oldPw),
                newPwValidation: validates.isPassword(password.newPw),
                confirmPwValidation: validates.isConfirmPassword(password.newPw, password.confirmPw),
            });
        }
    };

    return loginInfo.isLogin ? (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <AccountSideBar></AccountSideBar>
                <form onSubmit={handleSubmit} className="change_pw_form">
                    <h2>ĐỔI MẬT KHẨU</h2>
                    <p className="text-danger">Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 6 kí tự.</p>

                    <div>
                        <p ref={statusRef} className="text-danger"></p>
                        <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="old_pw">
                            MẬT KHẨU CŨ <span className="text-danger">*</span>
                        </Label>
                        <Input
                            height="50px"
                            padding="15px"
                            margin="0 0 10px 0"
                            value={password.oldPw}
                            onChange={(e) => {
                                setPassword({ ...password, oldPw: e.target.value });
                            }}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    oldPwValidation: validates.isRequired(password.oldPw),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    oldPwValidation: { valid: true },
                                });
                            }}
                            type="password"
                            id="old_pw"
                            placeholder="Mật khẩu cũ"
                        />
                        <span className="text-danger">
                            {validateResults && validateResults?.oldPwValidation?.valid
                                ? ''
                                : validateResults?.oldPwValidation.message}
                        </span>
                    </div>
                    <div>
                        <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="new_pw">
                            MẬT KHẨU MỚI <span className="text-danger">*</span>
                        </Label>
                        <Input
                            height="50px"
                            padding="15px"
                            margin="0 0 10px 0"
                            value={password.newPw}
                            onChange={(e) => {
                                setPassword({ ...password, newPw: e.target.value });
                            }}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    newPwValidation: validates.isRequired(password.newPw),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    newPwValidation: { valid: true },
                                });
                            }}
                            type="password"
                            id="new_pw"
                            placeholder="Mật khẩu mới"
                        />
                        <span className="text-danger">
                            {validateResults && validateResults?.newPwValidation?.valid
                                ? ''
                                : validateResults?.newPwValidation?.message}
                        </span>
                    </div>
                    <div>
                        <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="confirm_new_pw">
                            XÁC NHẬN LẠI MẬT KHẨU <span className="text-danger">*</span>
                        </Label>
                        <Input
                            height="50px"
                            padding="15px"
                            margin="0 0 10px 0"
                            value={password.confirmPw}
                            onChange={(e) => {
                                setPassword({ ...password, confirmPw: e.target.value });
                            }}
                            onBlur={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    confirmPwValidation: validates.isRequired(password.confirmPw),
                                });
                            }}
                            onInput={(e) => {
                                setValidateResults({
                                    ...validateResults,
                                    confirmPwValidation: { valid: true },
                                });
                            }}
                            type="password"
                            id="confirm_new_pw"
                            placeholder="Xác nhận lại mật khẩu"
                        />
                        <span className="text-danger">
                            {validateResults && validateResults?.confirmPwValidation?.valid
                                ? ''
                                : validateResults?.confirmPwValidation?.message}
                        </span>
                    </div>
                    <Button margin="20px 0 0 0" primary="true" width="300px" type="submit">
                        ĐẶT LẠI MẬT KHẨU
                    </Button>
                </form>
            </StyledMainBlock>
        </div>
    ) : (
        <div></div>
    );
};

export default ChangePassword;
