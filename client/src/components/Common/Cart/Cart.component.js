import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../../redux/action";
// import { useHistory } from "react-router";
import "./Cart.style.css";

const Cart = ({ onCartClick }) => {
  const dispatch = useDispatch();
//   const history = useHistory();
  const itemCount = useSelector((state) => state.CartReducer.itemCount);
  const cartItems = useSelector((state) => state.CartReducer.cart);

  return (
    <div className="app-cart-container">
      <div className="width-wrapper">
        <div className="app-cart-content">
          <header className="app-cart-header-wrapper">
            <div>
              <h3>
                <b>My Cart</b>
              </h3>
              <span>
                ({itemCount} {itemCount > 1 ? "items" : "item"})
              </span>
            </div>
            <div>
              <span className="app-cart-close" onClick={onCartClick}>
                &times;
              </span>
            </div>
          </header>
          <div className="app-cart-item-wrapper">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <div className="app-cart-item" key={item.id}>
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      loading="lazy"
                      width="50"
                      height="50"
                    />
                    <div className="app-cart-item-detail">
                      <p>{item.name}</p>
                      <div className="app-cart-quantity">
                        <button
                          className="quantity-btn"
                          onClick={() => dispatch(removeFromCart(item))}
                        >
                          -
                        </button>
                        <span>
                          <b>{item.quantity}</b>
                        </span>
                        <button
                          className="quantity-btn"
                          onClick={() => dispatch(addToCart(item))}
                        >
                          +
                        </button>
                        <span>x</span>
                        <span>Rs.{item.price}</span>
                      </div>
                    </div>
                    <p>Rs.{item.price * item.quantity}</p>
                  </div>
                );
              })
            ) : (
              <div className="app-no-item">
                <p>
                  <b>No items in your cart</b>
                </p>
                <p>Your favourite items are just a click away</p>
              </div>
            )}
            {itemCount > 0 ? (
              <div className="app-cart-lowest-price">
                <img
                  src="/static/images/lowest-price.png"
                  alt="Lowest Price"
                  loading="lazy"
                  width="100"
                />
                <p>You won't find it cheaper anywhere</p>
              </div>
            ) : null}
          </div>
          <div className="app-cart-footer">
            {itemCount > 0 ? (
              <>
                <div>
                  <span>Promocode can be applied on payment page</span>
                </div>
                <button className=" w3-button w3-pink proceed-btn" onClick={onCartClick}>
                  <span>Proceed to Checkout</span>
                  <span>
                    {`Rs.
                ${cartItems.reduce((total, item) => {
                  return total + item.quantity * item.price;
                }, 0)}  >`}
                  </span>
                </button>
              </>
            ) : (
              <button
                className="app-btn w3-button w3-pink"
                onClick={() => {
                  onCartClick();
                //   history.push("/product");
                }}
              >
                Start Shopping
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
