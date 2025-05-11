import { useEffect, useState } from "react";
import { Product } from "../types/product";
import productsData from "../data/products.json";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/productList.css";

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        setProducts(productsData);
    }, []);

    const navigate = useNavigate();
    const goToCart = () => {
        navigate("/cart");
    };
    const handleAddToCart = (product: Product) => {
        addToCart(product);
        toast.success(`Dodano ${product.name} do koszyka!`);
    }

    return (
        <div className="product-list-container">
            <div className="header">
                <h2>Lista produktów</h2>
                <button onClick={() => goToCart()}>Koszyk</button> {/* Cart */}
            </div>
            <hr />
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-row">
                        <h3>{product.name}</h3>
                        <p>
                            {product.price.main},
                            {product.price.fractional
                                .toString()
                                .padStart(2, "0")}{" "}
                            zł
                        </p>
                        <button onClick={() => handleAddToCart(product)}>
                            Dodaj do koszyka {/* Add to cart */}
                        </button>
                    </div>
                ))}
                <ToastContainer position="bottom-right" autoClose={3000} />
            </div>
        </div>
    );
};

export default ProductList;
