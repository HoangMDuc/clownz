import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { recalculateTheNumberOfProducts } from '../../../helpers/recalculate_the_number_of_products';
import validates from '../../../helpers/validate_v2';
import Header from '../../../layouts/Header/Header';

import SideBar from '../../components/SideBar/SideBar';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import TextArea from '../../../components/TextArea/TextArea';
import Button from '../../../components/Button/Button';
import Label from '../../../components/Label/Label';
import { FormState, ICategory, IProductCard, TypeValidateResult } from '../../../interfaces/interfaces';
import { LoginContext } from '../../../contexts/LoginContext';

const StyledMainBlock = styled.div`
    padding-top: 110px;
    padding-left: 300px;
    h1 {
        text-transform: uppercase;
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: 1.5px;
        margin: 20px 0 30px;
    }
    .add_products_btn {
        margin-bottom: 20px;
    }
    .list_products {
        border-collapse: collapse;
        font-size: 1.4rem;
        .product_block {
            border: 1px solid #ccc;
            .product_name {
                width: 10%;
            }
            .product_image {
                width: 8.33%;
                img {
                    width: 100%;
                }
            }
            .product_description {
                width: 30%;
            }
            .product_price {
                font-weight: 500;
            }
            .edit_btn,
            .delete_btn {
                width: 4%;
            }
        }
        th,
        td {
            border: 1px solid #ccc;
            padding: 4px;
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

const findCategoryName = (id: string | number, categories: ICategory[]) => {
    const category = categories.find((category) => {
        return category.id === id;
    });
    return category ? category.name : '';
};

const ProductManagement = () => {
    const [products, setProducts] = useState<IProductCard[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [formState, setFormState] = useState<FormState>({ method: '' });
    const [newProduct, setNewProduct] = useState<IProductCard>({
        name: '',
        quantity: 0,
        image: '',
        price: 0,
        title: '',
        category_id: '2',
        description: '',
        date: '',
    });
    const [validateResults, setValidateResults] = useState<TypeValidateResult>();
    const { loginInfo } = useContext(LoginContext);
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (loginInfo.isLogin && loginInfo.userInfo?.isAdmin) {
            document.title = 'Trang quản lý sản phẩm';
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/products').then((response) => {
                setProducts(response.data);
            });
            axios.get('https://62890e4b10e93797c162141e.mockapi.io/clownz/categories').then((response) => {
                setCategories(response.data);
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
                url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/products/${formState.id}`,
            }).then(async (response) => {
                const newProducts = products.filter((product) => {
                    return product.id !== response.data.id;
                });
                await recalculateTheNumberOfProducts(response.data.category_id, categories, -1);
                setProducts(newProducts);
            });
        } else if (formState.method === 'edit') {
            if (modalRef.current) modalRef.current.style.display = 'block';
            const product = products.find((product) => {
                return product.id === formState.id;
            });
            if (product) setNewProduct(product);
        } else if (formState.method === 'post') {
            if (modalRef.current) modalRef.current.style.display = 'block';
            setNewProduct({
                name: '',
                quantity: 0,
                image: '',
                price: 0,
                category_id: '2',
                title: '',
                description: '',
                date: '',
            });
        } else {
            if (modalRef.current) modalRef.current.style.display = 'none';
        }
    }, [formState]);

    const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            validates.isRequired(newProduct.name).valid &&
            validates.isRequired(newProduct.image).valid &&
            validates.isRequired(newProduct.title).valid
        ) {
            const data = { ...newProduct };
            if (data.date === '') {
                const date = new Date();
                data.date = `${date.toLocaleString('default', {
                    year: 'numeric',
                })}-${date.toLocaleString('default', {
                    month: '2-digit',
                })}-${date.toLocaleString('default', {
                    day: '2-digit',
                })}`;
            }
            if (formState.method === 'post') {
                axios({
                    method: 'post',
                    url: 'https://62890e4b10e93797c162141e.mockapi.io/clownz/products',
                    data: data,
                }).then(async (response) => {
                    await recalculateTheNumberOfProducts(response.data.category_id, categories, 1);
                    window.location.reload();
                });
            } else if (formState.method === 'edit') {
                const productWillChange = products.find((product) => {
                    return product.id == formState.id;
                });

                axios({
                    method: 'put',
                    url: `https://62890e4b10e93797c162141e.mockapi.io/clownz/products/${formState.id}`,
                    data: data,
                }).then(async (response) => {
                    if (productWillChange && productWillChange.category_id !== response.data.category_id) {
                        await recalculateTheNumberOfProducts(productWillChange.category_id, categories, -1);
                        await recalculateTheNumberOfProducts(response.data.category_id, categories, 1);
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                });
            }
        } else {
            setValidateResults({
                nameValidation: validates.isRequired(newProduct.name),
                imageValidation: validates.isRequired(newProduct.image),
                titleValidation: validates.isRequired(newProduct.title),
            });
        }
    };

    return loginInfo.isLogin && loginInfo.userInfo?.isAdmin ? (
        <div>
            <Header primary={true}></Header>
            <SideBar></SideBar>
            <StyledMainBlock>
                <h1 className="text-center">Trang quản lý sản phẩm</h1>
                <Button
                    primary="true"
                    width="180px"
                    className="btn-primary add_products_btn"
                    onClick={() => {
                        setFormState({ method: 'post' });
                    }}
                >
                    Thêm mới sản phẩm
                </Button>
                <table className="list_products">
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Giá</th>
                            <th>Tiêu đề của sản phẩm</th>
                            <th>Mô tả sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Ngày nhập</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products &&
                            categories &&
                            products.map((product) => {
                                return (
                                    <tr key={product.id} className="product_block ">
                                        <td className="text-center text-info">
                                            <Link to={`/product_details/${product.name}`} state={{ id: product.id }}>
                                                {product.id}
                                            </Link>
                                        </td>
                                        <td className="product_name text-center text-info">
                                            <Link to={`/product_details/${product.name}`} state={{ id: product.id }}>
                                                {product.name}
                                            </Link>
                                        </td>
                                        <td className="text-center">{product.quantity}</td>
                                        <td className="product_image">
                                            <img src={product.image} alt="" />
                                        </td>
                                        <td className="product_price text-success">{product.price}</td>
                                        <td>{product.title}</td>
                                        <td className="product_description">{product.description}</td>
                                        <td className="text-center text-info">
                                            <Link
                                                state={{
                                                    id: product.category_id,
                                                }}
                                                to={`/collection/${findCategoryName(product.category_id, categories)}`}
                                            >
                                                {findCategoryName(product.category_id, categories)}
                                            </Link>
                                        </td>
                                        <td>{product.date}</td>
                                        <td className="edit_btn">
                                            <Button
                                                width="100px"
                                                onClick={() => {
                                                    setFormState({ method: 'edit', id: product.id });
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                        </td>
                                        <td className="delete_btn">
                                            <Button
                                                width="100px"
                                                className="text-danger"
                                                onClick={() => {
                                                    setFormState({ method: 'delete', id: product.id });
                                                }}
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
                    {formState.method === 'post' && <h1>Nhập thông tin sản phẩm</h1>}
                    {formState.method === 'edit' && (
                        <h1>
                            Sửa thông tin sản phẩm <span className="text-danger">#{formState.id}</span>
                        </h1>
                    )}
                    <div className="row gx-5 gy-3">
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="name">
                                Tên sản phẩm
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                value={newProduct ? newProduct.name : ''}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        name: e.target.value,
                                    });
                                }}
                                placeholder="Tên sản phẩm"
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
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="quantity">
                                Số lượng sản phẩm
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="number"
                                value={newProduct ? newProduct.quantity : 0}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        quantity: Number(e.target.value),
                                    });
                                }}
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
                                value={newProduct ? newProduct.image : ''}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
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
                                placeholder="Hình ảnh sản phẩm"
                            />
                            <span className="text-danger">
                                {validateResults?.imageValidation?.valid
                                    ? ''
                                    : validateResults?.imageValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="price">
                                Giá
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="number"
                                value={newProduct ? newProduct.price : ''}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        price: Number(e.target.value),
                                    });
                                }}
                                placeholder="Giá sản phẩm"
                            />
                        </div>

                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="title">
                                Tiêu đề
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="text"
                                value={newProduct ? newProduct.title : ''}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        title: e.target.value,
                                    });
                                }}
                                onInput={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        titleValidation: { valid: true },
                                    });
                                }}
                                onBlur={(e) => {
                                    setValidateResults({
                                        ...validateResults,
                                        titleValidation: validates.isRequired(e.target.value),
                                    });
                                }}
                                placeholder="Tiêu đề"
                            />
                            <span className="text-danger">
                                {validateResults?.titleValidation?.valid
                                    ? ''
                                    : validateResults?.titleValidation?.message}
                            </span>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="description">
                                Mô tả
                            </Label>
                            <TextArea
                                value={newProduct ? newProduct.description : ''}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        description: e.target.value,
                                    });
                                }}
                                placeholder="Mô tả sản phẩm"
                                id="description"
                                cols={30}
                                rows={10}
                            ></TextArea>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="date">
                                Danh mục
                            </Label>
                            <Select
                                padding="8px"
                                id=""
                                value={newProduct ? newProduct.category_id : categories[0].id}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        category_id: e.target.value,
                                    });
                                }}
                            >
                                {categories &&
                                    categories.map((category) => {
                                        return <option value={category.id}>{category.name}</option>;
                                    })}
                            </Select>
                        </div>
                        <div className="col-6">
                            <Label margin="0 0 4px 0" textTransform="uppercase" htmlFor="date">
                                Ngày nhập
                            </Label>
                            <Input
                                height="40px"
                                padding="8px"
                                margin="2px"
                                type="date"
                                value={newProduct ? newProduct.date : '2-9-2023'}
                                onChange={(e) => {
                                    setNewProduct({
                                        ...newProduct,
                                        date: e.target.value,
                                    });
                                }}
                                placeholder="Ngày nhập"
                            />
                        </div>
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
                </form>
            </StyledModal>
        </div>
    ) : (
        <div></div>
    );
};

export default ProductManagement;
