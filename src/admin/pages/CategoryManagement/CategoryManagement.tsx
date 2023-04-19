import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    recalculateTheNumberOfProducts,
    recalculateTheNumberOfProductsWhenDeleteCategory,
} from '../../../helpers/recalculate_the_number_of_products';
import validates from '../../../helpers/validate_v2';
import Header from '../../../layouts/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import { FormState, ICategory, TypeValidateResult } from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';
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

const CategoryManagement = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [formState, setFormState] = useState<FormState>({ method: '' });
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const [newCategory, setNewCategory] = useState<ICategory>({
        name: '',
        image: '',
        products_quantity: 0,
        parent_category_id: 'null',
        id: '',
    });
    const navigate = useNavigate();
    const { loginInfo } = useContext(LoginContext);
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loginInfo.isLogin && loginInfo.userInfo.isAdmin) {
            document.title = 'Trang quản lý danh mục';
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/categories').then((res) => {
                setCategories(res.data);
            });
        } else if (!loginInfo.isLogin) {
            navigate('/login');
        } else {
            navigate('/');
        }
    }, []);

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validates.isRequired(newCategory.name).valid && validates.isRequired(newCategory.image || '').valid) {
            if (formState.method === 'post') {
                const { id, ...data } = newCategory;
                axios({
                    method: 'post',
                    url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/categories`,
                    data: data,
                }).then((res) => {
                    window.location.reload();
                });
            } else if (formState.method === 'edit') {
                const { id, ...data } = newCategory;
                axios({
                    method: 'put',
                    url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/${formState.id}`,
                    data: data,
                }).then(async (res) => {
                    const categoryWillDelete = categories.find((category) => {
                        return category.id === formState.id;
                    });
                    if (
                        categoryWillDelete &&
                        categoryWillDelete.parent_category_id === newCategory.parent_category_id
                    ) {
                        window.location.reload();
                    } else if (categoryWillDelete) {
                        await recalculateTheNumberOfProductsWhenDeleteCategory(
                            formState.id || -1,
                            categories,
                            -Number(categoryWillDelete.products_quantity),
                        );
                        await axios
                            .get('https://62890e4b10e93797c162141e.mockapi.io/clownz/categories')
                            .then(async (res) => {
                                await recalculateTheNumberOfProductsWhenDeleteCategory(
                                    newCategory.id,
                                    res.data,
                                    Number(categoryWillDelete.products_quantity),
                                );
                            });
                        window.location.reload();
                    }
                });
            }
        } else {
            setValidateResults({
                nameValidation: validates.isRequired(newCategory.name),
                imageValidation: validates.isRequired(newCategory.image || ''),
            });
        }
    };

    useEffect(() => {
        if (formState.method === 'delete') {
            axios({
                method: 'delete',
                url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/${formState.id}`,
            }).then(async (res) => {
                const newCategories = categories.filter((category) => {
                    return category.id !== formState.id;
                });
                const categoryWillDelete = categories.find((category) => {
                    return category.id === formState.id;
                });
                if (categoryWillDelete) {
                    await recalculateTheNumberOfProductsWhenDeleteCategory(
                        formState.id || -1,
                        categories,
                        -Number(categoryWillDelete.products_quantity),
                    );
                }

                setCategories(newCategories);
            });
        } else if (formState.method === 'edit') {
            const categoryWillChange = categories.find((category) => {
                return category.id === formState.id;
            });
            if (categoryWillChange) setNewCategory(categoryWillChange);
            if (modalRef.current) modalRef.current.style.display = 'block';
        } else if (formState.method === 'post') {
            if (modalRef.current) modalRef.current.style.display = 'block';
            setNewCategory({
                name: '',
                image: '',
                products_quantity: 0,
                parent_category_id: 'null',
                id: '',
            });
        } else {
            if (modalRef.current) modalRef.current.style.display = 'none';
        }
    }, [formState]);

    return loginInfo.isLogin && loginInfo.userInfo?.isAdmin ? (
        <div>
            <Header primary={true}></Header>
            <SideBar></SideBar>
            <StyledMainBlock>
                <h1 className="text-center">Quản lý danh mục</h1>
                <Button
                    primary="true"
                    width="200px"
                    className="btn-primary"
                    onClick={() => {
                        setFormState({ method: 'post' });
                    }}
                >
                    Thêm danh mục mới
                </Button>
                <table>
                    <thead>
                        <tr>
                            <th>Mã danh mục</th>
                            <th>Tên danh mục</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Danh mục cha</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories &&
                            categories.map((category) => {
                                return (
                                    <tr key={category.id}>
                                        <td className="text-info text-center">
                                            <Link to={`/collection/${category.name}`} state={{ id: category.id }}>
                                                {category.id}
                                            </Link>
                                        </td>
                                        <td className="text-info text-center">
                                            <Link to={`/collection/${category.name}`} state={{ id: category.id }}>
                                                {category.name}
                                            </Link>
                                        </td>
                                        <td className="text-center">{category.products_quantity}</td>
                                        <td>
                                            <img src={category.image} className="w-full" alt="" />
                                        </td>
                                        <td className="text-center">{category.parent_category_id}</td>
                                        <td>
                                            <Button
                                                width="100px"
                                                onClick={() => {
                                                    setFormState({ method: 'edit', id: category.id });
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                width="100px"
                                                className={category.products_quantity > 0 ? '' : 'text-danger'}
                                                onClick={() => {
                                                    setFormState({ method: 'delete', id: category.id });
                                                }}
                                                disabled={category.products_quantity > 0 ? true : false}
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
                    {formState.method === 'post' && <h1>Nhập thông tin danh mục</h1>}
                    {formState.method === 'edit' && (
                        <h1>
                            Sửa thông tin danh mục <span className="text-danger">#{formState.id}</span>
                        </h1>
                    )}
                    <div className="row gx-5 gy-3">
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="name">
                                Tên danh mục
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                id="name"
                                value={newCategory ? newCategory.name : ''}
                                onChange={(e) => {
                                    setNewCategory({
                                        ...newCategory,
                                        name: e.target.value,
                                    });
                                }}
                                placeholder="Tên danh mục"
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
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="products_quantity">
                                Số lượng sản phẩm
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                width="100%"
                                type="number"
                                id="products_quantity"
                                value={newCategory ? newCategory.products_quantity : 0}
                                readOnly
                                min={0}
                                placeholder="Số lượng sản phẩm"
                            />
                        </div>

                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="image">
                                Hình ảnh
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                value={newCategory ? newCategory.image : ''}
                                onChange={(e) => {
                                    setNewCategory({
                                        ...newCategory,
                                        image: e.target.value,
                                    });
                                }}
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        imageValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        imageValidation: validates.isRequired(e.target.value),
                                    });
                                }}
                                placeholder="Hình ảnh"
                            />
                            <span className="text-danger">
                                {validateResults?.imageValidation?.valid
                                    ? ''
                                    : validateResults?.imageValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="parent_category_id">
                                Danh mục cha
                            </Label>

                            <Select
                                padding="8px"
                                id="parent_category_id"
                                value={newCategory ? newCategory.parent_category_id : ''}
                                onChange={(e) => {
                                    setNewCategory({
                                        ...newCategory,
                                        parent_category_id: e.target.value,
                                    });
                                }}
                            >
                                <option value="null" disabled={newCategory.id === 'null' ? true : false}>
                                    Không có danh mục cha
                                </option>
                                {categories &&
                                    categories.map((category) => {
                                        return (
                                            <option
                                                disabled={newCategory.id === category.id ? true : false}
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                            </Select>
                        </div>

                        <div className="form_action">
                            <Button
                                secondary="true"
                                padding="0 28px"
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

export default CategoryManagement;
