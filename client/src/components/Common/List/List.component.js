import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from "../../../redux/action";
import './List.style.css';

const List = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener("resize", updateWindowDimensions);
  }, [])

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  return (
    <section className="product-list__list">
      {products && products.map((item) => {
        return (
          (width > 600) ?
            ((width < 900) ?
              (
                <article key={item.id} className="product-list__product-item-tab">
                  <h2 className="product-item__item-name">{item.name}</h2>

                  <div className="product-item__wrapper-tab">
                    <img src={`.` + item.imageURL} alt=""></img>
                    <p className="product-item__item-text-block-tab">{item.description}</p>
                  </div>


                  <div className="product-item__buy-tab">
                    <button onClick={() => dispatch(addToCart(item))} className="w3-button w3-pink" aria-label={"Buy Now" + item.name}>
                      {"Buy Now"} @ Rs.{item.price}</button>

                  </div>
                </article>
              ) : (
                <article key={item.id} className="product-list__product-item">
                  <div className="product-item__wrapper">
                    <h2 className="product-item__item-name">{item.name}</h2>
                    <img src={`.` + item.imageURL} alt=""></img>
                    <p className="product-item__item-text-block">{item.description}</p>
                    <div className="product-item__buy">
                      <span>MRP Rs.{item.price}</span>
                      <button onClick={() => dispatch(addToCart(item))} className="w3-button w3-pink" aria-label={"Buy Now" + item.name}>
                        {"Buy Now"}</button>
                    </div>
                  </div>
                </article>
              )
            ) : (
              <article key={item.id} className="product-list__product-item-mob">
                <h2 className="product-item__item-name">{item.name}</h2>
                <div className="product-item__wrapper-mob">

                  <img src={`.` + item.imageURL} alt=""></img>

                  <div>
                    <p className="product-item__item-text-block">{item.description}</p>
                    <div className="product-item__buy-mob">

                      <button onClick={() => dispatch(addToCart(item))} className="w3-button w3-pink" aria-label={"Buy Now" + item.name}>
                        {"Buy Now"} @ Rs.{item.price}</button>

                    </div>
                  </div>
                </div>
              </article>
            )
        )
      })}
    </section >
  );
}

export default List;