import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Footer from '../../../layouts/Footer/Footer';
import Header from '../../../layouts/Header/Header';
import AccountSideBar from '../components/AccountSideBar';
import validates from '../../../helpers/validate_v2';

import {
    checkAddressDefault,
    getDistrictNameByCode,
    getDistrictOfProvince,
    getProvinceNameByCode,
    getWardNameByCode,
    getWardsOfDistrict,
} from '../../../helpers/address_helper_functions';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import {
    FormState,
    IAddressApi,
    IDistrict,
    IUserAddress,
    IValidationResults,
    IWard,
    TypeValidateResult,
} from '../../../interfaces/interfaces';
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
    .content {
        flex-grow: 1;

        h2 {
            margin: 10px 0 30px;
            font-size: 1.9rem;
            font-weight: 400;
            text-transform: uppercase;
        }

        .address-block {
            padding-top: 20px;
            margin-top: 20px;
            border-top: 1px solid #ccc;
            font-size: 1.4rem;
            margin-left: 0;
            & b {
                font-weight: 500;
            }
            p {
                margin-bottom: 10px;
                line-height: 1.4;
            }

            .is_default_address {
                display: inline-block;
                margin-left: 15px;
                color: #27ae60;
                font-weight: 400;
            }

            .edit-btn {
                background-color: transparent;
                color: #2d9cdb !important;
                font-size: 1.4rem;
                font-weight: 500;
                letter-spacing: 1.2px;
                font-family: inherit;

                cursor: pointer;
            }
            .delete-btn {
                background-color: transparent;
                margin-top: 30px;
                font-size: 1.4rem;
                font-weight: 500;
                letter-spacing: 1.2px;
                font-family: inherit;
                cursor: pointer;
            }
            .edit-btn:hover,
            .delete-btn:hover {
                opacity: 0.7;
            }
        }
    }
`;

const StyledModal = styled.div`
    display: none;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    font-size: 1.4rem;
    z-index: 999;
    padding-top: 50px;
    .add_address {
        width: 60%;
        background-color: #fff;
        margin-left: auto;
        margin-right: auto;
        border-radius: 4px;
        position: relative;

        h2 {
            font-size: 1.6rem;
            font-weight: 700;
            padding: 20px 50px 20px;
            border-bottom: 1px solid #ccc;
        }
        .close-btn {
            position: absolute;
            right: 20px;
            top: 12px;
            padding: 10px;
            font-size: 1.4rem;
            border: none;
            background-color: transparent;
            outline: none;
            cursor: pointer;
            &:hover {
                color: #2d9cdb;
            }
        }
        .customer_address {
            padding: 20px 30px 30px;
            .form-control {
                margin-bottom: 15px;
            }

            .btn-row {
                display: flex;
                justify-content: end;
                .cancel-btn {
                    margin-right: 10px;
                }
            }
        }
    }
