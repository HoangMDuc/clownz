import { createContext, useState } from 'react';
import { IUser } from '../interfaces/interfaces';

interface ILoginInfo {
    isLogin: boolean;
    userInfo: IUser;
}

interface LoginContextType {
    loginInfo: ILoginInfo;
    setLoginInfo: React.Dispatch<React.SetStateAction<ILoginInfo>>;
}

const LoginContext = createContext<LoginContextType>({} as LoginContextType);
const LoginProvider = ({ children }: { children: React.ReactNode }) => {
    const [loginInfo, setLoginInfo] = useState<ILoginInfo>(() => {
        const data = sessionStorage.getItem('loginInfo');
        if (data) {
            return JSON.parse(data);
        }
        return { isLogin: false, userInfo: {} as IUser };
    });
    const value = { loginInfo, setLoginInfo };
    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
};

export { LoginContext, LoginProvider };
