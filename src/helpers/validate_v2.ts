import { IOrder, IUser } from '../interfaces/interfaces';

const validates = {
    isRequired: function (value: string) {
        if (value.trim() === '') {
            return {
                valid: false,
                message: 'Vui lòng nhập trường này',
            };
        } else {
            return {
                valid: true,
            };
        }
    },
    isTel: function (value: string) {
        if (this.isRequired(value).valid) {
            if (value.trim().replace(' ', '').length != 10) {
                return {
                    valid: false,
                    message: 'Số điện thoại không hợp lệ',
                };
            } else {
                return {
                    valid: true,
                };
            }
        } else {
            return {
                valid: false,
                message: 'Vui lòng nhập trường này',
            };
        }
    },
    isEmail: function (value: string) {
        if (this.isRequired(value)) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regex.test(value)) {
                return {
                    valid: false,
                    message: 'Nhập sai định dạng email',
                };
            } else {
                return { valid: true };
            }
        } else {
            return {
                valid: false,
                message: 'Vui lòng nhập trường này',
            };
        }
    },
    isPassword: function (value: string) {
        if (value.trim().length < 6) {
            return {
                valid: false,
                message: 'Mật khẩu tối thiểu phải có 6 kí tự',
            };
        } else {
            return {
                valid: true,
            };
        }
    },
    isConfirmPassword: function (value1: string, value2: string) {
        if (value1.trim() !== value2.trim()) {
            return { valid: false, message: 'Mật khẩu không trùng khớp' };
        } else {
            return { valid: true };
        }
    },
    IsEmailAlreadyExists: function (email: string, accounts: IUser[]) {
        const accountHasEmail = accounts.find((account) => {
            return account.email === email;
        });
        if (accountHasEmail) {
            return {
                valid: false,
                message: 'Email đã tồn tại',
            };
        } else {
            return {
                valid: true,
            };
        }
    },
    isEmptyOrder: function (order: IOrder) {
        if (order.products.length === 0) {
            return { valid: false, message: 'Vui lòng thêm sản phẩm' };
        } else {
            return { valid: true };
        }
    },
};

export default validates;
