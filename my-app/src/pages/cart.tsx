import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../styles/cart.css";

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

    const navigate = useNavigate();
    const goToList = () => {
        navigate("/");
    };
    const goToSummary = () => {
        navigate("/summary");
    };

    return (
        <div className="product-list-container">
            <div className="header"> 
                <h2>Koszyk</h2> 
                <button onClick={goToList}>
                    Powrót {/* Back */}
                </button> 
            </div>
            <hr />
            <div>
                {cart.length === 0 ? (
                    <p>Twój koszyk jest pusty.</p> //Your cart is empty.
                ) : (
                    <div className="card-list">
                        {cart.map((product) => (
                            <div className="product-card" key={product.id}>
                                <h3>{product.name}</h3>
                                <p>
                                    {product.price.main},{product.price.fractional.toString().padStart(2, "0")}{" "}
                                    zł
                                </p>
                                <div className="quantity-controls">
                                    <button onClick={() => decreaseQuantity(product.id)}>
                                        −
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => increaseQuantity(product.id)}>
                                        +
                                    </button>
                                </div>
                                <p>
                                    Suma:{" "} {/* Sum: */}
                                    {(
                                        product.quantity * (product.price.main + product.price.fractional / 100)
                                    ).toFixed(2)}{" "} zł
                                </p>
                                <button className="remove-btn" onClick={() => removeFromCart(product.id)}> 
                                    Usuń {/* Remove */}
                                </button> 
                            </div>
                        ))}
                        <div className="total-price">
                            <h3>
                                Łączna kwota:{" "} {/* Total amount: */}
                                {cart
                                    .reduce(
                                        (acc, product) =>
                                            acc + product.quantity * (product.price.main + product.price.fractional / 100), 0
                                    )
                                    .toFixed(2)}{" "} 
                                zł
                            </h3>
                        </div>
                        <button className="summary" onClick={goToSummary}>
                            Podsumowanie zamówienia {/* Order summary */}
                        </button> 
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
