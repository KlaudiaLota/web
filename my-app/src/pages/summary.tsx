import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import "../styles/cart.css";

const Summary = () => {
    const { cart } = useCart();

    const navigate = useNavigate();
    const goToCart = () => {
        navigate("/cart");
    };
    const goToTakeOrder = () => {
        window.location.href = "/thank-you.html"; 
    }

    return (
        <div className="product-list-container">
            <div className="header"> 
                <h2>Podsumowanie zamówienia</h2> {/* Order summary */}
                <button onClick={goToCart}>
                    Koszyk {/* Cart */}
                </button> 
            </div>
            <hr />
            <div className="card-list">
                {cart.map((product) => (
                        <div className="product-card" key={product.id}>
                            <h3>{product.name}</h3>
                            <p>
                                {product.price.main},{product.price.fractional.toString().padStart(2, "0")}{" "}
                                zł
                            </p>
                            <span>{product.quantity}</span>
                            <p>
                                Suma:{" "} {/* Sum: */}
                                {(
                                    product.quantity * (product.price.main + product.price.fractional / 100)
                                ).toFixed(2)}{" "} zł
                            </p>
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
                    <button className="summary" onClick={goToTakeOrder}>
                        Złóż zamówienie {/* Place your order */}
                    </button>
            </div>
        </div>
    )
}

export default Summary;