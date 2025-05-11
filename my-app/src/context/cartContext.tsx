import React, {createContext, useContext, useEffect, useState, ReactNode, } from "react";
import { Product } from "../types/product";

type CartProduct = Product & { quantity: number };

type CartContextType = {
    cart: CartProduct[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProduct[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const parsed = JSON.parse(savedCart);
            const fixed = parsed.map((p: any) => ({
                ...p,
                quantity: p.quantity ?? 1, // if quantity is not present, set it to 1
            }));
            setCart(fixed);
        }
    }, []);

    const saveToStorage = (updatedCart: CartProduct[]) => {
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const addToCart = (product: Product) => {
        const existing = cart.find((p) => p.id === product.id);
        const updatedCart = existing
            ? cart.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p )
            : [...cart, { ...product, quantity: 1 }];
        saveToStorage(updatedCart);
    };

    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter((p) => p.id !== productId);
        saveToStorage(updatedCart);
    };

    const increaseQuantity = (productId: number) => {
        const updatedCart = cart.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        );
        saveToStorage(updatedCart);
    };

    const decreaseQuantity = (productId: number) => {
        const updatedCart = cart.map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
        saveToStorage(updatedCart);
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
