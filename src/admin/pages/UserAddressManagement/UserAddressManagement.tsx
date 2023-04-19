import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
    checkAddressDefault,
    getDistrictNameByCode,
    getDistrictOfProvince,
    getProvinceNameByCode,
    getWardNameByCode,
    getWardsOfDistrict,
} from '../../../helpers/address_helper_functions';
import validates from '../../../helpers/validate_v2';
import Header from '../../../layouts/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import TextArea from '../../../components/TextArea/TextArea';
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import { FormState, IAddressApi, IUser, IUserAddress, TypeValidateResult } from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const StyledMainBlock = styled.div`
    padding-top: 110px;
    padding-left: 300px;
    padding-right: 10px;
    h1 {
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 1.5px;
        margin: 20px 0 30px;
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

const UserAddressManagement = () => {
    const [userAddress, setUserAddress] = useState<IUserAddress[]>([]);
    const [formState, setFormState] = useState<FormState>({ method: '' });
    const [users, setUsers] = useState<IUser[]>([]);
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const [newAddress, setNewAddress] = useState<IUserAddress>({
        user_id: '',
        street: '',
        city: 1,
        district: 1,
        phone: '',
        wards: 1,
        note: '',
        company: '',
        isDefault: false,
    });
    const [addressApi, setAddressApi] = useState<IAddressApi[]>([]);
    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loginInfo.isLogin && loginInfo.userInfo?.isAdmin) {
            document.title = 'Trang quản lý địa chỉ khách hàng';
            axios.get('https://629c5b853798759975d46095.mockapi.io/api/user_address').then((res) => {
                setUserAddress(res.data);
            });
            axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
                setAddressApi(response.data);
            });
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/users').then((res) => {
                setNewAddress({
                    user_id: res.data[0].id,
                    street: '',
                    city: 1,
                    district: 1,
                    phone: '',
                    wards: 1,
                    note: '',
                    company: '',
                    isDefault: false,
                });
                setUsers(res.data);
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
                url: `https://629c5b853798759975d46095.mockapi.io/api/user_address/${formState.id}`,
            }).then((res) => {
                const nAddress = userAddress.filter((address) => {
                    return address.id !== formState.id;
                });
                setUserAddress(nAddress);
            });
        } else if (formState.method === 'edit') {
            const addressWillChange = userAddress.find((address) => {
                return address.id === formState.id;
            });
            if (addressWillChange) setNewAddress(addressWillChange);
            if (modalRef.current) modalRef.current.style.display = 'block';
        } else if (formState.method === 'post') {
            if (modalRef.current) modalRef.current.style.display = 'block';
            if (users?.[0]?.id) {
                setNewAddress({
                    user_id: users[0].id,
                    street: '',
                    city: 1,
                    district: 1,
                    phone: '',
                    wards: 1,
                    note: '',
                    company: '',
                    isDefault: false,
                });
            }
        } else {
            if (modalRef.current) modalRef.current.style.display = 'none';
        }
    }, [formState]);
    const handlePostAndPut = () => {
        if (formState.method === 'post') {
            axios({
                method: 'post',
                url: 'https://629c5b853798759975d46095.mockapi.io/api/user_address',
                data: newAddress,
            }).then((result) => {
                window.location.reload();
            });
        } else if (formState.method === 'edit') {
            axios({
                method: 'put',
                url: `https://629c5b853798759975d46095.mockapi.io/api/user_address/${formState.id}`,
                data: newAddress,
            }).then((result) => {
                window.location.reload();
            });
        }
    };
    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            validates.isRequired(newAddress.street).valid &&
            validates.isTel(newAddress.phone).valid &&
            validates.isRequired(newAddress.company).valid
        ) {
            const address = userAddress.filter((address) => {
                return address.user_id === newAddress.user_id;
            });
            const id = checkAddressDefault(address);
            if (newAddress.isDefault === true && id !== '') {
                console.log(newAddress.isDefault === true && id);
                axios({
                    method: 'put',
                    url: `https://629c5b853798759975d46095.mockapi.io/api/user_address/${id}`,
                    data: {
                        isDefault: false,
                    },
                }).then(() => {
                    handlePostAndPut();
                });
            } else {
                handlePostAndPut();
            }
        } else {
            setValidateResults({
                streetValidation: validates.isRequired(newAddress.street),
                phoneValidation: validates.isTel(newAddress.phone),
                companyValidation: validates.isRequired(newAddress.company),
            });
        }
    };

    return loginInfo.isLogin && loginInfo.userInfo?.isAdmin ? (
        <div>
            <Header primary={true}></Header>
            <SideBar></SideBar>
            <StyledMainBlock>
                <h1>Quản lý địa chỉ</h1>
                <Button
                    primary="true"
                    width="200px"
                    className="btn-primary"
                    onClick={() => {
                        setFormState({ method: 'post' });
                    }}
                >
                    Thêm địa chỉ khách
                </Button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Mã khách hàng</th>
                            <th>Địa chỉ</th>
                            <th>Công ty</th>
                            <th>Số điện thoại</th>
                            <th>Ghi chú</th>
                            <th>Địa chỉ mặc định</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAddress.length > 0 &&
                            addressApi.length > 0 &&
                            userAddress.map((address) => {
                                return (
                                    <tr className="text-center" key={address.id}>
                                        <td>{address.id}</td>
                                        <td>{address.user_id}</td>
                                        <td>{`${address.street}, ${getWardNameByCode(
                                            address.city,
                                            address.district,
                                            address.wards,
                                            addressApi,
                                        )}, ${getDistrictNameByCode(
                                            address.city,
                                            address.district,
                                            addressApi,
                                        )}, ${getProvinceNameByCode(address.city, addressApi)}`}</td>
                                        <td>{address.company}</td>
                                        <td>{address.phone}</td>
                                        <td>{address.note}</td>
                                        <td className={address?.isDefault ? 'text-info' : 'text-danger'}>
                                            {String(address.isDefault)}
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => {
                                                    setFormState({ method: 'edit', id: address.id });
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                onClick={() => {
                                                    setFormState({ method: 'delete', id: address.id });
                                                }}
                                                className="text-danger"
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
            {addressApi.length > 0 && (
                <StyledModal ref={modalRef}>
                    <form
                        onSubmit={(e) => {
                            handleSubmitForm(e);
                        }}
                    >
                        {formState.method === 'post' && <h1>Nhập thông tin địa chỉ</h1>}
                        {formState.method === 'edit' && (
                            <h1>
                                Sửa thông tin địa chỉ <span className="text-danger">#{formState.id}</span>
                            </h1>
                        )}
                        <div className="row gx-5 gy-3">
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="user_id">
                                    Người dùng
                                </Label>
                                <Select
                                    padding="8px"
                                    id="user_id"
                                    value={newAddress ? newAddress?.user_id : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            user_id: e.target.value,
                                        });
                                    }}
                                >
                                    {users &&
                                        users.map((user) => {
                                            return (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="street">
                                    Đường,số nhà
                                </Label>
                                <Input
                                    height="40px"
                                    padding="8px"
                                    margin="2px"
                                    type="street"
                                    id="street"
                                    value={newAddress ? newAddress.street : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            street: e.target.value,
                                        });
                                    }}
                                    onInput={(e) => {
                                        setValidateResults({
                                            ...validateResults,
                                            streetValidation: { valid: true },
                                        });
                                    }}
                                    onBlur={(e) => {
                                        setValidateResults({
                                            ...validateResults,
                                            streetValidation: validates.isRequired(e.target.value),
                                        });
                                    }}
                                    placeholder="Đường số nhà"
                                />
                                <span className="text-danger">
                                    {validateResults?.streetValidation?.valid
                                        ? ''
                                        : validateResults?.streetValidation?.message}
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
                                    value={newAddress ? newAddress.phone : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            phone: e.target.value,
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
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="city">
                                    Tỉnh thành
                                </Label>
                                <Select
                                    padding="8px"
                                    id="city"
                                    value={newAddress ? newAddress.city : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            city: Number(e.target.value),
                                            district: getDistrictOfProvince(e.target.value, addressApi)[0].code,
                                            wards: getWardsOfDistrict(
                                                e.target.value,
                                                getDistrictOfProvince(e.target.value, addressApi)[0].code,
                                                addressApi,
                                            )[0].code,
                                        });
                                    }}
                                >
                                    {addressApi &&
                                        newAddress &&
                                        addressApi.map((province) => {
                                            return (
                                                <option key={province.code} value={province.code}>
                                                    {province.name}{' '}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>

                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="district">
                                    Quận Huyện
                                </Label>
                                <Select
                                    padding="8px"
                                    id="district"
                                    value={newAddress ? newAddress.district : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            district: Number(e.target.value),
                                            wards: getWardsOfDistrict(newAddress.city, e.target.value, addressApi)[0]
                                                .code,
                                        });
                                    }}
                                >
                                    {addressApi &&
                                        newAddress &&
                                        getDistrictOfProvince(newAddress.city, addressApi).map((district) => {
                                            return (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            );
                                        })}
                                </Select>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="ward">
                                    Xã, phường
                                </Label>
                                <Select
                                    padding="8px"
                                    id="ward"
                                    value={newAddress ? newAddress.wards : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            wards: Number(e.target.value),
                                        });
                                    }}
                                >
                                    {addressApi &&
                                        newAddress &&
                                        getWardsOfDistrict(newAddress.city, newAddress.district, addressApi).map(
                                            (ward) => {
                                                return (
                                                    <option key={ward.code} value={ward.code}>
                                                        {ward.name}
                                                    </option>
                                                );
                                            },
                                        )}
                                </Select>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="company">
                                    Công ty
                                </Label>
                                <Input
                                    height="40px"
                                    padding="8px"
                                    margin="2px"
                                    type="text"
                                    id="company"
                                    value={newAddress ? newAddress.company : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            company: e.target.value,
                                        });
                                    }}
                                />
                                <span className="text-danger">
                                    {validateResults?.companyValidation?.valid
                                        ? ''
                                        : validateResults?.companyValidation?.message}
                                </span>
                            </div>
                            <div className="col-6">
                                <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="note">
                                    Ghi chú
                                </Label>
                                <TextArea
                                    name=""
                                    id="note"
                                    cols={30}
                                    rows={10}
                                    value={newAddress ? newAddress.note : ''}
                                    onChange={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            note: e.target.value,
                                        });
                                    }}
                                />
                                <span className="text-danger">
                                    {validateResults?.companyValidation?.valid
                                        ? ''
                                        : validateResults?.companyValidation?.message}
                                </span>
                            </div>
                            <div className="col-6">
                                <Input
                                    margin="0 20px 0 0"
                                    checked={newAddress?.isDefault === true ? true : false}
                                    type="checkbox"
                                    id="isDefault"
                                    onClick={(e) => {
                                        setNewAddress({
                                            ...newAddress,
                                            isDefault: (e.target as HTMLInputElement).checked,
                                        });
                                    }}
                                />
                                <Label
                                    display="inline-block"
                                    margin="0 0 4px 0"
                                    textTransform="uppercase"
                                    htmlFor="isDefault"
                                >
                                    Là địa chỉ mặc định ?
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
                                <Button
                                    primary="true"
                                    width="100px"
                                    type="submit"
                                    className="submit_submit btn-primary"
                                >
                                    {formState.method === 'post' && 'Thêm'}
                                    {formState.method === 'edit' && 'Sửa'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </StyledModal>
            )}
        </div>
    ) : (
        <div></div>
    );
};

export default UserAddressManagement;