`;

interface addInfo {
    province: number;
    district: number;
    wards: number;
    isDefault: boolean;
    phone: string;
    street: string;
    company: string;
}

const Address = () => {
    const [address, setAddress] = useState<IUserAddress[]>([]);
    const [formState, setFormState] = useState<FormState>({ method: 'post' });
    const [addressApiData, setAddressApiData] = useState<IAddressApi[]>([]);
    const [addressInfo, setAddressInfo] = useState<addInfo>({
        province: 1,
        district: 1,
        wards: 1,
        isDefault: false,
        phone: '',
        street: '',
        company: '',
    });
    // const [loginInfo] = useState(() => {
    //     const data = sessionStorage.getItem('loginInfo');
    //     if (data) {
    //         return JSON.parse(data);
    //     }
    //     return null;
    // });
    const { loginInfo } = useContext(LoginContext);
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (loginInfo.isLogin) {
            document.title = 'Sổ địa chỉ | CLOWNZⓇ STREETWEAR';
            const fetchData = async () => {
                const res = await Promise.all([
                    axios.get(
                        `https://629c5b853798759975d46095.mockapi.io/api/user_address?user_id=${loginInfo.userInfo.id}`,
                    ),
                    axios.get('https://provinces.open-api.vn/api/?depth=3'),
                ]);

                setAddress(res[0].data);
                setAddressApiData(res[1].data);
            };
            fetchData();
        } else {
            navigate('/login');
        }
    }, []);

    const handlePostAndPut = () => {
        if (formState.method === 'post') {
            axios({
                method: 'post',
                url: 'https://629c5b853798759975d46095.mockapi.io/api/user_address',
                data: {
                    user_id: loginInfo.userInfo.id,
                    street: addressInfo.street,
                    wards: addressInfo.wards,
                    district: addressInfo.district,
                    city: addressInfo.province,
                    isDefault: addressInfo.isDefault,
                    company: addressInfo.company,
                    phone: addressInfo.phone,
                },
            }).then((result) => {
                window.location.reload();
            });
        } else if (formState.method === 'edit') {
            axios({
                method: 'put',
                url: `https://629c5b853798759975d46095.mockapi.io/api/user_address/${formState.id}`,
                data: {
                    user_id: loginInfo.userInfo.id,
                    street: addressInfo.street,
                    wards: addressInfo.wards,
                    district: addressInfo.district,
                    city: addressInfo.province,
                    isDefault: addressInfo.isDefault,
                    company: addressInfo.company,
                    phone: addressInfo.phone,
                },
            }).then((result) => {
                window.location.reload();
            });
        }
    };
    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            validates.isTel(addressInfo.phone).valid &&
            validates.isRequired(addressInfo.street).valid &&
            validates.isRequired(addressInfo.company).valid
        ) {
            const id = checkAddressDefault(address);
            if (addressInfo.isDefault === true && id !== '') {
                console.log(addressInfo.isDefault === true && id);
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
                phoneValidation: validates.isTel(addressInfo.phone),
                streetValidation: validates.isRequired(addressInfo.street),
                companyValidation: validates.isRequired(addressInfo.company),
            });
        }
    };

    useEffect(() => {
        if (formState.method === 'edit') {
            axios
                .get(`https://629c5b853798759975d46095.mockapi.io/api/user_address?id=${formState.id}`)
                .then((result) => {
                    const data: IUserAddress = result.data.find((element: IUserAddress) => {
                        return element.id === formState.id;
                    });
                    setAddressInfo({
                        phone: data.phone,
                        company: data.company,
                        street: data.street,
                        province: data.city,
                        district: data.district,
                        wards: data.wards,
                        isDefault: data.isDefault,
                    });
                });
        } else if (formState.method === 'delete') {
            axios({
                method: 'delete',
                url: `https://629c5b853798759975d46095.mockapi.io/api/user_address/${formState.id}`,
            }).then((result) => window.location.reload());
        }
    }, [formState]);

    return loginInfo.isLogin ? (
        <div>
            <Header primary={true}></Header>
            <StyledMainBlock>
                <AccountSideBar></AccountSideBar>
                <div className="content">
                    <h2>Địa chỉ của bạn</h2>
                    <Button
                        primary="true"
                        width="200px"
                        onClick={() => {
                            if (modalRef.current) {
                                modalRef.current.style.display = 'block';
                            }
                            setFormState({ method: 'post' });
                        }}
                    >
                        THÊM ĐỊA CHỈ
                    </Button>

                    {address &&
                        addressApiData &&
                        address.map((element) => {
                            return (
                                <div key={element.id} className="address-block row g-0">
                                    <div className="col-9">
                                        <p>
                                            <b>Họ tên:</b> {loginInfo.userInfo.name}
                                            {element.isDefault === true && (
                                                <span className="is_default_address">Địa chỉ mặc định</span>
                                            )}
                                        </p>
                                        <p>
                                            <b> Địa chỉ:</b>
                                            {', ' +
                                                element.street +
                                                ', ' +
                                                getWardNameByCode(
                                                    element.city,
                                                    element.district,
                                                    element.wards,
                                                    addressApiData,
                                                ) +
                                                ', ' +
                                                getDistrictNameByCode(element.city, element.district, addressApiData) +
                                                ', ' +
                                                getProvinceNameByCode(element.city, addressApiData)}
                                        </p>
                                        <p>
                                            <b>Số điện thoại:</b> {element.phone}
                                        </p>
                                        <p>
                                            <b>Công ty:</b> {element.company}
                                        </p>
                                    </div>
                                    <div className="col-3">
                                        <Button
                                            onClick={() => {
                                                if (modalRef.current) {
                                                    modalRef.current.style.display = 'block';
                                                }
                                                setFormState({
                                                    method: 'edit',
                                                    id: element.id,
                                                });
                                            }}
                                            className="edit-btn"
                                        >
                                            Chỉnh sửa địa chỉ
                                        </Button>
                                        <br />

                                        {element.isDefault === false && (
                                            <Button
                                                onClick={() => {
                                                    setFormState({ method: 'delete', id: element.id });
                                                }}
                                                className="delete-btn text-danger"
                                            >
                                                Xóa
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </StyledMainBlock>
            <Footer></Footer>
            {address && addressApiData.length > 0 && (
                <StyledModal ref={modalRef}>
                    <div className="add_address">
                        {formState.method === 'post' && <h2 className="text-center">THÊM ĐỊA CHỈ MỚI</h2>}
                        {formState.method === 'edit' && <h2 className="text-center">CHỈNH SỬA ĐỊA CHỈ</h2>}
                        <button
                            onClick={() => {
                                if (modalRef.current) {
                                    modalRef.current.style.display = 'none';
                                }
                            }}
                            className="close-btn"
                        >
                            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                        </button>
                        <form onSubmit={handleSubmitForm} className="customer_address">
                            <div className="row g-5">
                                <div className="form-control col-6">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="name">
                                        Họ tên
                                    </Label>
                                    <Input
                                        padding="4px 7px"
                                        height="40px"
                                        color="#55595c"
                                        border="1px solid rgb(230, 230, 230)"
                                        value={loginInfo.userInfo.name ? loginInfo.userInfo.name : ''}
                                        type="text"
                                        id="name"
                                        placeholder="Họ tên"
                                        readOnly
                                    />
                                    <span className="text-danger"></span>
                                </div>
                                <div className="form-control col-6">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="phone">
                                        Số điện thoại
                                    </Label>
                                    <Input
                                        padding="4px 7px"
                                        height="40px"
                                        color="#55595c"
                                        border="1px solid rgb(230, 230, 230)"
                                        value={addressInfo?.phone ? addressInfo.phone : ''}
                                        onChange={(e) => {
                                            setAddressInfo({ ...addressInfo, phone: e.target.value });
                                        }}
                                        onBlur={(e) => {
                                            setValidateResults({
                                                ...validateResults,
                                                phoneValidation: validates.isTel(e.target.value),
                                            });
                                        }}
                                        onInput={() => {
                                            setValidateResults({
                                                ...validateResults,
                                                phoneValidation: {
                                                    valid: true,
                                                },
                                            });
                                        }}
                                        type="tel"
                                        id="phone"
                                        placeholder="Số điện thoại"
                                    />
                                    <span className="text-danger">
                                        {validateResults?.phoneValidation?.valid
                                            ? ''
                                            : validateResults?.phoneValidation?.message}
                                    </span>
                                </div>
                            </div>
                            <div className="row g-5">
                                <div className="form-control col-6">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="company">
                                        Công ty
                                    </Label>
                                    <Input
                                        padding="4px 7px"
                                        height="40px"
                                        color="#55595c"
                                        border="1px solid rgb(230, 230, 230)"
                                        value={addressInfo?.company ? addressInfo.company : ''}
                                        onChange={(e) => {
                                            setAddressInfo({ ...addressInfo, company: e.target.value });
                                        }}
                                        onBlur={(e) => {
                                            setValidateResults({
                                                ...validateResults,
                                                companyValidation: validates.isRequired(e.target.value),
                                            });
                                        }}
                                        onInput={() => {
                                            setValidateResults({
                                                ...validateResults,
                                                companyValidation: {
                                                    valid: true,
                                                },
                                            });
                                        }}
                                        type="text"
                                        id="company"
                                        placeholder="Công ty"
                                    />
                                    <span className="text-danger">
                                        {validateResults?.companyValidation?.valid
                                            ? ''
                                            : validateResults?.companyValidation?.message}
                                    </span>
                                </div>
                                <div className="form-control col-6">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="address">
                                        Địa chỉ
                                    </Label>
                                    <Input
                                        padding="4px 7px"
                                        height="40px"
                                        color="#55595c"
                                        border="1px solid rgb(230, 230, 230)"
                                        value={addressInfo?.street ? addressInfo.street : ''}
                                        onChange={(e) => {
                                            setAddressInfo({ ...addressInfo, street: e.target.value });
                                        }}
                                        onBlur={(e) => {
                                            setValidateResults({
                                                ...validateResults,
                                                streetValidation: validates.isRequired(e.target.value),
                                            });
                                        }}
                                        onInput={() => {
                                            setValidateResults({
                                                ...validateResults,
                                                streetValidation: {
                                                    valid: true,
                                                },
                                            });
                                        }}
                                        type="text"
                                        id="address"
                                        placeholder="Địa chỉ"
                                    />
                                    <span className="text-danger">
                                        {validateResults?.streetValidation?.valid
                                            ? ''
                                            : validateResults?.streetValidation?.message}
                                    </span>
                                </div>
                            </div>
                            <div className="form-control">
                                <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="country">
                                    Quốc gia
                                </Label>
                                <Input
                                    padding="4px 7px"
                                    height="40px"
                                    color="#55595c"
                                    border="1px solid rgb(230, 230, 230)"
                                    value="Vietnam"
                                    type="text"
                                    id="country"
                                    placeholder="Quốc gia"
                                    readOnly
                                />
                            </div>
                            <div className="row g-5">
                                <div className="form-control col-4">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="province">
                                        Tỉnh Thành
                                    </Label>
                                    <Select
                                        padding="8px"
                                        id="province"
                                        value={addressInfo?.province ? addressInfo.province : ''}
                                        onChange={(e) => {
                                            const district_code = getDistrictOfProvince(
                                                e.target.value,
                                                addressApiData,
                                            )[0].code;
                                            const ward_code = getWardsOfDistrict(
                                                e.target.value,
                                                district_code,
                                                addressApiData,
                                            )[0].code;
                                            setAddressInfo({
                                                ...addressInfo,
                                                province: Number(e.target.value),
                                                district: district_code,
                                                wards: ward_code,
                                            });
                                        }}
                                    >
                                        {addressApiData.map((province) => {
                                            return (
                                                <option key={province.code} value={province.code}>
                                                    {province.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>
                                <div className="form-control col-4">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="district">
                                        Quận Huyện
                                    </Label>
                                    <Select
                                        padding="8px"
                                        id="district"
                                        value={addressInfo?.district ? addressInfo.district : ''}
                                        onChange={(e) => {
                                            const ward_code = getWardsOfDistrict(
                                                addressInfo.province,
                                                Number(e.target.value),
                                                addressApiData,
                                            )[0].code;
                                            setAddressInfo({
                                                ...addressInfo,
                                                district: Number(e.target.value),
                                                wards: ward_code,
                                            });
                                        }}
                                    >
                                        {getDistrictOfProvince(addressInfo.province, addressApiData).map((district) => {
                                            return (
                                                <option key={district.code} value={district.code}>
                                                    {district.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>
                                <div className="form-control col-4">
                                    <Label margin="0 0 10px 0" textTransform="uppercase" htmlFor="ward">
                                        Phường Xã
                                    </Label>
                                    <Select
                                        padding="8px"
                                        id="ward"
                                        value={addressInfo?.wards ? addressInfo.wards : ''}
                                        onChange={(e) => {
                                            setAddressInfo({ ...addressInfo, wards: Number(e.target.value) });
                                        }}
                                    >
                                        {getWardsOfDistrict(
                                            addressInfo.province,
                                            addressInfo.district,
                                            addressApiData,
                                        ).map((ward: IWard) => {
                                            return (
                                                <option key={ward.code} value={ward.code}>
                                                    {ward.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </div>
                            <div className="form-control">
                                <Input
                                    margin="0 10px 0 0"
                                    color="#55595c"
                                    border="1px solid rgb(230, 230, 230)"
                                    type="checkbox"
                                    id="is_address_default"
                                    checked={addressInfo?.isDefault === true ? true : false}
                                    onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                                        setAddressInfo({
                                            ...addressInfo,
                                            isDefault: (e.target as HTMLInputElement).checked,
                                        });
                                    }}
                                />
                                <Label
                                    display="inline-block"
                                    margin="0 0 10px 0"
                                    textTransform="uppercase"
                                    htmlFor="is_address_default"
                                >
                                    Đặt làm địa chỉ mặc định?
                                </Label>
                            </div>
                            <div className="btn-row">
                                <Button
                                    width="200px"
                                    secondary="true"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (modalRef.current) {
                                            modalRef.current.style.display = 'none';
                                        }
                                    }}
                                    className="cancel-btn btn-secondary"
                                >
                                    Hủy
                                </Button>
                                <Button width="200px" primary="true" type="submit" className="btn-primary">
                                    {formState.method === 'post' && 'Thêm địa chỉ'}
                                    {formState.method === 'edit' && 'Cập nhật địa chỉ'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </StyledModal>
            )}
        </div>
    ) : (
        <div></div>
    );
};

export default Address;
