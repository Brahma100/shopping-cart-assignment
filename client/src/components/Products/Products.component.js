import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import List from '../Common/List/List.component';
import { setFilter } from "../../redux/action";
import './Products.style.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const filter = useSelector((state) => state.CartReducer.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:5000/products").then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
    axios.get("http://localhost:5000/categories").then(
      (response) => {
        setCategories(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const onCategoryChange = (e) => {
    if (e.target.value === "All") {
      dispatch(setFilter(null));
    } else {
      dispatch(setFilter(categories.filter(item => item.id === e.target.value)[0]));
    }
  };

  useEffect(() => {
    let arr = [];
    if (filter) {
      arr = products.filter((item) => item.category === filter.id);
      setFilteredProducts([...arr]);
    }
  }, [filter]);
  return (
    <div className="main-container">
      <aside className="category-list">
        <ul>
          {categories.map((category, index) =>
            category.enabled && (
              <li key={index}
                className={filter?.id === category.id ? "active" : ""}
                onClick={() => {
                  if (filter && filter.id === category.id) {
                    dispatch(setFilter(null));
                  } else {
                    dispatch(setFilter(category));
                  }
                }}>
                <span title={category.name}
                >{category.name}</span>
              </li>
            ))}
        </ul>
      </aside>
      <select className="mobile-category-list" onChange={(e) => onCategoryChange(e)}>
        <option value="default" defaultValue>Select Option</option>
        {categories.map((item) => {
          return (
            <option key={item.key} className="category-links" value={item.id}>
              {item.name}
            </option>
          )
        })}
      </select>
      <main role="main" className="content">
        {
          filteredProducts.length > 0 ?
            <List products={filteredProducts} /> :
            <List products={products} />
        }
      </main>
    </div>
  );
}
export default Products;