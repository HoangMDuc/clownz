import { createContext, useState } from 'react';
import { IProductOfCart } from '../interfaces/interfaces';
interface ICartContext {
    total_price: number;
    products: IProductOfCart[];
}
interface CartContextType {
    cart: ICartContext;
    setCart: React.Dispatch<React.SetStateAction<ICartContext>>;
}

const CartContext = createContext<CartContextType>({} as CartContextType);
const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<ICartContext>(() => {
        const data = localStorage.getItem('cart');
        if (data) return JSON.parse(data);
        return { products: [], total_price: 0 };
    });

    const value = { cart, setCart };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
export { CartContext, CartProvider };
