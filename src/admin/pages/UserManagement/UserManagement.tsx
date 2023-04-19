import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import validates from '../../../helpers/validate_v2';
import Header from '../../../layouts/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import { FormState, IUser } from '../../../interfaces/interfaces';
import { TypeValidateResult } from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const StyledMainBlock = styled.div`
    padding-top: 110px;
    padding-left: 300px;
    padding-right: 10px;
    h1 {
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 20px;
        margin-top: 20px;
    }
    table {
        margin-top: 20px;
        font-size: 1.4rem;
        width: 100%;
        border-collapse: collapse;
        td,
        th {
            border: 1px solid #ccc;
            padding: 8px;
        }
    }
`;

const StyledModal = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    display: none;
    z-index: 9999;
    height: 100vh;
    padding-top: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    form {
        background-color: #fff;
        border-radius: 4px;
        padding: 20px 30px 30px;
        width: 60%;
        margin-left: auto;
        margin-right: auto;
        font-size: 1.4rem;
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }

        .form_action {
            display: flex;
            justify-content: end;
            margin-top: 20px;

            .cancel_btn {
                margin-right: 20px;
            }
        }
    }
`;
interface RegistorInfo extends IUser {
    confirmPassword: string;
}
const UserManagement = () => {
    const [formState, setFormState] = useState<FormState>({ method: '' });
    const [users, setUsers] = useState<IUser[]>([]);
    const [newUser, setNewUser] = useState<RegistorInfo>({
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        createdAt: '',
        isAdmin: false,
    });
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loginInfo.isLogin && loginInfo.userInfo?.isAdmin) {
            document.title = 'Trang quản lý người dùng';
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/users').then((response) => {
                setUsers(response.data);
            });
        } else if (!loginInfo.isLogin) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (formState.method === 'delete') {
            axios({
                method: 'delete',
                url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/users/${formState.id}`,
            }).then((res) => {
                const newUsers = users.filter((user) => {
                    return user.id !== formState.id;
                });
                setUsers(newUsers);
            });
        } else if (formState.method === 'edit') {
            const userWillChange = users.find((user) => {
                return user.id === formState.id;
            });
            if (userWillChange)
                setNewUser({
                    ...userWillChange,
                    confirmPassword: userWillChange.password,
                });
            if (modalRef.current) modalRef.current.style.display = 'block';
        } else if (formState.method === 'post') {
            if (modalRef.current) modalRef.current.style.display = 'block';
            setNewUser({
                id: '',
                name: '',
                email: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                createdAt: '',
                isAdmin: false,
            });
        } else {
            if (modalRef.current) modalRef.current.style.display = 'none';
        }
    }, [formState]);

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            validates.isRequired(newUser.name).valid &&
            validates.isEmail(newUser.email).valid &&
            validates.isTel(newUser.phoneNumber).valid &&
            validates.isPassword(newUser.password).valid &&
            validates.isConfirmPassword(newUser.password, newUser.confirmPassword).valid
        ) {
            if (formState.method === 'post') {
                if (validates.IsEmailAlreadyExists(newUser.email, users).valid) {
                    const { confirmPassword, id, ...data } = { ...newUser };
                    if (data.createdAt === '') {
                        const date = new Date();
                        data.createdAt = `${date.toLocaleString('default', {
                            year: 'numeric',
                        })}-${date.toLocaleString('default', {
                            month: '2-digit',
                        })}-${date.toLocaleString('default', {
                            day: '2-digit',
                        })}`;
                    }
                    axios({
                        method: 'post',
                        url: 'https://62890e4b10e93797c162141e.mockapi.io/clownz/users',
                        data: data,
                    }).then((res) => {
                        window.location.reload();
                    });
                } else {
                    setValidateResults({
                        emailValidation: validates.IsEmailAlreadyExists(newUser.email, users),
                    });
                }
            } else if (formState.method === 'edit') {
                const { confirmPassword, id, ...data } = { ...newUser };
                const userWillChange = users.find((user) => {
                    return user.id === formState.id;
                });
                if (data.createdAt === '') {
                    const date = new Date();
                    data.createdAt = `${date.toLocaleString('default', {
                        year: 'numeric',
                    })}-${date.toLocaleString('default', {
                        month: '2-digit',
                    })}-${date.toLocaleString('default', {
                        day: '2-digit',
                    })}`;
                }
                if (userWillChange && userWillChange.email === newUser.email) {
                    axios({
                        method: 'put',
                        url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/users/${formState.id}`,
                        data: data,
                    }).then((res) => {
                        window.location.reload();
                    });
                } else {
                    if (validates.IsEmailAlreadyExists(newUser.email, users).valid) {
                        axios({
                            method: 'put',
                            url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/users/${formState.id}`,
                            data: data,
                        }).then((res) => {
                            window.location.reload();
                        });
                    } else {
                        setValidateResults({
                            emailValidation: validates.IsEmailAlreadyExists(newUser.email, users),
                        });
                    }
                }
            }
        } else {
            setValidateResults({
                nameValidation: validates.isRequired(newUser.name),
                emailValidation: validates.isEmail(newUser.email),
                phoneValidation: validates.isTel(newUser.phoneNumber),
                passwordValidation: validates.isPassword(newUser.password),
                confirmPasswordValidation: validates.isConfirmPassword(newUser.password, newUser.confirmPassword),
            });
        }
    };
    return loginInfo.isLogin && loginInfo.userInfo?.isAdmin ? (
        <div>
            <Header primary={true}></Header>
            <SideBar></SideBar>
            <StyledMainBlock>
                <h1 className="text-center">Quản lý người dùng</h1>
                <Button
                    primary="true"
                    width="200px"
                    className="btn-primary add_user_btn"
                    onClick={() => {
                        setFormState({ method: 'post' });
                    }}
                >
                    Thêm mới người dùng
                </Button>
                <table>
                    <thead>
                        <tr>
                            <th>Mã người dùng</th>
                            <th>Tên người dùng</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Mật khẩu</th>
                            <th>Thời gian tạo</th>
                            <th>Là ADMIN</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            users.map((user) => {
                                return (
                                    <tr className="text-center" key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{user.password}</td>
                                        <td>{user.createdAt}</td>
                                        <td className={user.isAdmin ? 'text-info' : 'text-danger'}>
                                            {String(user.isAdmin)}
                                        </td>
                                        <td>
                                            <Button
                                                onClick={(e) => {
                                                    setFormState({ method: 'edit', id: user.id });
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={(e) => {
                                                    setFormState({ method: 'delete', id: user.id });
                                                }}
                                                className={user.isAdmin ? 'text-mute' : 'text-danger'}
                                                disabled={user.isAdmin ? true : false}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </StyledMainBlock>
            <StyledModal ref={modalRef}>
                <form
                    onSubmit={(e) => {
                        handleSubmitForm(e);
                    }}
                >
                    {formState.method === 'post' && <h1>Nhập thông tin người dùng</h1>}
                    {formState.method === 'edit' && (
                        <h1>
                            Sửa thông tin người dùng <span className="text-danger">#{formState.id}</span>
                        </h1>
                    )}
                    <div className="row gx-5 gy-3">
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="name">
                                Tên người dùng
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                id="name"
                                value={newUser ? newUser.name : ''}
                                onChange={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        name: e.target.value,
                                    });
                                }}
                                placeholder="Tên người dùng"
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        nameValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        nameValidation: validates.isRequired(e.target.value),
                                    });
                                }}
                            />
                            <span className="text-danger">
                                {validateResults?.nameValidation?.valid ? '' : validateResults?.nameValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="email"
                                id="email"
                                value={newUser ? newUser.email : ''}
                                onChange={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    });
                                }}
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        emailValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        emailValidation: validates.isEmail(e.target.value),
                                    });
                                }}
                                placeholder="Email"
                            />
                            <span className="text-danger">
                                {validateResults?.emailValidation?.valid
                                    ? ''
                                    : validateResults?.emailValidation?.message}
                            </span>
                        </div>

                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="image">
                                Số điện thoại
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                value={newUser ? newUser.phoneNumber : ''}
                                onChange={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        phoneNumber: e.target.value,
                                    });
                                }}
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        phoneValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        phoneValidation: validates.isTel(e.target.value),
                                    });
                                }}
                                placeholder="Số điện thoại"
                            />
                            <span className="text-danger">
                                {validateResults?.phoneValidation?.valid
                                    ? ''
                                    : validateResults?.phoneValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="password">
                                Mật khẩu
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="password"
                                value={newUser ? newUser.password : ''}
                                onChange={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    });
                                }}
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        passwordValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        passwordValidation: validates.isPassword(e.target.value),
                                    });
                                }}
                                placeholder="Mật khẩu"
                            />
                            <span className="text-danger">
                                {validateResults?.passwordValidation?.valid
                                    ? ''
                                    : validateResults?.passwordValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="confirmPassword">
                                Nhập lại mật khẩu
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="password"
                                value={newUser ? newUser.confirmPassword : ''}
                                onChange={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        confirmPassword: e.target.value,
                                    });
                                }}
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        confirmPasswordValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        confirmPasswordValidation: validates.isConfirmPassword(
                                            newUser.password,
                                            e.target.value,
                                        ),
                                    });
                                }}
                                placeholder="Mật khẩu"
                            />
                            <span className="text-danger">
                                {validateResults?.confirmPasswordValidation?.valid
                                    ? ''
                                    : validateResults?.confirmPasswordValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="title">
                                Ngày tạo
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="date"
                                value={newUser ? newUser.createdAt : ''}
                                onChange={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        createdAt: e.target.value,
                                    });
                                }}
                                placeholder="Ngày tạo"
                            />
                        </div>
                        <div className="col-6">
                            <Input
                                padding="8px"
                                margin="0 10px 0 0"
                                checked={newUser.isAdmin === true ? true : false}
                                type="checkbox"
                                id="isAdmin"
                                onClick={(e) => {
                                    setNewUser({
                                        ...newUser,
                                        isAdmin: (e.target as HTMLInputElement).checked,
                                    });
                                }}
                            />
                            <Label
                                display="inline-block"
                                margin="0 0 4px 0"
                                textTransform="uppercase"
                                htmlFor="isAdmin"
                            >
                                Là người quản trị ?
                            </Label>
                        </div>

                        <div className="form_action">
                            <Button
                                secondary="true"
                                width="100px"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFormState({ method: '' });
                                }}
                                className="cancel_btn btn-secondary"
                            >
                                Hủy
                            </Button>
                            <Button primary="true" width="100px" type="submit" className="submit_submit btn-primary">
                                {formState.method === 'post' && 'Thêm'}
                                {formState.method === 'edit' && 'Sửa'}
                            </Button>
                        </div>
                    </div>
                </form>
            </StyledModal>
        </div>
    ) : (
        <div></div>
    );
};

export default UserManagement;
