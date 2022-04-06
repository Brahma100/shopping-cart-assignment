import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Cart from '../Cart/Cart.component';
import { useSelector } from "react-redux";
import './Header.style.css';

const Header = () => {
    const [showCart, setShowCart] = useState(false);
    const itemCount = useSelector((state) => state.CartReducer.itemCount);

    const onCartClick = () => {
        setShowCart(!showCart);
    };

    return (
        <header role="banner" className="main-header">
            <div className="header-brand">
                <Link role="navigation" to="/">
                    <img srcSet="./static/images/logo_2x.png, ./static/images/logo.png" alt="Sabka Bazaar"></img>
                </Link>

                <nav className="nav-links">
                    <Link role="navigation" to="/" className="nav-link">Home</Link>
                    <Link role="navigation" to="/products" className="nav-link">Products</Link>
                </nav>
            </div>

            <div className="nav-action">
                <nav className="nav-action-links">
                    <Link role="navigation" to="/login" className="action-link">SignIn</Link>
                    <Link role="navigation" to="/register" className="action-link">Register</Link>
                </nav>
                <button className="cart" onClick={onCartClick}>
                    <img src="./static/images/cart.svg" alt="Sabka Bazaar Cart"></img>
                    <span>{itemCount + ` items`}</span>
                </button>
            </div>
            {(showCart && <Cart onCartClick={onCartClick} />) || null}
        </header>
    );
}


export default Header;
