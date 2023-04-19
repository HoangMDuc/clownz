import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';
import { IUser } from '../../interfaces/interfaces';

const Logout = () => {
    const navigate = useNavigate();
    const { setLoginInfo } = useContext(LoginContext);
    useEffect(() => {
        document.title = 'Đăng xuất | CLOWNZⓇ STREETWEAR';
        sessionStorage.setItem('loginInfo', JSON.stringify({ isLogin: false, userInfo: {} }));
        setLoginInfo({ isLogin: false, userInfo: {} as IUser });
        navigate('/');
    }, []);
    return <div></div>;
};

export default Logout;
