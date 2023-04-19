import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

interface IMenu {
    id: string;
    name: string;
    childrens?: IMenu[];
    href?: string;
}

interface INavItem {
    iconLeft?: IconDefinition;
    iconRight?: IconDefinition;
    children?: React.ReactNode;
    padding?: string;
    dropdown?: IMenu[];
    position?: string;
    to?: string;
    href?: string;
    id?: string;
    hMouseOver?: () => void;
    hMouseLeave?: () => void;
    isCart?: boolean;
    productQuantity?: number;
}

interface ICategory {
    name: string;
    products_quantity: number;
    image?: string;
    parent_category_id: string;
    id: string;
}
interface FormState {
    method: string;
    id?: number | string;
}
type InputType = {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    fontsize?: string;
    border?: string;
    textAlign?: string;
    radius?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    ref?: React.RefObject<HTMLInputElement>;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

interface IBranch {
    name: string;
    address: string;
    city: string;
    image: string;
    id: string;
}

interface IValidationResults {
    valid: boolean;
    message?: string;
}

type TypeValidateResult = {
    [key: string]: IValidationResults;
};

interface IUserAddress {
    user_id: string | number;
    street: string;
    wards: number;
    city: number;
    district: number;
    isDefault: boolean;
    company: string;
    phone: string;
    note: string;
    id?: string;
}

type TypeButton = {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    fontsize?: string;
    border?: string;
    textAlign?: string;
    radius?: string;
    fontFamily?: string;
    width?: string;
    height?: string;
    fw?: string;
    primary?: string;
    secondary?: string;
    children: React.ReactNode;
    ref?: React.RefObject<HTMLButtonElement>;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

type TypeSelect = {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    fontsize?: string;
    border?: string;
    textAlign?: string;
    radius?: string;
    fontFamily?: string;
    width?: string;
    height?: string;
    fw?: string;
    primary?: string;
    secondary?: string;
    children: React.ReactNode;
    ref?: React.RefObject<HTMLSelectElement>;
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

interface IAddressApi {
    code: number;
    name: string;
    districts: IDistrict[];
}

interface IDistrict {
    code: number;
    name: string;
    wards: IWard[];
}

interface IUser {
    createdAt: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    id?: string;
    isAdmin: boolean;
}

interface IWard {
    code: number;
    name: string;
}

type TypeLabel = {
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    fontsize?: string;
    border?: string;
    textAlign?: string;
    lSpacing?: string;
    display?: string;
    textTransform?: string;
    radius?: string;
    fontFamily?: string;
    width?: string;
    height?: string;
    fw?: string;
    primary?: string;
    secondary?: string;
    children: React.ReactNode;
    ref?: React.RefObject<HTMLLabelElement>;
} & React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;

interface IProductCard {
    name: string;
    price: number;
    quantity: number;
    image: string;
    category_id: string;
    date: string;
    title: string;
    description: string;
    id?: string;
}

interface IAddress {
    street?: string;
    wards: number;
    city: number;
    district: number;
}

interface IProductOfCart {
    productId: string;
    productQuantity: number;
    productSize: string;
    productName: string;
    productPrice: number;
    productImage: string;
    maxQuantity: number;
}

interface IOrder {
    createdAt: string;
    id?: string;
    address: IAddress;
    price: number;
    paymethod: string;
    shipmethod: string;
    user_id: string;
    products: IProductOfCart[];
    shipStatus: string;
    paymentStatus: string;
    phone: string;
    note?: string;
}

type TypeTextarea = {
    padding?: string;
    margin?: string;
    border?: string;
    radius?: string;
    width?: string;
    height?: string;
    ref?: React.RefObject<HTMLTextAreaElement>;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export {
    INavItem,
    IMenu,
    ICategory,
    InputType,
    IBranch,
    TypeSelect,
    IProductOfCart,
    IValidationResults,
    IUserAddress,
    IDistrict,
    IProductCard,
    IWard,
    IAddress,
    TypeLabel,
    TypeButton,
    TypeTextarea,
    TypeValidateResult,
    IUser,
    FormState,
    IOrder,
    IAddressApi,
};
